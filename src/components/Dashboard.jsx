import React, { useEffect, useState } from "react";
import Header from "./Header";
import EmployeeForm from "./EmployeeForm";
import ReactPaginate from "react-paginate";
import { getEmployees } from "../service/employeeService";
import { useNavigate } from "react-router-dom";
import EmployeeTable from "./EmployeeTable";
const Dashboard = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [sortField, setSortField] = useState("employee_name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleLogout = () => {
    navigate("/login");
  };

  const getData = async (searchQuery = "", page = 1, limit = 10) => {
    try {
      const params = {};
      if (searchQuery.trim()) params.search = searchQuery;
      if (sortField) params.sortBy = sortField;
      if (sortOrder) params.order = sortOrder;
      params.page = page;
      params.limit = limit;
      const response = await getEmployees(params);
      setEmployees(response.employees);
      setTotalPages(response.totalPages);
      setCurrentPage(response.page);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    }
  };
  useEffect(() => {
    console.log("in dashboard use effect called!");
    getData(search, currentPage, limit);
  }, [sortField, sortOrder, search, currentPage, limit]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    console.log("name search:", value);
  };

  const handleSort = (field, order) => {
    setSortField(field);
    setSortOrder(order);
  };
  const handleLimitChange = (e) => {
    const value = e.target.value;
    setLimit(Number(value));
  };
  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setShowModal(true);
  };
  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };
  const refreshData = () => {
    getData(search, currentPage, limit);
  };

  return (
    <div className="w-full h-100">
      <Header />
      <div className="bg-white dark:bg-gray-800 dark:text-gray-100 flex justify-center items-center px-3 py-2">
        <div className="flex grow ">
          <input
            type="text"
            name="search"
            value={search}
            className="grow text-sm bg-gray-100 text-gray-800 py-2 px-2 rounded-lg mx-1 border-0  outline-0"
            onChange={handleSearchChange}
            placeholder="Search for an employee or department..."
          />
        </div>
        <div className="">
          <button
            onClick={handleAddEmployee}
            className="bg-indigo-700 text-white px-3 py-2 rounded-md font-medium text-sm"
          >
            Add employee
          </button>
        </div>
        
      </div>

      {employees.length > 0 ? (
        <div className="bg-primary">
          <EmployeeTable
            employees={employees}
            onSort={handleSort}
            refreshData={refreshData}
            onEdit={handleEditEmployee}
          />

          <div className="pagination flex justify-center py-4 bg-gray-50 dark:bg-gray-800">
            <div className="dropdown bg-custom me-4 ms-3">
              <label className="me-2 dark:text-white text-gray-800 font-normal text-sm  ">
                Data per page
              </label>
              <select
                onChange={handleLimitChange}
                value={limit}
                className="text-white bg-gray-500 p-2 rounded-md text-sm"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
            </div>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={totalPages}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              containerClassName={"pagination-container cursor-pointer"}
              activeClassName={"active-page"}
            />
          </div>
        </div>
      ) : (
        <div className="no-content">
          <p className="text-gray-800 dark:text-white text-center text-xl mt-3">No Employees Found.</p>
        </div>
      )}
      <div className="">
        <EmployeeForm
          showModal={showModal}
          setShowModal={setShowModal}
          employeeData={selectedEmployee}
          refreshData={refreshData}
        />
      </div>
    </div>
  );
};

export default Dashboard;
