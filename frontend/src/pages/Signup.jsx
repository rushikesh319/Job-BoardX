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
    <div className="h-screen w-full bg-white flex">

  {/* Left Section - Welcome */}
  <div className="hidden lg:flex lg:w-7/10 bg-cyan-50 items-center justify-center">
    <div className="text-center px-12">
      <h1 className="text-4xl font-extrabold text-cyan-600 mb-4">
        Welcome!
      </h1>
      <p className="text-gray-600 text-lg">
        Join our platform and start your journey.
      </p>
    </div>
  </div>

  {/* Right Section - Form */}
  <div className="w-full lg:w-3/10 flex items-center justify-center px-6 lg:px-8">
    <div className="w-full max-w-sm py-6 lg:py-0 mt-20 lg:mt-0">

      {/* Header */}
      <div className="mb-5 text-center">
        <h2 className="text-2xl font-extrabold text-gray-800">
          Create Your Account
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Join us and start your journey
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleFormSubmit} className="space-y-3">

        {/* Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full h-9 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name[0]}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full h-9 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email[0]}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full h-9 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password[0]}</p>}
        </div>

        {/* Role */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">I am a</label>
          <select
            className="w-full h-9 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
            required
          >
            <option value="">Select</option>
            <option value="recruiter">Recruiter</option>
            <option value="jobseeker">Job Seeker</option>
          </select>
          {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role[0]}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-9 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md font-semibold text-sm transition duration-300"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-gray-500 text-xs mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-cyan-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  </div>
</div>

    </>

     
  );
}

export default Signup;
