const validator = require('validator')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2
const doctorModel = require('../models/doctor-model')
const userModel = require('../models/user-model');
const appointmentModel = require('../models/appointment-model');
const jwt = require('jsonwebtoken');

// API for adding doctors
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      date,
      available
    } = req.body
    const imageFile = req.file

    // Check the all data req to body
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !imageFile
    ) {
      return res.status(400).json({ success: false, message: 'Details are required' })
    }

    // validating email formate
    if (!validator.isEmail(email )) {
     return res
        .status(400)
        .json({ success: false, message: 'Please enter the valid email' })
    }

    // Validating password formate
    if (password.length < 8) {
     return res
        .status(400)
        .json({ success: false, message: 'Enter the strong password' })
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hash_password = await bcrypt.hash(password, salt)

    // upload Image in cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: 'image'
    })
    const imageUrl = imageUpload.secure_url

    // upload data to mongodb
    const doctorData = await doctorModel.create({
      name,
      email,
      image:imageUrl,
      password:hash_password,
      speciality,
      degree,
      experience,
      about,
      available,
      fees,
      address:JSON.parse(address),
      date:Date.now(),
    })

    res.status(200).json({success:true, message:"doctor added"})

  } catch (error) {
    console.log(error)
    res.status(400).json({success:false, message:error.message});
  }
}

// Api for login admin
const loginAdmin = async (req, res) => {
  try {
    const {email, password} = req.body;

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD)
    {
      const token = jwt.sign(email+password, process.env.JWT_SECRET);
      res.status(200).json({success:true, token})
    }
    else{
      res.status(401).json({success:false, message:"Invalid Crendential"});
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({success:false, message:error.message})
    
  }
}

// All doctors list on admin panel
const allDoctor = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password');
    res.status(200).json({success:true, doctors})
  } catch (error) {
    console.log(error);
     res.status(404).json({success:false, message:error.message})
  }
}

// Get all appointment in admin panel
const appointmentAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({})
    res.status(200).json({success:true, appointments})
  } catch (error) {
        console.log(error);
     res.status(404).json({success:false, message:error.message})
  }
}

// Api for cancel appointment admin
const appointmentCancel = async (req, res) => {
  try {
     
    const { appointmentId } = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)

   
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

// Api to get dashboard data in admin panel
const dashboardData = async (req, res) => {
  try {
      const doctors = await doctorModel.find({});
      const users = await userModel.find({});
      const appointments = await appointmentModel.find({});

      const dashData = {
        doctors: doctors.length,
        appointments: appointments.length,
        patients: users.length,
        latestAppointments: appointments.reverse().slice(0, 5)
      }

      res.status(200).json({success:true, dashData})
  } catch (error) {
        console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

module.exports = { addDoctor, loginAdmin, allDoctor, appointmentAdmin, appointmentCancel, dashboardData}

