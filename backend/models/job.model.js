import mongoose, { Schema } from "mongoose";

export const jobSchema = new Schema({
  title : {
    type : String,
    required : true
  },
  description:{
    type: String,
    required : true
  },
  location:{
     type : String,
     required: true
  },
  jobType : {
    type : String,
    enum: ["full-time", "part-time", "contract", "internship"],
    required : true
  },
  salaryRange : {
    type : Number,
    required: true
  },
  skillsRequired : {
    type: [String],
    required : true
  },
  companyName: {
    type: String,
    default: ""
  },
  experienceLevel: {
    type: String,
    enum: ["entry-level", "mid-level", "senior-level"],
    default: "entry"
  },
  isRemote: {
    type: Boolean,
    default: false
  },
  postedBy:{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true
    
  }
},{timestamps:true})


const Job = mongoose.model("Job",jobSchema)
export default Job