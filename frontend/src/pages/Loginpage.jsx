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
     <div className="w-full min-h-[700px] relative overflow-hidden">
  <img src={'/login.jpg'} className="w-full h-full object-cover absolute inset-0 -z-10" />

  <motion.div 
   initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
  className="
    bg-white rounded-4xl absolute left-1/2 top-1/2 z-50
    transform -translate-x-1/2 -translate-y-1/2
    flex flex-col justify-evenly items-center p-6
    w-[400px] h-[500px]
 
    max-w-[90vw] max-h-[90vh]  /* limits width and height on small screens */
    sm:w-[400px] sm:h-[500px]  /* original size on sm and up */
  ">
    <h2 className="text-3xl text-gray-600 font-bold text-center">Login your Account</h2>

    <form onSubmit={handleLoginSubmit} className="space-y-6 w-full">
      <div>
        <label htmlFor="email" className="text-lg block mb-1">
          Email :
        </label>
        <div className="relative h-10">
          <div className="absolute pointer-events-none px-2 py-3">
            <Mail className="h-5 text-gray-800" />
          </div>
          <input
            type="text"
            id="email"
            className="bg-white w-full border-blue-950 border-2 rounded-md h-10 px-8"
            placeholder="example@gmail.com"
            value={loginData.email}
            onChange={(e) => setloginData({ ...loginData, email: e.target.value })}
            required
          />
          {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="password" className="text-lg block mb-1">
          Password :
        </label>
        <div className="relative h-10">
          <div className="absolute pointer-events-none px-2 py-3">
            <User className="h-5 text-gray-800" />
          </div>
          <input
            type="password"
            id="password"
            className="bg-white border-blue-950 border-2 w-full rounded-md h-10 px-8"
            placeholder="*****"
            value={loginData.password}
            onChange={(e) => setloginData({ ...loginData, password: e.target.value })}
            required
          />
          {errors.password && <p className="text-red-500">{errors.password[0]}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="bg-cyan-400 w-full p-3 mt-3 rounded-4xl text-xl text-white font-bold hover:bg-sky-600 transition-all duration-300"
        disabled={loading}
      >
        {loading ? "Logging..." : "Login"}
      </button>
    </form>
  </motion.div>
</div>

    </>

     
  );
}

export default LoginPage;
