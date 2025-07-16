const express = require('express');
const adminController = require('../controllers/admin-controller');
const doctorController = require('../controllers/doctor-controller');
const upload = require('../middlewares/multer');
const authAdmin = require('../middlewares/auth-admin');

const adminRouter = express.Router();

adminRouter.route('/admin-add').post(authAdmin, upload.single('image'), adminController.addDoctor)
adminRouter.route('/admin-all').post(authAdmin, adminController.allDoctor)
adminRouter.route('/adminlogin').post(adminController.loginAdmin)
adminRouter.route('/availability').post(authAdmin, doctorController.changeAvailablity)
adminRouter.route('/appointment').get(authAdmin, adminController.appointmentAdmin)
adminRouter.route('/cancel-appointment').post(authAdmin, adminController.appointmentCancel)
adminRouter.route('/dashboard-data').get(authAdmin, adminController.dashboardData)

module.exports = adminRouter;