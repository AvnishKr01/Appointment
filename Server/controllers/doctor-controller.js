const doctorModel = require('../models/doctor-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const appointmentModel = require('../models/appointment-model')

// Change doctor availability
const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body

    const docData = await doctorModel.findById(docId)
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available
    })
    res.status(200).json({ success: true, message: 'Availability changed' })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

// All doctor for List in client to show
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(['-email', '-password'])
    res.status(200).json({ success: true, doctors })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Details are required' })
    }

    const doctor = await doctorModel.findOne({ email })
    if (!doctor) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid Credential' })
    }

    const isMatch = await bcrypt.compare(password, doctor.password)
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
      res
        .status(200)
        .json({ success: true, message: 'Login successful', token })
    } else {
      res.status(400).json({ success: false, message: 'Login failed' })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

// Api to get doctor appointment for doctor panel
const appointmentDoctor = async (req, res) => {
  try {
    // const docId = req.body.docId;
    const docId = req.doctorId

    const appointments = await appointmentModel.find({ docId })
    res.status(200).json({ success: true, appointments })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

// API to complete the appointment
const appointmentComplete = async (req, res) => {
  try {
    const docId = req.doctorId
    const { appointmentId } = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true
      })
      res.status(200).json({ success: true, message: 'Appointment Completed' })
    } else {
      res.status(400).json({ success: false, message: 'Mark failed' })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

// API to cancel the appointment
const appointmentCancel = async (req, res) => {
  try {
    const docId = req.doctorId
    const { appointmentId } = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true
      })
      res.status(200).json({ success: true, message: 'Appointment Cancelled' })
    } else {
      res.status(400).json({ success: false, message: 'Cancellation failed' })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

// Api to get doctor Dashboard to show all things
const dashboardDoctor = async (req, res) => {
  try {
    const docId = req.doctorId

    const appointments = await appointmentModel.find({docId})

    let earning = 0;

    appointments.map((item)=> {
      if(item.isCompleted || item.payment){
        earning += item.amount
      }
    })

    let patients = []

    appointments.map((item) => {
      if(!patients.includes(item.userId)){
        patients.push(item.userId)
      }
    })

    const dashData = {
      earning,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5)
    }
     res.status(200).json({ success: true, dashData })

  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

// Api to doctor Profile to show in doctor Panel
const profileDoctor = async (req, res) => {
  try {
    const docId = req.doctorId;

      const profileData = await doctorModel.findById(docId).select('-password')
      res.status(200).json({success:true, profileData})
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

// Api to doctor data from the doctor panel
const updateDoctor = async (req, res) => {
  try {
    const docId = req.doctorId
    const {fees, address, available} = req.body

    await doctorModel.findByIdAndUpdate(docId, {fees, address, available})
    res.status(200).json({success:true, message:"Profile updated"})
  } catch (error) {
       console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

module.exports = {
  changeAvailablity,
  doctorList,
  loginDoctor,
  appointmentDoctor,
  appointmentComplete,
  appointmentCancel,
  dashboardDoctor,
  profileDoctor,
  updateDoctor
}
