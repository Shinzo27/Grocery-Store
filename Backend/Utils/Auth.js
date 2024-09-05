import jwt from 'jsonwebtoken'

export const generateToken = (user, message, stautsCode, res) => {
    const token = user.generateWebToken();
    const cookieName = user.role === "Admin" ? "AdminToken" : "CustomerToken"; 
    res.cookie(cookieName, token, {
      httpOnly: true,
      sameSite: 'None'
    })
    return res
      .status(stautsCode)
      .json({
        success: true,
        message,
        username: user.username,
        token,
      });
};

export function checkForAuthentication(cookieName) {
  return(req,res,next)=>{
    const token = req.cookies[cookieName]
    if(!token) return next()
    
    try {
      const userPayload = jwt.verify(token, process.env.JWT_SECRET_KEY)
      req.user = userPayload
    } catch (error) {
      console.log(error)
    }
    return next()
  }
}