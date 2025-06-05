 import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose"

export const userSchema = new Schema({
  name: {
    type : String,
    required : true
  },
  email:{
    type: String,
    required : true,
    unique: true
  },
  password : {
    type : String,
    required: true
  },
  role:{
    type: String,
    enum : ["jobseeker","recruiter"],
    default: "jobseeker"
  }
}, {
  timestamps:true
} )

// password hashing 
userSchema.pre("save",async function(next) {
  if(!this.isModified("password")) return next();
  const salt  = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt);
  next();
})

//password comparing 
userSchema.methods.comparePassword = function(password){
  return bcrypt.compare(password,this.password)
}

const User = mongoose.model("User" ,userSchema)
export default User;