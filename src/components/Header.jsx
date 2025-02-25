import React, { useState, useContext } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { showToast } from "../service/notify";
import { logOutUser, getProfile } from "../service/authService";
import { useThemeContext } from "../utils/ThemeContext";

const Header = () => {
  const { theme, setTheme } = useThemeContext();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    organization: "",
  });
  // const { theme, toggleTheme } = useContext(ThemeContext);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isProfileFetched, setIsProfileFetched] = useState(false);

  const toggleTheme = () => {
    // const newTheme = theme === "dark" ? "light" : "dark";
    // console.log("them:", theme);
    // setTheme(newTheme); // Update the theme in context

    if(theme === "light") setTheme("dark")
    if(theme === "dark") setTheme("light")
  };

  const fetchProfileData = async () => {
    try {
      if (isLoggedOut || isProfileFetched) return;
      const data = await getProfile();
      setProfile(data);
      setIsProfileFetched(true);
    } catch (error) {
      showToast("Error loading profile", "error");
    }
  };

  if (!isProfileFetched && !isLoggedOut) {
    fetchProfileData();
  }

  const logOut = async () => {
    try {
      await logOutUser();
      showToast("Logged out successfully!", "success");
      setIsLoggedOut(true);
      setIsProfileFetched(false);
      navigate("/login");
    } catch (error) {
      showToast("Something went wrong", "error");
    }
  };

  return (
    <>
      {/* <div className="container-fluid m-0 bg-white shadow-sm">
        <nav className="d-flex justify-content-between">
          <h3 className="mt-2 text-capitalize">{profile.organization}</h3>
          <span className="p-2 me-3">
            <div className="dropdown-center">
              <button
                className="btn dropdown-toggle fw-bold"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <label className="text-capitalize"> {profile.username}</label>
              </button>
              <ul className="dropdown-menu bg-white">
                <li onClick={logOut} className="text-center">
                  <i className="fa-solid fa-right-from-bracket"></i> logout
                </li>
              </ul>
            </div>
          </span>
        </nav>
      </div> */}
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <div className="flex items-center">
             
              <span className="self-center capitalize text-xl font-semibold whitespace-nowrap dark:text-white text-gray-800">
                {profile.organization}
              </span>
            </div>
            <div className="flex items-center lg:order-2">
              <button
                onClick={() => toggleTheme()}
                className=" text-white py-2 px-4 rounded-lg"
              >
                {theme === "dark" ? (
                  <i className="fa-solid fa-moon dark:text-white text-xl"></i>
                ) : (
                  <i class="fa-solid fa-sun dark:text-white text-gray-800 text-xl"></i>
                )}
              </button>
              <label className="text-gray-800 capitalize dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                {profile.username}
              </label>
              <button
                onClick={logOut}
                className="text-gray-800 dark:text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <i class="fa-solid fa-right-from-bracket text-lg"></i>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
