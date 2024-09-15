import jwt from 'jsonwebtoken'

export const generateToken = (user, message, stautsCode, res) => {
    const token = user.generateWebToken();
    const cookieName = "CustomerToken"
    res.cookie(cookieName, token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 1000 * 1,
      path: "/",
    })
    return res
      .status(stautsCode)
      .json({
        success: true,
        message,
        user,
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

export const generateAdminToken = (user, message, stautsCode, res) => {
  const token = user.generateWebToken();
  const cookieName = "AdminToken";
  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 1000 * 1,
    path: "/",
  });
  return res
    .status(stautsCode)
    .json({
      success: true,
      message,
      user,
      token,
    });
}