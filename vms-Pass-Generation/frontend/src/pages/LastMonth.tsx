import React, { useState } from "react";
import { Link } from "react-router-dom";
import custom_axios from "../axios/AxiosSetup";
import { ApiConstants } from "../api/ApiConstants";
import { useEffect } from "react";
import { format, subMonths } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import ReactPaginate from "react-paginate";
import NewNavBar from "../components/NewNavbar";

interface VisitorModel {
  indexId: number;
  toMeet: string;
  Department: string;
  validFor: string;
  AuthobyWhome: string;
  vDate: string;
  visitor: {
    vFirstName: string;
    vLastName: string;
    vPhoto: string;
  };
}
const today = new Date(); // Current local date
const lastMonthStart = subMonths(today, 1); // Subtract one month from today
const lastMonthEnd = today; // Today's date is the end of last month
const entriesPerPage = 5;
// Convert the local dates to UTC
const lastMonthStartUtc = utcToZonedTime(lastMonthStart, "UTC");
const lastMonthEndUtc = utcToZonedTime(lastMonthEnd, "UTC");
const LastMonth: React.FC = () => {
  const [visitors, setVisitors] = React.useState<VisitorModel[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await custom_axios.get(
          ApiConstants.VISITORS_VISIT_DATE.FINDALL
        );

        setVisitors(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // const today = new Date(); // Current local date
  // const lastMonthStart = subMonths(today, 1); // Subtract one month from today
  // const lastMonthEnd = today; // Today's date is the end of last month

  // // Convert the local dates to UTC
  // const lastMonthStartUtc = utcToZonedTime(lastMonthStart, "UTC");
  // const lastMonthEndUtc = utcToZonedTime(lastMonthEnd, "UTC");

  // Filter the data to show only entries from last month based on the UTC vDate field
  const lastMonthEntries = visitors.filter((record) => {
    const recordUtc = utcToZonedTime(new Date(record.vDate), "UTC");
    return recordUtc >= lastMonthStartUtc && recordUtc <= lastMonthEndUtc;
  });

  const startIndex = currentPage * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const displayedLogs = visitors.slice(startIndex, endIndex);
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div>
      <NewNavBar />
      <h1 className="text-2xl text-black  text-center p-4 mb-2 mt-2 font-bold bg-blue-300">
        {" "}
        Last Month Entries
      </h1>
      <div className="">
        <div className="max-w-6xl mx-auto">
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

                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Department
                        </th>
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
                          Visit Date
                        </th>

                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Visitor Image
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {displayedLogs.map((record) => {
                        return (
                          <tr
                            key={record.indexId}
                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
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
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                              {record.Department}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {record.validFor}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {record.AuthobyWhome}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {new Date(record.vDate).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-6 ">
                              <img
                                src={record.visitor.vPhoto}
                                alt="Photo"
                                className="w-24 h-24 object-cover"
                              />
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
          pageCount={Math.ceil(lastMonthEntries.length / entriesPerPage)}
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
export default LastMonth;