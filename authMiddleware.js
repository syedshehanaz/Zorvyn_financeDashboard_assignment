const jwt = require('jsonwebtoken')
const authMiddleware = (req,res,next) => {
const authHeader = req.headers.authorization;
 console.log("HEADER:", authHeader);
if(!authHeader){
    return res.status(401).json({ message: "NO token provided" });
}
// Check correct format
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Invalid token format" });
  }
const token = authHeader.split(' ')[1];
console.log("TOKEN:", token);
try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
    next();
   //console.log(req.headers.authorization)
}
catch(error){
    console.log("JWT ERROR:", error.message);
    return res.status(401).json({ message: "Invalid Token "});
}
};
module.exports = authMiddleware;