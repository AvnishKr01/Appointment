const jwt = require('jsonwebtoken');

const authAdmin = async (req, res, next) => {
    try {
        const {atoken} = req.headers
        if(!atoken) {
            return res.status(401).json({success:false, message:"Unauthorized Login"});
        }
        const decoded = jwt.verify(atoken, process.env.JWT_SECRET);
        if(decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.status(400).json({success:false, message:"Unauthorized login again"});
        }
        next()
    } catch (error) {
        console.log(error);
        res.status(400).json({success:false, message:error.message})
        
    }
}

module.exports = authAdmin