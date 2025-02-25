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
      <div className="relative overflow-x-auto shadow-md  ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Profile
              </th>
              <th scope="col" className="px-6 py-3 flex items-center">
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
              <th scope="col" className="px-6 py-3">
                Designation
              </th>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3 flex items-center">
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
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                Work Type
              </th>
              <th scope="col" className="px-6 py-3">
                Handle
              </th>
              {/* <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr
                key={employee._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="capitalize px-6 py-4 profile">
                  <img src={employee?.avatar}></img>
                </td>
                <th
                  scope="row"
                  className="capitalize px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {employee.employee_name}
                </th>
                <td className="capitalize px-6 py-4">{employee.designation}</td>
                <td className="capitalize px-6 py-4">{employee.department}</td>
                <td className="px-6 py-4">{employee.email}</td>
                <td className="px-6 py-4">&#8377; {employee.salary}</td>
                <td className=" capitalize px-6 py-4">{employee?.gender}</td>
                <td className="capitalize px-6 py-4">
                  {(employee?.workType).join(", ")}
                </td>
                <td className="px-6 py-4 ">
                  <button className="me-3" onClick={() => onEdit(employee)}>
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
