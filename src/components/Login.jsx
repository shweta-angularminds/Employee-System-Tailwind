import React ,{useState}from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { showToast } from "../service/notify";
 import { loginUser } from "../service/authService";
const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      let validationErrors = {};
      if (!formData.email) validationErrors.email = "Email is required!";
      if (!/\S+@\S+\.\S+/.test(formData.email))
        validationErrors.email = "Please enter a valid email.";
      if (!formData.password)
        validationErrors.password = "Password is required!";
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      } else {
        try {
          await loginUser(formData);
          console.log("Login data:",formData)
          showToast("Login successful!", "success");

          setTimeout(() => {
            console.log("naviagted to dashboard");
            navigate("/dashboard");
          }, 1000);

          setErrors({});
        } catch (error) {
          console.log("Errror found:",error)
          showToast("Login Failed!", "error");
        }
      }
    };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 dark:text-white dark:bg-gray-800" style={{height:"100vh"}}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight dark:text-white text-gray-900">
            Sign In to account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form onSubmit={handleSubmit} className="space-y-6">
           

          
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900  dark:text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900  dark:text-white"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </div>
            </div>

          

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md dark:text-white  bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
              Login
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-300">
            New user?
            <Link
              to="/register"
              className="font-semibold px-1 text-indigo-600 hover:text-indigo-500 dark:text-white"
            >
              Register here!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
