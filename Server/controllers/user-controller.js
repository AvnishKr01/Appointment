const validator = require('validator')
const bcrypt = require('bcrypt')
const userModel = require('../models/user-model')
const doctorModel = require('../models/doctor-model')
const jwt = require('jsonwebtoken')
const appointmentModel = require('../models/appointment-model')
const cloudinary = require('cloudinary').v2
const razorpay = require('razorpay')

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check the user fill the data
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'All feilds are required' })
    }
    const exist = await userModel.findOne({ email })
    if (exist) {
      return res
        .status(400)
        .json({ success: false, message: 'Email is already use' })
    }

    // Check the email validator
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: 'Please enter the valid email' })
    }

    // Check the password strong or not
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: 'enter the strong password' })
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hash_password = await bcrypt.hash(password, salt)

    // Create the new user for database
    const newUser = await userModel.create({
      name,
      email,
      password: hash_password
    })

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
    res
      .status(200)
      .json({ success: true, message: 'Register Successfully', token })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

// User Login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'All feilds are required' })
    }

    const user = await userModel.findOne({ email })
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid crendential' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      return res
        .status(200)
        .json({ success: true, message: 'login Successfully', token })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

// Get the user profile data
const userProfile = async (req, res) => {
  try {
    const userId = req.userId
    if (!userId) {
      return res.status(400).json({ success: false, message: 'userId is not' })
    }
    const userData = await userModel.findById(userId).select('-password')
    res.status(200).json({ success: true, userData })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

// Update user
const updateUser = async (req, res) => {
  try {
    const userId = req.userId
    const { name, phone, dob, address, gender } = req.body
    const image = req.file

    if (!name || !phone || !dob || !gender) {
      return res.status(400).json({ success: false, message: 'Data Missing' })
    }

    const updateData = {
      name,
      phone,
      dob,
      gender,
      address: JSON.parse(address)
    }

    if (image) {
      const imageUpload = await cloudinary.uploader.upload(image.path, {
        resource_type: 'image'
      })

      if (!imageUpload.secure_url) {
        return res
          .status(500)
          .json({ success: false, message: 'Image upload failed' })
      }
      updateData.Image = imageUpload.secure_url
    }
    await userModel.findByIdAndUpdate(userId, updateData)

    // console.log(updateData);

    res.status(200).json({ success: true, message: 'Profile Updated' })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId
    const { docId, slotDate, slotTime } = req.body

    const docData = await doctorModel.findById(docId).select('-password')

    if (!docData) {
      return res
        .status(404)
        .json({ success: false, message: 'Doctor not found' })
    }

    if (!docData.available) {
      return res
        .status(400)
        .json({ success: false, message: 'Doctor not available' })
    }
    let slots_booked = docData.slots_booked

    //Check for slots availablity
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res
          .status(400)
          .json({ success: false, message: 'Slots not available' })
      } else {
        slots_booked[slotDate].push(slotTime)
      }
    } else {
      slots_booked[slotDate] = []
      slots_booked[slotDate].push(slotTime)
    }

    const userData = await userModel.findById(userId).select('-password')

    delete docData.slots_booked

    const appointmentData = {
      userId,
      docId,
      docData,
      userData,
      slotDate,
      slotTime,
      amount: docData.fees,
      date: Date.now()
    }
    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()

    // Save new data in docdata
    await doctorModel.findByIdAndUpdate(docId, { slots_booked })
    res.status(200).json({ success: true, message: 'Appointment Booked', appointmentId: newAppointment._id  })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

// Api to find appointment data
const allAppontment = async (req, res) => {
  try {
    const userId = req.userId

    const appointments = await appointmentModel.find({ userId })
    res.status(200).json({ success: true, appointments })
    // console.log(appointments);
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

// Cancel the appointment
const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId
    const { appointmentId } = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)

    // verify the appointmentData
    if (appointmentData.userId !== userId) {
      return res
        .status(400)
        .json({ success: false, message: 'Unauthorized action' })
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

    // Releasing the slot time
    const { docId, slotDate, slotTime } = appointmentData
    const doctorData = await doctorModel.findById(docId)

    let slots_booked = doctorData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

    await doctorModel.findByIdAndUpdate(docId, { slots_booked })
    res.status(200).json({ success: true, message: 'Appointment Cancel' })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

// Razorpay Instance keyId and secret
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY
})


// Payment method Razorpay
const razorpayPayment = async (req, res) => {
  try {
    const { appointmentId } = req.body

    if(!appointmentId){
      res.status(400).json({success:false, message:"appointmentId is not found"})
    }

    const appointmentData = await appointmentModel.findById(appointmentId)

    if(!appointmentData || appointmentData.cancelled){
      res.status(400).json({success:false, message:"Appointment cancelled"})
    }

    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId
    }

    // Createing of an order
    const order = await razorpayInstance.orders.create(options)
       res.status(200).json({ success: true, order})
    
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

// Verify the razorpay 
const verifyRazorpay = async(req, res) => {
  try {
    const {razorpay_order_id} = req.body

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    if(orderInfo.status === "paid"){
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {payment:true})
      res.status(200).json({success:true, message:"Payment Successfully"})
    }else{
      res.status(400).json({success:true, message:"Payment failed"})
    }

    console.log(orderInfo);
    
  } catch (error) {
        console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

module.exports = {
  register,
  userLogin,
  userProfile,
  updateUser,
  bookAppointment,
  allAppontment,
  cancelAppointment,
  razorpayPayment,
  verifyRazorpay
}
