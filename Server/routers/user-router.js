const express = require('express');
const userController = require('../controllers/user-controller');
const authUser = require('../middlewares/user-auth');
const upload = require('../middlewares/multer');

const userRouter = express.Router();

userRouter.route('/register').post(userController.register)
userRouter.route('/userlogin').post(userController.userLogin)

userRouter.route('/profile').get(authUser ,userController.userProfile)
userRouter.route('/updateProfile').post(authUser, upload.single('image'), userController.updateUser)

userRouter.route('/book-appointment').post(authUser, userController.bookAppointment)
userRouter.route('/all-appointment').get(authUser, userController.allAppontment)
userRouter.route('/cancel-appointment').post(authUser, userController.cancelAppointment)

userRouter.route('/razorpay').post(authUser, userController.razorpayPayment)
userRouter.route('/verify-razorpay').post(authUser, userController.verifyRazorpay)


module.exports = userRouter;