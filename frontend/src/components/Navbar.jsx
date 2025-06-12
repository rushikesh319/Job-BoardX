import clsx from 'clsx'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search , UserPlus , LogIn , LogOut , Menu ,X} from 'lucide-react'
import { useUserStore } from '../store/useUserStore'


function Navbar() {
  const {user , logout } = useUserStore()
    const [menuOpen, setMenuOpen] = useState(false);

   const navigate = useNavigate();

   const dashboardRoutes = {
  recruiter: '/recruiterdashboard',
  jobseeker: '/jobseekerdashboard',
};

   const handleClick = () => {
      if (!user) return;
  const path = dashboardRoutes[user.role] || '/';
  navigate(path);
   }
  return (
     
    <header className="w-full bg-white bg-opacity-90 backdrop-blur-md fixed top-0 shadow-xl z-100 transition-all duration-300 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
 
        <Link
          to={"/"}
          className="text-2xl font-bold text-cyan-400 flex gap-1 items-center"
        >
          JobBoardX <Search className="h-8" />
        </Link>

       
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
 
        <div className="hidden md:flex gap-4 items-center">
          <Link
            to={"/"}
            className="w-40 h-12 bg-cyan-400 text-white text-xl font-mono font-bold flex items-center justify-center rounded-md shadow-md hover:bg-sky-500 transition-all duration-300"
          >
            Home
          </Link>

          {user ? (
            <>
              <button
                onClick={handleClick}
                className="w-40 h-12 bg-cyan-400 text-white text-xl font-mono font-bold flex items-center justify-center rounded-md shadow-md hover:bg-sky-500 transition-all duration-300"
              >
                Dashboard
              </button>
              <button
                onClick={logout}
                className="w-40 h-12 bg-cyan-400 text-white text-xl font-mono font-bold flex items-center justify-center rounded-md shadow-md hover:bg-sky-500 transition-all duration-300"
              >
                <LogOut className="h-5" />
              </button>
            </>
          ) : (
            <>
              <Link
                to={"/signup"}
                className="w-40 h-12 bg-cyan-400 text-white text-xl font-mono font-bold flex items-center justify-center rounded-md gap-2 shadow-md hover:bg-sky-500 transition-all duration-300"
              >
                <UserPlus className="h-5" /> SignUp
              </Link>
              <Link
                to={"/login"}
                className="w-40 h-12 bg-cyan-400 text-white text-xl font-mono font-bold flex items-center justify-center rounded-md gap-2 shadow-md hover:bg-sky-500 transition-all duration-300"
              >
                <LogIn className="h-5" /> Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 mt-4 px-4 pb-4">
          <Link
            to={"/"}
            className="w-full text-center bg-cyan-400 text-white text-lg font-mono py-2 rounded-md shadow-md hover:bg-sky-500"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          {user ? (
            <>
              <button
                onClick={() => {
                  handleClick();
                  setMenuOpen(false);
                }}
                className="w-full text-center bg-cyan-400 text-white text-lg font-mono py-2 rounded-md shadow-md hover:bg-sky-500"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="w-full text-center bg-cyan-400 text-white text-lg font-mono py-2 rounded-md shadow-md hover:bg-sky-500"
              >
                <LogOut className="inline-block h-4 mr-1" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to={"/signup"}
                className="w-full text-center bg-cyan-400 text-white text-lg font-mono py-2 rounded-md shadow-md hover:bg-sky-500"
                onClick={() => setMenuOpen(false)}
              >
                <UserPlus className="inline-block h-4 mr-1" /> SignUp
              </Link>
              <Link
                to={"/login"}
                className="w-full text-center bg-cyan-400 text-white text-lg font-mono py-2 rounded-md shadow-md hover:bg-sky-500"
                onClick={() => setMenuOpen(false)}
              >
                <LogIn className="inline-block h-4 mr-1" /> Login
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
 

export default Navbar