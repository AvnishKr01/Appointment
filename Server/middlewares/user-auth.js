const jwt = require('jsonwebtoken');

const authUser = async (req, res, next) => {
    try {
        const {token} = req.headers
        if(!token) {
            return res.status(401).json({success:false, message:"Unauthorized Login"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.userId = decoded.id;
        //  req.user = { userId: decoded.userId };
        next()
    } catch (error) {
        console.log(error);
        res.status(400).json({success:false, message:error.message})
        
    }
}

module.exports = authUser