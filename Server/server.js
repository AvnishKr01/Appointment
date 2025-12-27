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
const port = process.env.PORT || 10000;
connectCloudinary();
connectDB();

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
// ✅ Export app for Vercel
module.exports = app;

// ✅ Only run app.listen() if running locally
if (require.main === module) {
  const port = process.env.PORT || 10000;
  app.listen(port, 0.0.0.0, () => {
    console.log(`Server running on port ${port}`);
  });
}





