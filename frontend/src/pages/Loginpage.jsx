import { useState } from "react";
import React from "react";
import { User, Mail,   } from "lucide-react";
import { useUserStore } from "../store/useUserStore";
import {z} from 'zod'
import {motion} from 'framer-motion'
const formSchema = z.object({
  email:z.string().email("Enter a valid email"),
  password : z.string().min(6,'enter a valid password ')
})
function LoginPage() {
   
  const [loginData ,setloginData] = useState({
  email : "",
  password : "",
  })

  const [errors,setErrors] = useState({})

  const {login , loading}= useUserStore()

  const handleLoginSubmit = (e) =>  {
    e.preventDefault()
        
    const result = formSchema.safeParse(loginData);
     if(!result.success) {
      const fieldError = result.error.flatten().fieldErrors;
      setErrors(fieldError)
      return;
     }
     setErrors({})
     login(loginData) 

    setloginData({
  email: "",
  password: ""
});
    
  }
  return (
    <> 
    <div className="h-screen w-full bg-white flex">

  {/* Left Section - Welcome */}
  <div className="hidden lg:flex lg:w-7/10 bg-cyan-50 items-center justify-center">
    <div className="text-center px-12">
      <h1 className="text-4xl font-extrabold text-cyan-600 mb-4">
        Welcome Back!
      </h1>
      <p className="text-gray-600 text-lg">
        Login to access your account and continue your journey with us.
      </p>
    </div>
  </div>

  {/* Right Section - Form */}
  <div className="w-full lg:w-3/10 flex items-center justify-center px-6 lg:px-8">
    <div className="w-full max-w-sm py-6 lg:py-0 mt-20 lg:mt-0">

      {/* Header */}
      <div className="mb-5 text-center">
        <h2 className="text-2xl font-extrabold text-gray-800">
          Login to Your Account
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Enter your credentials to continue
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleLoginSubmit} className="space-y-3">

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full h-9 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
            value={loginData.email}
            onChange={(e) =>
              setloginData({ ...loginData, email: e.target.value })
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
            value={loginData.password}
            onChange={(e) =>
              setloginData({ ...loginData, password: e.target.value })
            }
            required
          />
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password[0]}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-9 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md font-semibold text-sm transition duration-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-gray-500 text-xs mt-4">
        Don't have an account?{" "}
        <a href="/signup" className="text-cyan-600 hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  </div>
</div>


    </>

     
  );
}

export default LoginPage;
