import React, { useState } from "react";
import { confirmDelete, showToast } from "../service/notify";
import { deleteEmployee } from "../service/employeeService";
import { firstValueFrom } from "rxjs";
import "../App.css";
const EmployeeTable = ({ employees, onSort, refreshData, onEdit }) => {
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);

  const handleSort = (field, order) => {
    setSortField(field);
    setSortOrder(order);
    onSort(field, order);
  };

  const handleDeleteClick = async (employeeId) => {
    try {
      const confirmed = await firstValueFrom(confirmDelete());

      if (confirmed) {
        await deleteEmployee(employeeId);
        showToast("Deleted successfully!", "success");
        refreshData();
      }
    } catch (error) {
      showToast("Something went wrong!", "error");
    }
  };

  return (
    <>
      {/* <table className="table-auto border-collapse  w-full bg-white dark:bg-gray-800 dark:text-gray-50">
        <thead className="table-header-group border-1">
          <tr className="table-row">
            <th scope="col  " className=" ">
              <span className="flex items-center">
                <span className="text-lg font-medium">Employee Name</span>
                <span className="flex flex-col ">
                  <i
                    className="fa-solid fa-caret-up m-0 p-0 font-medium"
                    onClick={() => handleSort("employee_name", "asc")}
                  ></i>
                  <i
                    className="fa-solid fa-caret-down m-0 p-0"
                    onClick={() => handleSort("employee_name", "desc")}
                  ></i>
                </span>
              </span>
            </th>
            <th scope="col" className="text-start font-medium text-lg">
              Designation
            </th>
            <th scope="col" className="text-start font-medium text-lg">
              Department
            </th>
            <th scope="col" className="text-start font-medium text-lg">
              Email
            </th>
            <th scope="col" className="text-start font-medium text-lg">
              {" "}
              <span className="flex items-center">
                <span className="me-2 font-medium">Salary</span>
                <span className="flex flex-col font-medium">
                  <i
                    className="fa-solid fa-caret-up m-0 p-0"
                    onClick={() => handleSort("salary", "asc")}
                  ></i>
                  <i
                    className="fa-solid fa-caret-down m-0 p-0"
                    onClick={() => handleSort("salary", "desc")}
                  ></i>
                </span>
              </span>
            </th>
            <th scope="col font-medium text-lg">Handle</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee._id} className="table-row">
              <td className="table-cell text-center">{index + 1}</td>
              <td className="table-cell text-start">
                {employee.employee_name}
              </td>
              <td className="table-cell text-start">{employee.designation}</td>
              <td className="table-cell text-start">{employee.department}</td>
              <td
                style={{ textTransform: "lowercase" }}
                className="table-cell text-start"
              >
                {employee.email}
              </td>
              <td className="table-cell text-start">
                &#8377;
                {employee.salary}
              </td>
              <td className="text-start">
                <button
                  className="update-btn me-2 mb-1"
                  onClick={() => onEdit(employee)}
                >
                  <i className="fa-solid fa-pen"></i>
                </button>
                <button
                  className="delete-btn me-2"
                  onClick={() => handleDeleteClick(employee._id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <div class="relative overflow-x-auto shadow-md  ">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3 flex items-center">
                Employee Name
                <span className="ms-2 flex flex-col ">
                  <i
                    className="fa-solid fa-caret-up m-0 p-0 font-medium"
                    onClick={() => handleSort("employee_name", "asc")}
                  ></i>
                  <i
                    className="fa-solid fa-caret-down m-0 p-0"
                    onClick={() => handleSort("employee_name", "desc")}
                  ></i>
                </span>
              </th>
              <th scope="col" class="px-6 py-3">
                Designation
              </th>
              <th scope="col" class="px-6 py-3">
                Department
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3 flex items-center">
                Salary
                <span className="ms-2 flex flex-col ">
                  <i
                    className="fa-solid fa-caret-up m-0 p-0 font-medium"
                    onClick={() => handleSort("salary", "asc")}
                  ></i>
                  <i
                    className="fa-solid fa-caret-down m-0 p-0"
                    onClick={() => handleSort("salary", "desc")}
                  ></i>
                </span>
              </th>
              <th scope="col" class="px-6 py-3">
                Handle
              </th>
              {/* <th scope="col" class="px-6 py-3">
                <span class="sr-only">Edit</span>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr
                key={employee._id}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  class="capitalize px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {employee.employee_name}
                </th>
                <td class="capitalize px-6 py-4">{employee.designation}</td>
                <td class="capitalize px-6 py-4">{employee.department}</td>
                <td class="px-6 py-4">{employee.email}</td>
                <td class="px-6 py-4">&#8377; {employee.salary}</td>
                <td class="px-6 py-4 flex justify-around">
                  <button
                    className="me-2 mb-1"
                    onClick={() => onEdit(employee)}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button
                    className="me-2"
                    onClick={() => handleDeleteClick(employee._id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default EmployeeTable;
