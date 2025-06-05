import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import {redis} from "../lib/redis.js"

const generateToken = function(userId)  {
  const accessToken = jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET, {expiresIn :"15m"},)
  const refreshToken = jwt.sign({userId},process.env.REFRESH_TOKEN_SECRET, {expiresIn : "7d"})
  return{accessToken,refreshToken}
}

const storeRefreshToken = async(userId,refreshToken)=> {
  await redis.set(`refresh_token${userId}`,refreshToken,"EX",7*24*60*60*1000)
}
const setCookie = async(res,accessToken,refreshToken)=>{
  res.cookie("accessToken",accessToken, {
      httpOnly : true,
      sameSite: "strict",
      secure:process.env.NODE_ENV === "production",
      maxAge : 15*60*1000
  })
  res.cookie("refreshToken",refreshToken, {
      httpOnly : true,
      sameSite: "strict",
      secure:process.env.NODE_ENV === "production",
      maxAge : 7*24*60*60*1000
  })
}
export const signup  = async(req,res)=> {
  try {
    const {name,email,password,role} = req.body 
 
     
    const userExist = await User.findOne({email})
    if(userExist){
      return res.status(400).json({message:"user already exist"})
    }
    const user = await User.create({name,email,password,role})
 
    const {accessToken,refreshToken} = generateToken(user._id)
    await storeRefreshToken(user._id,refreshToken)
    setCookie(res,accessToken,refreshToken)
     
    res.json({
      user: {
      _id : user._id,
      name : user.name,
      email:user.email,
      role : user.role
      }
    })
    
  } catch (error) {
    console.log("error in signUp controller",error.message)
    res.status(500).json({message:"internal Server Error", error:error.message})
    
  }
}

export const login  = async(req,res)=> {
  try {
    const {email,password} = req.body
    const user = await User.findOne({email})

    if (user &&(await user.comparePassword(password))){
      const {accessToken,refreshToken} = generateToken(user._id)
      await storeRefreshToken(user._id,refreshToken)
      setCookie(res,accessToken,refreshToken)
      res.json({
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
      
    }
    else{
      res.status(404).json({message:"invalid email or password "})
    }
  } catch (error) {
    console.log("error in login controller",error.message)
    res.status(500).json({message:"Internal Server Error" , error:error.message})
  }
}

export const logout = async(req,res)=> {
  try {
    const refreshToken = req.cookies.refreshToken
     if(refreshToken){
      const decoded = jwt.verify(refreshToken ,process.env.REFRESH_TOKEN_SECRET)
      await redis.del(`refresh_token${decoded.userId}`)
     }
     res.clearCookie("accessToken")
     res.clearCookie("refreshToken")
     res.json({message:"logged out Succesfully"})
 
  } catch (error) {
    console.log("logged Out Successfully",error.message)
    res.status(500).json({message:"Internal Server Error",error:error.message})
  }
}


// refresh the acessToken
export const refreshToken = async(req,res)=>{
try {
   const refreshToken = req.cookies.refreshToken
   if(!refreshToken){
    return res.status(401).json({message:"no refreshtoken provided"})
   }
   const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
   const storedToken = await redis.get(`refresh_token${decoded.userId}`)
   if(storedToken !== refreshToken){
    return res.status(401).json({message:"invalid refresh token"})
   }
   const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

  res.cookie("accessToken",accessToken,{
    httpOnly : true,
      sameSite: "strict",
      secure:process.env.NODE_ENV === "production",
      maxAge : 15*60*1000
  })
  res.json({message:"token refreshed successfully"})
  
} catch (error) { 
   console.log("error in refreshToken controller",error.message)
   res.status(500).json({message:"Internal Server Error",error:error.message})
}
}