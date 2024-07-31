import React, { useState, useMemo } from "react";
import { getLoginInfo } from "../utils/LoginInfo";
import custom_axios from "../axios/AxiosSetup";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ApiConstants } from "../api/ApiConstants";
import ReactPaginate from "react-paginate";
import NewNavBar from "../components/NewNavbar";

interface UserModel {
  Id: number;
  vFirstName: string;
  vLastName: string;
  vDateOfBirth: string;
  vMobileNo: number;
  vAddress: string;
  vehicleNo: string;
  vPhoto: string;
}
const entriesPerPage = 10;
const Visitors: React.FC = () => {
  const [users, setUsers] = React.useState<UserModel[]>([]);
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const memoizedFilterData = useMemo(() => filterData, [filterData]);
  const memoizedUsers = useMemo(() => users, [users]);
  const getAllUsers = async () => {
    const role = getLoginInfo()?.userType;
    if (role != null) {
      const response = await custom_axios.get(ApiConstants.VISITORS.FIND_ALL, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      setUsers(response.data);
      setFilterData(response.data);
    } else {
      toast.info("Forbidden Resource");
    }
  };

  React.useEffect(() => {
    if (users.length == 0) getAllUsers();
  }, []);

  const handlesearch = (event) => {
    const getSearch = event.target.value;
    if (getSearch.length > 0) {
      // const searchData= users.filter((item)=>item.vFirstName.toLowerCase().includes(getSearch));
      const searchData = memoizedUsers.filter((item) => {
        const lowerCaseSearch = getSearch.toLowerCase();
        return (
          item.vFirstName.toLowerCase().includes(lowerCaseSearch) ||
          item.vMobileNo.toString().includes(getSearch) // Assuming `getSearch` is the phone number input
        );
      });
      setUsers(searchData);
    } else {
      setUsers(memoizedFilterData);
    }
    setQuery(getSearch);
  };

  const startIndex = currentPage * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const displayedLogs = users.slice(startIndex, endIndex);
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className=" border-r-8 border-l-8 border-blue-700">
      <NewNavBar />
      <div className="flex justify-center ">
        <div className="display-center mr-24">
          <h1 className="text-2xl text-black  text-center p-2  mt-4 font-mono font-bold ">
            VISITORS
          </h1>
        </div>
        <div className="justify-end ml-96 mt-4">
          <label htmlFor="form-control" className="font-bold text-l mt-2">
            Search:{" "}
          </label>
          <input
            type="text"
            name="name"
            value={query}
            className="form-control w-72 bg-white px-6 py-3 ml-8 mr-8 text-sm leading-tight text-gray-700 border-2 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            onChange={(e) => handlesearch(e)}
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="max-w-6xl border-blue-300   mx-auto">
          <div className="flex flex-col">
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden mr-4 ">
                  <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                    <thead className="bg-gray-300 dark:bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          First Name
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Last Name
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Date Of Birth
                        </th>

                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          address
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Vehicle No.
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Mobile No.
                        </th>

                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Visitor Image
                        </th>

                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Generate Pass
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {displayedLogs.map((user) => {
                        return (
                          <tr
                            key={user.Id}
                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                              {user.vFirstName}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white capitalize">
                              {user.vLastName}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {user.vDateOfBirth}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                              {user.vAddress}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                              {user.vehicleNo}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {user.vMobileNo}
                            </td>
                            <td className="py-4 px-6 ">
                              <img
                                src={user.vPhoto}
                                alt="Photo"
                                className="w-24 h-24 object-cover"
                              />
                            </td>

                            <td className="py-4 px-6 text-sm font-medium text-start whitespace-nowrap">
                              <Link
                                to={`/VisitingInfo/${user.Id}`}
                                className="bg-red-400 hover:bg-red-500 rounded-lg px-4 py-2 text-white shadow-sm text-xl"
                              >
                                Pass
                              </Link>
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
export default Visitors;
