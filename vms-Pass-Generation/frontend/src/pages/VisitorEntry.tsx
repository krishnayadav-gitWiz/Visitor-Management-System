import React, { useState } from "react";
import { Link } from "react-router-dom";
import custom_axios from "../axios/AxiosSetup";
import { ApiConstants } from "../api/ApiConstants";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { getLoginInfo } from "../utils/LoginInfo";
import NewNavBar from "../components/NewNavbar";
import { toast } from "react-toastify";
interface VisitorModel {
  indexId: number;
  toMeet: string;
  Department: string;
  validFor: string;
  AuthobyWhome: string;
  Access: boolean;
  visitor: {
    vFirstName: string;
    vLastName: string;
    vPhoto: string;
  };
}
const entriesPerPage = 5;
const VisitorEntry: React.FC = React.memo(() => {
  const [visitors, setVisitors] = React.useState<VisitorModel[]>([]);
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [cancellationStatus, setCancellationStatus] = useState<{
    [indexId: number]: boolean;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await custom_axios.get(
          ApiConstants.VISITORS_VISIT_DATE.FINDALL
        );
        setVisitors(response.data);
        setFilterData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlesearch = (event) => {
    const getSearch = event.target.value;
    if (getSearch.length > 0) {
      // const searchData= users.filter((item)=>item.vFirstName.toLowerCase().includes(getSearch));
      const searchData = visitors.filter((item) => {
        const lowerCaseSearch = getSearch.toLowerCase();
        return (
          item.visitor.vFirstName.toLowerCase().includes(lowerCaseSearch) ||
          item.indexId.toString().includes(getSearch) ||
          item.visitor.vLastName.toLowerCase().includes(lowerCaseSearch) // Assuming `getSearch` is the phone number input
        );
      });
      setVisitors(searchData);
    } else {
      setVisitors(filterData);
    }
    setQuery(getSearch);
  };

  const startIndex = currentPage * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const displayedLogs = visitors.slice(startIndex, endIndex);
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleCancelClick = async (record: VisitorModel) => {
    try {
      const UserId: number | undefined = getLoginInfo()?.userId;
      const response = await custom_axios.patch(
        ApiConstants.VISITORS_VISIT_DATE.Update(record.indexId, UserId)
      );

      if (response.status === 200) {
        // Update the cancellation status for the specific entry in the state
        setCancellationStatus((prevStatus) => ({
          ...prevStatus,
          [record.indexId]: true, // Set it to true to indicate "Cancelled"
        }));

        // Update the Access property for the corresponding entry in the visitors array
        const updatedVisitors = visitors.map((visitor) => {
          if (visitor.indexId === record.indexId) {
            return {
              ...visitor,
              Access: false, // Set it to false to indicate "Cancelled"
            };
          }
          return visitor;
        });

        // Update the state with the modified visitors array
        setVisitors(updatedVisitors);
        toast.info("Pass Cancelled successfully");
      } else {
        toast.info("Pass Cancellation failed");
      }
    } catch (error) {
      console.error("Error cancelling pass:", error);
      toast.warn("An error occured while cancelling the pass");
    }
  };

  return (
    <div>
      <NewNavBar />
      <div className="flex justify-center ">
        <div className="display-center mr-20">
          <h1 className="text-2xl text-black  text-center p-4  mt-2 font-mono font-bold ">
            Entries
          </h1>
        </div>
        <div className="display-center ml-96 mt-4">
          <label htmlFor="form-control" className="font-bold text-l mt-2">
            Search Visitor
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

      <div className="">
        <div className="max-w-7xl mt-4 mx-auto">
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
                          To Meet
                        </th>

                        {/* <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Department
                      </th> */}
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Validity
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Authorized by
                        </th>

                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Visitor Image
                        </th>

                        {/* <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Generate Pass
                      </th> */}
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {displayedLogs.map((record) => {
                        return (
                          <tr
                            key={record.indexId}
                            className={`hover:bg-gray-100 dark:hover:bg-gray-700 ${
                              cancellationStatus[record.indexId]
                                ? "bg-red-200"
                                : ""
                            }`}
                          >
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                              {record.visitor.vFirstName}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white capitalize">
                              {record.visitor.vLastName}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                              {record.toMeet}
                            </td>
                            {/* <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">{record.Department}</td> */}
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                              {record.validFor}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {record.AuthobyWhome}
                            </td>
                            <td className="py-4 px-6 ">
                              <img
                                src={record.visitor.vPhoto}
                                alt="Photo"
                                className="w-24 h-24 object-cover"
                              />
                            </td>

                            {/* <td className="py-4 px-6 text-sm font-medium text-start whitespace-nowrap">
                          <Link to={`/Pass/${record.indexId}`} className="bg-red-400 hover:bg-red-500 rounded-lg px-4 py-2 text-white shadow-sm text-xl">
                          Pass
                        </Link>
                          </td>
                           
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {record.Access ? (
                          <button
                            onClick={() => handleCancelClick(record)}
                            className="bg-red-400 hover:bg-red-500 rounded-lg px-4 py-2 text-white shadow-sm text-xl"
                          >
                            Cancel
                          </button>
                        ) : (
                          "Cancelled"
                        )}
                      </td> */}

                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {record.Access ? (
                                <>
                                  <button
                                    onClick={() => handleCancelClick(record)}
                                    className="bg-red-400 hover:bg-red-500 rounded-lg px-4 py-2 mr-4 text-white shadow-sm text-xl"
                                  >
                                    Cancel
                                  </button>
                                  <Link
                                    to={`/Pass/${record.indexId}`}
                                    className="bg-red-400 hover:bg-red-500 rounded-lg px-4 py-2 text-white shadow-sm text-xl"
                                  >
                                    Pass
                                  </Link>
                                </>
                              ) : (
                                "Cancelled"
                              )}
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
          pageCount={Math.ceil(visitors.length / entriesPerPage)}
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
});
export default VisitorEntry;
