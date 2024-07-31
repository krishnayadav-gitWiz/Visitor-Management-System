import React, { useState } from "react";
import { ApiConstants } from "../api/ApiConstants";
import custom_axios from "../axios/AxiosSetup";
import { getLoginInfo } from "../utils/LoginInfo";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import NewNavBar from "../components/NewNavbar";

interface UserModel {
  userId: number;
  userName: string;
  shiftTime: string;
  designation: string;
  contactNumberL: number;
  contactNumberM: number;
  address: string;
  userType: string;
  photoImage: string;
}
const entriesPerPage = 5;
const Users = () => {
  const [users, setUsers] = React.useState<UserModel[]>([]);
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const getAllUsers = async () => {
    const role = getLoginInfo()?.userType;
    if (role != null && role == "Admin") {
      const response = await custom_axios.get(ApiConstants.USER.FIND_ALL, {
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
      const searchData = users.filter((item) => {
        const lowerCaseSearch = getSearch.toLowerCase();
        return (
          item.userName.toLowerCase().includes(lowerCaseSearch) ||
          item.userId.toString().includes(getSearch) ||
          item.contactNumberL.toString().includes(getSearch) ||
          item.contactNumberM.toString().includes(getSearch) // Assuming `getSearch` is the phone number input
        );
      });
      setUsers(searchData);
    } else {
      setUsers(filterData);
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
    <div>
      <NewNavBar />
      <div className="flex justify-center border-b-4 border-black">
        <div className="display-center mr-24">
          <h1 className="text-2xl text-black  text-center p-4 mb-2 mt-2 font-mono font-bold ">
            Registered Employees
          </h1>
        </div>
        <div className="display-center ml-96 mt-4">
          <label htmlFor="form-control" className="font-bold text-l mt-2">
            Search User
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
      {/* This is an example component */}
      <div className="max-w-7xl border-blue-300 mt-2 border-2 mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        userName
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        shiftTime
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        designation
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        contactNumberL
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
                        userType
                      </th>

                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        photo Image
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
                          key={user.userId}
                          className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                            {user.userName}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                            {user.shiftTime}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                            {user.designation}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {user.contactNumberL}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                            {user.address}
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                            {user.userType}
                          </td>

                          <td className="py-4 px-6 ">
                            <img
                              src={user.photoImage}
                              alt="Photo"
                              className="w-24 h-24 object-cover"
                            />
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-start whitespace-nowrap">
                            <button
                              hidden={user.userType == "Admin" ? true : false}
                              onClick={async () => {
                                const response = await custom_axios.delete(
                                  ApiConstants.USER.DELETE(user.userId),
                                  {
                                    headers: {
                                      Authorization:
                                        "Bearer " +
                                        localStorage.getItem("token"),
                                    },
                                  }
                                );
                                getAllUsers();
                                console.log(response.data);
                                toast.success("User Deleted Sucessfully!!");
                              }}
                              className="bg-red-400 hover:bg-red-500 rounded-lg px-4 py-2 text-white shadow-sm text-xl "
                            >
                              Delete
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

export default Users;
