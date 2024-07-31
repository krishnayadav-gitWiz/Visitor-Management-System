import React, { useState } from "react";
import { ApiConstants } from "../api/ApiConstants";
import custom_axios from "../axios/AxiosSetup";

import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import NewNavBar from "../components/NewNavbar";

interface UserModel {
  id: number;
  fName: string;
  lName: string;
  AppointmentId: number;
  mobileNo: number;
  address: string;
  DateofBirth: string;
}

const Appointments = () => {
  let navigate = useNavigate();
  const [users, setUsers] = React.useState<UserModel[]>([]);
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const getAllUsers = async () => {
    const response = await custom_axios.get(ApiConstants.APPOINTMENT.GET_ALL, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    setUsers(response.data);
    setFilterData(response.data);
  };

  React.useEffect(() => {
    if (users.length == 0) getAllUsers();
  }, []);

  const handlesearch = (event) => {
    const getSearch = event.target.value;
    if (getSearch.length > 0) {
      // const searchData= users.filter((item)=>item.vFirstName.toLowerCase().includes(getSearch));
      const searchData = users.filter((item) => {
        const lowerCaseSearch = getSearch.toLowerCase();
        return (
          item.fName.toLowerCase().includes(lowerCaseSearch) ||
          item.AppointmentId.toString().includes(getSearch) ||
          // Assuming `getSearch` is the phone number input
          item.mobileNo.toString().includes(getSearch)
        );
      });
      setUsers(searchData);
    } else {
      setUsers(filterData);
    }
    setQuery(getSearch);
  };

  const entriesPerPage = 10;
  const startIndex = currentPage * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const displayedLogs = users.slice(startIndex, endIndex);
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div>
      <NewNavBar />
      <div className="flex flex-wrap justify-between border-b-4 border-black mb-4">
        <h1 className="text-2xl text-black  ml-64  p-4 font-bold ">
          Appointment List
        </h1>
        <div>
          <label className=" text-xl font-bold mx-2" htmlFor="search">
            Search
          </label>
          <input
            id="search"
            value={query}
            className="border-2 border-blue-300 rounded shadow mr-72 my-2 py-2 px-4 "
            placeholder="Search"
            type="text"
            onChange={(e) => handlesearch(e)}
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-x-auto ">
                <table className="max-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-gray-300 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        FirstName
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        LastName
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Appointment ID
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Mobile NO.
                      </th>

                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Date of Birth
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {displayedLogs.map((user) => {
                      return (
                        <tr
                          key={user.id}
                          className="hover:bg-blue-300 dark:hover:bg-gray-700"
                        >
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                            {user.fName}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white capitalize">
                            {user.lName}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {user.AppointmentId}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {user.mobileNo}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-start whitespace-nowrap">
                            {user.DateofBirth}{" "}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-start whitespace-nowrap">
                            {" "}
                            {user.address}
                          </td>

                          <td className="py-4 px-6 text-sm font-medium text-start whitespace-nowrap">
                            <button
                              onClick={() => navigate("/NewVisitor")}
                              className="bg-red-400 hover:bg-red-500 rounded-lg px-4 py-2 text-white shadow-sm text-xl"
                            >
                              continue
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-8 p-4 border-b-2 border-blue-700 mt-4">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(users.length / entriesPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
        />
      </div>
    </div>
  );
};

export default Appointments;
