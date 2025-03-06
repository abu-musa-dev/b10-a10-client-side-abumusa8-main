import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../../firebase';
import { Toaster, toast } from "react-hot-toast";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [loginToastShown, setLoginToastShown] = useState(sessionStorage.getItem("loginToastShown") === "true");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        if (!loginToastShown) {
          toast.success("Logged in successfully!", { duration: 8000, position: "top-center" });
          setLoginToastShown(true);
          sessionStorage.setItem("loginToastShown", "true");
        }
      } else {
        setUser(null);
        setLoginToastShown(false);
        sessionStorage.removeItem("loginToastShown");
      }
    });

    return () => unsubscribe();
  }, [loginToastShown]);

  useEffect(() => {
    setLoginToastShown(true);
  }, [location.pathname]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate('/');
        toast.success("Logged out successfully!", { duration: 8000, position: "top-center" });
        setLoginToastShown(false);
        sessionStorage.removeItem("loginToastShown");
      })
      .catch((error) => {
        console.error("Logout failed: ", error);
        toast.error("Logout failed! Please try again.", { duration: 8000, position: "top-center" });
      });
  };

  const handleThemeToggle = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      const theme = newMode ? "dark" : "light";
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
      return newMode;
    });
  };

  return (
    <>
      <div className="navbar bg-base-300 relative z-20 p-5 sticky top-0">
        <div className="flex-1">
          <button className="btn btn-ghost text-xl">DREEM-FOUND</button>
        </div>
        <div className="flex-none hidden md:flex space-x-4">
          <Link to="/" className="btn btn-ghost">Home</Link>
          <Link to="/allcamping" className="btn btn-ghost">All camping</Link>
          <Link to="/AddNewCampaign" className="btn btn-ghost">Add New Camping</Link>
          <Link to="/mycamping" className="btn btn-ghost">My Campaign</Link>
          <Link to="/my-donations" className="btn btn-ghost">My Donations</Link>
          {user ? (
            <div className="flex items-center space-x-2">
              <img src={user.photoURL || "https://via.placeholder.com/40"} alt="Profile" className="w-10 h-10 rounded-full" />
              <button onClick={handleLogout} className="btn btn-error">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">Login</Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="dropdown dropdown-end md:hidden">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/campaigns">Donation Campaigns</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            {user ? (
              <li><button onClick={handleLogout} className="btn btn-error w-full">Logout</button></li>
            ) : (
              <li><Link to="/login" className="btn btn-primary">Login</Link></li>
            )}
          </ul>
        </div>

        {/* Theme Toggle using the swap component */}
        <div className="flex items-center space-x-4">
          <button onClick={handleThemeToggle} className="text-xl">
            <svg
              className={`h-10 w-10 fill-current ${isDarkMode ? "swap-on" : "swap-off"}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              {isDarkMode ? (
                <path d="M21.64,13A10,10,0,0,1,12,2V1a1,1,0,0,0-2,0V2.05A10,10,0,0,0,2.05,11H1a1,1,0,0,0,0,2H2.05A10,10,0,0,0,11,21.95V23a1,1,0,0,0,2,0V21.95a9.92,9.92,0,0,0,4.38-1.74,1,1,0,0,0,1.17-1.17A10,10,0,0,0,21.64,13ZM5.79,14.21A7.93,7.93,0,0,1,11,5.08,6,6,0,0,0,18.92,13,7.93,7.93,0,0,1,5.79,14.21Z" />
              ) : (
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41-1.41Z" />
              )}
            </svg>
          </button>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Navbar;
