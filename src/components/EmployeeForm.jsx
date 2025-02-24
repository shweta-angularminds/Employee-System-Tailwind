import React, { useState, useEffect } from "react";
import { addEmployee, updateEmployee } from "../service/employeeService";
import { showToast } from "../service/notify";
import "../App.css";
const EmployeeForm = ({
  showModal,
  setShowModal,
  employeeData,
  refreshData,
}) => {
  const [employeeName, setEmployeeName] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [workType, setWorkType] = useState([]);
  const [gender, setGender] = useState("");

  const [errors, setErrors] = useState({
    employeeName: "",
    designation: "",
    department: "",
    salary: "",
    email: "",
    workType: "",
    gender: "",
    avatar: "",
  });

  useEffect(() => {
    if (showModal && !employeeData) {
      setEmployeeName("");
      setDesignation("");
      setDepartment("");
      setSalary("");
      setEmail("");
      setWorkType([]);
      setGender("");
      setAvatar("");
    }
    if (employeeData) {
      setEmployeeName(employeeData.employee_name);
      setDesignation(employeeData.designation);
      setDepartment(employeeData.department);
      setSalary(employeeData.salary);
      setEmail(employeeData.email);
      setWorkType(employeeData.workType);
      setGender(employeeData.gender);

      setAvatar(employeeData?.avatar);
    }
  }, [showModal, employeeData]);

  const validateForm = () => {
    let formErrors = { ...errors };
    let isValid = true;

    if (employeeName.trim().length < 3) {
      formErrors.employeeName = "Employee Name must be at least 3 characters.";
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(employeeName.trim())) {
      formErrors.employeeName =
        "Employee Name can only contain letters and spaces.";
      isValid = false;
    } else {
      formErrors.employeeName = "";
    }

    if (designation.trim().length < 2) {
      formErrors.designation = "Designation name must be at least 2 characters";
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(designation.trim())) {
      formErrors.designation =
        "Designation can only contain letters and spaces.";
      isValid = false;
    } else {
      formErrors.designation = "";
    }

    if (department.trim().length < 2) {
      formErrors.department = "Department name must be at least 2 characters";
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(department.trim())) {
      formErrors.department = "Department can only contain letters and spaces.";
      isValid = false;
    } else {
      formErrors.department = "";
    }

    if (!email) formErrors.email = "Email is required!";
    else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Please enter a valid email.";
      isValid = false;
    } else {
      formErrors.email = "";
    }

    if (!salary || isNaN(salary) || salary <= 0) {
      formErrors.salary = "Salary must be a positive number.";
      isValid = false;
    } else {
      formErrors.salary = "";
    }

    setErrors(formErrors);
    return isValid;
  };
  const handleWorkTypeChange = (event) => {
    const value = event.target.value;
    setWorkType((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const formData = {
      employee_name: employeeName,
      designation,
      department,
      salary,
      email,
      workType,
      gender,
      avatar,
    };
    try {
      if (employeeData) {
        console.log("update employee data:", formData);
        await updateEmployee(employeeData._id, formData);
        showToast("Updated successfully!", "success");
        document.getElementById("avatar").value = null;
      } else {
        console.log("employee data:", formData);
        await addEmployee(formData);
        document.getElementById("avatar").value = null;
        showToast("Added successfully!", "success");
      }
      refreshData();
      setShowModal(false);
    } catch (error) {
       avatar.value = "";
      showToast("There was an error. Please try again.", "error");
      console.log("error while adding employee:", error);
    }
  };

  return (
    <>
      <div
        className={`modal ${
          showModal ? "block" : "hidden"
        } fixed inset-0 z-50 flex items-center justify-center`}
        tabIndex="-1"
        data-modal-placement="top-left"
        aria-labelledby="employeeFormModal"
        style={{
          backgroundColor: showModal ? "rgba(0, 0, 0, 0.5)" : "transparent",
        }}
      >
        <div className="modal-dialog bg-white text-gray-600 dark:bg-gray-600 dark:text-gray-50 rounded-lg shadow-lg w-3/4 max-w-full overflow-y-auto max-h-[90vh]">
          <div className="modal-content w-full">
            <div className="modal-header border-b-gray-100 p-4 flex">
              <h5
                className="modal-title text-xl font-semibold"
                id="employeeFormModal"
              >
                {employeeData ? "Update Employee" : "Add New Employee"}
              </h5>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setErrors({});
                }}
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="modal-body p-4 max-h-[60vh] overflow-y-auto">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-2">
                  {/* Name Input Field */}
                  <div className="mb-4 px-2 w-full md:w-1/2">
                    <label
                      htmlFor="employeeName"
                      className="form-label font-medium block mb-2 dark:text-gray-300"
                    >
                      Employee Name
                    </label>
                    <input
                      type="text"
                      className="form-control border p-2 w-full rounded border-gray-500 capitalize text-sm outline-0"
                      id="employeeName"
                      value={employeeName}
                      onChange={(e) => setEmployeeName(e.target.value)}
                      required
                    />
                    {errors.employeeName && (
                      <div className="text-red-500 text-sm">
                        {errors.employeeName}
                      </div>
                    )}
                  </div>

                  {/* designation Input Field */}
                  <div className="mb-4 px-2 w-full md:w-1/2">
                    <label
                      htmlFor="designation"
                      className="form-label font-medium block mb-2 dark:text-gray-300"
                    >
                      Designation
                    </label>
                    <input
                      type="text"
                      className="form-control border p-2 w-full rounded border-gray-500 capitalize text-sm outline-0"
                      id="designation"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      required
                    />
                    {errors.designation && (
                      <div className="text-red-500 text-sm">
                        {errors.designation}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap -mx-2">
                  {/* department input field */}
                  <div className="mb-4 px-2 w-full md:w-1/2">
                    <label
                      htmlFor="department"
                      className="form-label font-medium block mb-2 dark:text-gray-300"
                    >
                      Department
                    </label>
                    <select
                      className="form-control border p-2 w-full rounded dark:bg-gray-200 dark:text-gray-700 dark:select-text:text-white border-gray-500 capitalize text-sm outline-0"
                      id="department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select a Department
                      </option>
                      <option value="HR">HR</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="Finance">Finance</option>
                      {/* Add more departments as needed */}
                    </select>

                    {errors.department && (
                      <div className="text-red-500 text-sm">
                        {errors.department}
                      </div>
                    )}
                  </div>
                  {/* email */}
                  <div className="mb-4 px-2 w-full md:w-1/2">
                    <label
                      htmlFor="email"
                      className="form-label font-medium block mb-2 dark:text-gray-300"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control border p-2 w-full rounded border-gray-500 text-sm outline-0"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {errors.email && (
                      <div className="text-red-500 text-sm">{errors.email}</div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap -mx-2">
                  {/* salary input field */}
                  <div className="mb-4 px-2 w-full md:w-1/2">
                    <label
                      htmlFor="salary"
                      className="form-label font-medium block mb-2 dark:text-gray-300"
                    >
                      Salary
                    </label>
                    <input
                      type="number"
                      className="form-control border p-2 w-full rounded border-gray-500 capitalize text-sm outline-0"
                      id="salary"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      required
                    />
                    {errors.salary && (
                      <div className="text-red-500 text-sm">
                        {errors.salary}
                      </div>
                    )}
                  </div>
                  {/* avatar input field */}
                  <div className="mb-4 px-2 w-full md:w-1/2">
                    <label
                      htmlFor="avatar"
                      className="form-label font-medium block mb-2 dark:text-gray-300"
                    >
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      className="form-control border p-2 w-full rounded border-gray-500 capitalize text-sm outline-0"
                      id="avatar"
                      onChange={(e) => setAvatar(e.target.files[0])}
                    />
                    {/* {errors.designation && (
                      <div className="text-red-500 text-sm">
                        {errors.designation}
                      </div>
                    )} */}
                  </div>
                </div>
                <div className="flex flex-wrap -mx-2">
                  {/* gender input field */}
                  <div className="mb-4 px-2 w-full md:w-1/2">
                    <label
                      htmlFor="gender"
                      className="form-label font-medium block mb-2 dark:text-gray-300"
                    >
                      Gender
                    </label>
                    <div className="flex justify-start capitalize">
                      <label>
                        <input
                          type="radio"
                          className="form-control m-2 border  rounded border-gray-500 capitalize text-sm outline-0"
                          name="gender"
                          value="female"
                          checked={gender === "female"}
                          onChange={(e) => setGender(e.target.value)}
                          required
                        />
                        female
                      </label>
                      <label>
                        <input
                          type="radio"
                          className="form-control m-2 border rounded border-gray-500 capitalize text-sm outline-0"
                          name="gender"
                          value="male"
                          checked={gender === "male"}
                          onChange={(e) => setGender(e.target.value)}
                          required
                        />
                        male
                      </label>
                    </div>
                  </div>
                  {/* work type input field */}
                  <div className="mb-4 px-2 w-full md:w-1/2">
                    <label
                      htmlFor="workType"
                      className="form-label font-medium block mb-2 dark:text-gray-300"
                    >
                      Work Type
                    </label>
                    <div className="flex justify-around">
                      <label>
                        <input
                          type="checkbox"
                          value="remote"
                          className="me-2"
                          checked={workType.includes("remote")}
                          onChange={handleWorkTypeChange}
                        />
                        Remote
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          value="on-duty"
                          className="me-2"
                          checked={workType.includes("on-duty")}
                          onChange={handleWorkTypeChange}
                        />
                        On Duty
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          value="in-office"
                          className="me-2"
                          checked={workType.includes("in-office")}
                          onChange={handleWorkTypeChange}
                        />
                        In office
                      </label>
                    </div>
                  </div>
                </div>

                <div className="p-2 text-right">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white py-1.5 px-4 rounded hover:bg-indigo-700 text-sm"
                  >
                    {employeeData ? "Save" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EmployeeForm;
