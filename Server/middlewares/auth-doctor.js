const jwt = require('jsonwebtoken');

const authDoctor = async (req, res, next) => {
    try {
        const dToken = req.headers.token
        // console.log(dToken);
        
        if(!dToken) {
            return res.status(401).json({success:false, message:"Unauthorized Login"});
        }
        const decoded = jwt.verify(dToken, process.env.JWT_SECRET);
    //    req.body.docId = decoded.id;
      req.doctorId = decoded.id; 
        //  req.user = { userId: decoded.userId };
        next()
    } catch (error) {
        console.log(error);
        res.status(400).json({success:false, message:error.message})
        
    }
}

module.exports = authDoctor

