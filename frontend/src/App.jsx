import { Navigate, Route,  Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import Signup from "./pages/Signup"
import LoginPage from "./pages/Loginpage"
import { Toaster } from "react-hot-toast"
import RecruiterDashboard from "./pages/RecruiterDashboard"
import JobSeekerDashboard from "./pages/JobSeekerDashboard"
import JobDetail from "./pages/JobDetail"
import { useUserStore } from "./store/useUserStore"
import Applicants from "./pages/Applicants"
import LoadingSpinner from "./components/LoadingSpinner"
import { useEffect } from "react"
import { useJobStore } from "./store/useJobStore"
import NotFoundPage from "./components/NotFoundPage"
 

 

function App() {
   const{job} = useJobStore()
   const {user , checkAuth , checkingAuth} = useUserStore()
   useEffect(() => {
		checkAuth();
	}, [checkAuth]);

  if (checkingAuth) return <LoadingSpinner />;

 
  return (
    <> 
     <div className="h-full bg-white overflow-hidden">
     {/* <div className="absolute inset-0 overflow-hidden">
     <div className="absolute inset-0">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle,_rgba(2,_0,_36,_1)_0%,_rgba(9,_9,_121,_1)_0%,_rgba(9,_18,_127,_1)_0%,_rgba(15,_15,_138,_1)_0%,_rgba(0,_212,_255,_1)_100%)] */}
{/* "> */}
      {/* </div>
     </div>

     </div> */}
     <div className="relative z-50 pt-20"> 

     <Navbar/>
     <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/signup" element={!user? <Signup/>: <Navigate to={'/'}/> } />
      <Route path="/login" element={!user ?  <LoginPage/> : <Navigate to={'/'}/> } />
     
      <Route path="/recruiterdashboard" element={user?.role === "recruiter"  ? <RecruiterDashboard/>: <Navigate to={'/'}/>} /> 
      <Route path="/jobseekerdashboard" element={user?<JobSeekerDashboard/>:<Navigate to={'/'}/>} />
      
      <Route path="/jobdetail/:id" element={ <JobDetail/> } />
      <Route path="/applicants/:jobId" element={user?<Applicants/> : <Navigate to={'/'}/>} />

      <Route path="/*" element={<NotFoundPage />} />

     </Routes>
      
     </div>
     <Toaster/>
     </div>
    </>
  )
}

export default App
