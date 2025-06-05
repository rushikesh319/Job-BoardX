import React, { useState } from "react";
import { User, Mail, Briefcase , Loader ,UserPlus} from "lucide-react";
import {useUserStore} from "../store/useUserStore";
import {z} from 'zod';
import {motion} from 'framer-motion'
  const formSchema = z.object({
    name : z.string().min(2,"Name is required") ,//minimum 2 char long name,else it will show name is required
    email : z.string().email("Enter a valid email"),
    password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[a-z]/, "Must include at least one lowercase letter")
    .regex(/[0-9]/, "Must include at least one number")
    .regex(/[^A-Za-z0-9]/, "Must include at least one special character")
    .refine((val) => !val.includes(" "), {
      message: "Password cannot contain spaces",
    }),
    role : z.string().min(1,"please select an option")
  })

  

function Signup() {
   
  const [formData ,setFormData] = useState({
  name : "",
  email : "",
  password : "",
  role : ""
  })


  const [errors,setErrors] = useState({})
 
 
  
  const {signup,loading} = useUserStore()

  const handleFormSubmit = (e) => {
    // setFormData(formData)
    e.preventDefault() // used to dont refresh page once form is submitted 
    
     const result = formSchema.safeParse(formData);
     if(!result.success) {
      const fieldError = result.error.flatten().fieldErrors;
      setErrors(fieldError)
      return;
     }
     setErrors({})
     console.log("form data is valid ",result.data )
     
     signup(formData)

    
    console.log(formData) 

    setFormData({
  name: "",
  email: "",
  password: "",
  role: ""
});
    
  }
  return (
    <>
     <div className="flex flex-row h-full w-full ">
<div className="hidden md:flex w-[60%] h-[700px] overflow-hidden justify-center items-center">
  <img src={'/signup1.jpg'} className="h-full object-cover" />
</div>

         <motion.div 
         initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
         className="rounded-2xl w-full md:w-[40%] py-4 h-[700px] flex flex-col justify-center items-center gap-4">
         <h2 className=" text-3xl font-bold  text-gray-600  flex justify-center "> Create Your Account</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4 w-[60%] mx-auto">
            
            <div>
              <label htmlFor="name" className="text-lg ">
           
                Name :
              </label>
              <div className="mt-1 relative  h-10 px-2 py-1">
                <div className="absolute pointer-events-none px-2 py-3">
                  <User className="h-5 text-gray-800" />
                </div>
                <input
                  type="text"
                  className="bg-white border-blue-950 border-2  w-full  rounded-md h-10 px-8"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e)=>setFormData({...formData,name: e.target.value})}
                  required
                />
                {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="name" className="text-lg ">
              
                Email :
              </label>
              <div className="mt-1 relative  h-10 px-2 py-1">
                <div className="absolute pointer-events-none px-2 py-3">
                  <Mail className="h-5 text-gray-800" />
                </div>
                <input
                  type="text"
                  className=" border-blue-950 border-2 w-full    rounded-md h-10 px-8"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={(e)=>setFormData({...formData,email: e.target.value})}
                  required
                />
                 {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="name" className="text-lg ">
            
                Password :
              </label>
              <div className="mt-1 relative  h-10 px-2 py-1">
                <div className="absolute pointer-events-none px-2 py-3">
                  <User className="h-5 text-gray-800" />
                </div>
                <input
                  type="password"
                  className=" border-blue-950 border-2 w-full  rounded-md h-10 px-8"
                  placeholder="*****"
                  value={formData.password}
                  onChange={(e)=>setFormData({...formData,password: e.target.value})}
                  required
                />
                 {errors.password && <p className="text-red-500">{errors.password[0]}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="role" className="text-lg ">
                Role :
              </label>
              <div className="mt-1 relative h-10 px-2 py-1">
                <div className="absolute pointer-events-none px-2 py-3">
                  <Briefcase className="h-5 text-gray-800" />
                </div>
                <select
                  id="role"
                  className=" border-blue-950 border-2 w-full  rounded-md h-10 px-8 "
                  value={formData.role}
                  onChange={(e)=>setFormData({...formData,role: e.target.value})}
                  required
                >
                  <option value="" >Select role</option>
                  <option value="recruiter">Recruiter</option>
                  <option value="jobseeker">Job Seeker</option>
                </select>
                 {errors.role && <p className="text-red-500">{errors.role[0]}</p>}
              </div>
            </div>
            
            <button type="submit" className="bg-cyan-400 w-full text-white p-3 mt-3 rounded-3xl text-xl font-bold hover:bg-sky-600 duration-300 " disabled={loading}> 
            {loading ? (
								<>
								 
									Loading...
								</>
							) : (
								<>
								 
									Create Account
								</>
							)}
            </button>
          </form>
        </motion.div>
      </div>
    </>

     
  );
}

export default Signup;
