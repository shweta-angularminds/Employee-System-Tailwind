import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { showToast } from "../service/notify";
import { registerUser } from "../service/authService";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = (formData) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;

    let validationErrors = {};

    if (!formData.username) validationErrors.username = "Username is required!";
    else if (!/^[A-Za-z\s]+$/.test(formData.username.trim())) {
      validationErrors.username =
        "username  can only contain letters and spaces.";
    }
    if (!formData.email) validationErrors.email = "Email is required!";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      validationErrors.email = "Please enter a valid email.";

    if (!formData.organization)
      validationErrors.organization = "Organization is required!";
    else if (!/^[A-Za-z\s]+$/.test(formData.organization.trim())) {
      validationErrors.organization =
        "Organization name can only contain letters and spaces.";
    }
    if (!passwordRegex.test(formData.password)) {
      validationErrors.password =
        "Password must be at least 6 characters long and contain at least one alphabet and one digit.";
    }

    if (formData.password !== formData.confirmPassword)
      validationErrors.confirmPassword = "Password does not match!";

    return validationErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};
    validationErrors = await validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { confirmPassword, ...dataToSend } = formData;
      console.log("data:", dataToSend);
      await registerUser(dataToSend);

      setErrors({});
      showToast("Registered Succesfully!", "success");
      setFormData({
        username: "",
        email: "",
        organization: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      showToast("Unable to register, Please try again!", "error");
      console.log("Registration failed:", error);
      setErrors({
        api: "An error occurred while registering. Please try again.",
      });
    }
  };

  return (
    <>
      <div
        className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 dark:text-white dark:bg-gray-800"
       
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight dark:text-white text-gray-900">
            Sign Up to create account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900  dark:text-white"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  onChange={handleChange}
                  value={formData.username}
                  autoComplete="username"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.username && <p className="error">{errors.username}</p>}
              </div>
            </div>

            <div>
              <label
                htmlFor="organization"
                className="block text-sm/6 font-medium text-gray-900  dark:text-white"
              >
                Organization
              </label>
              <div className="mt-2">
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  required
                  value={formData.organization}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.organization && (
                  <p className="error">{errors.organization}</p>
                )}
              </div>
            </div>
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm/6 font-medium text-gray-900  dark:text-white"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.confirmPassword && (
                  <p className="error">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md dark:text-white  bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Account
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-300">
            Already register?
            <Link
              to="/login"
              className="font-semibold px-1 text-indigo-600 hover:text-indigo-500 dark:text-white"
            >
              Login here!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
