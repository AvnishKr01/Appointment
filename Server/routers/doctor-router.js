const express = require('express');
const doctorController = require('../controllers/doctor-controller');
const authDoctor = require('../middlewares/auth-doctor');


const doctorRouter = express.Router();

doctorRouter.route('/list').get(doctorController.doctorList)
doctorRouter.route('/login-doctor').post(doctorController.loginDoctor)
doctorRouter.route('/appointment-doctor').get(authDoctor, doctorController.appointmentDoctor)
doctorRouter.route('/appointment-complete').post(authDoctor, doctorController.appointmentComplete )
doctorRouter.route('/appointment-cancel').post(authDoctor, doctorController.appointmentCancel)
doctorRouter.route('/dashboard-doctor').get(authDoctor, doctorController.dashboardDoctor)
doctorRouter.route('/profile-doctor').get(authDoctor,doctorController.profileDoctor)
doctorRouter.route('/update-doctor').post(authDoctor, doctorController.updateDoctor)

module.exports = doctorRouter