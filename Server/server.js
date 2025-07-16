require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');
const connectCloudinary = require('./utils/cloudinary');
const adminRouter = require('./routers/admin-router');
const doctorRouter = require('./routers/doctor-router');
const userRouter = require('./routers/user-router');

// App Config 
const app = express();
const port = process.env.PORT || 4000;
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
res.send('Api is working')
})


// APi end point
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

// In server File Connection Of MongoDB
connectDB().then(() => {
    app.listen(port, () => {
    console.log(`Server start ${port}`);
})
})