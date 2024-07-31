import React, { useRef, useState } from "react";
//import Navbar from '../components/Navbar';
import { getLoginInfo } from "../utils/LoginInfo";
import custom_axios from "../axios/AxiosSetup";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import * as XLSX from "xlsx";
import { ApiConstants } from "../api/ApiConstants";
import jsPDF from "jspdf";
import NewNavBar from "../components/NewNavbar";
import html2canvas from "html2canvas";

interface UserModel {
  Id: number;
  indexId: number;
  vFirstName: string;
  vLastName: string;
  vDateOfBirth: string;
  vMobileNo: number;
  vAddress: string;
  vehicleNo: string;
  visitorType: string;
  vPhoto: string;
  vSignature: string;
  vCommingDate: string;
}
const entriesPerPage = 20;
const Mydate = new Date().toLocaleDateString();
const VisitorReport: React.FC = React.memo(() => {
  const [users, setUsers] = React.useState<UserModel[]>([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const pdfRef = useRef<HTMLDivElement | null>(null);

  const getAllUsers = async () => {
    const role = getLoginInfo()?.userType;
    if (role != null) {
      try {
        const response = await custom_axios.get(
          ApiConstants.VISITORS.FIND_ALL,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("An error occurred while fetching user data.");
      }
    } else {
      toast.info("Forbidden Resource");
    }
  };

  React.useEffect(() => {
    if (users.length == 0) getAllUsers();
  }, []);

  // Handle page change
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const filterLogsByDateRange = () => {
    const filteredLogs = users.filter((record) => {
      const DateTime = new Date(record.vCommingDate);
      return (
        (!startDate || DateTime >= new Date(startDate)) &&
        (!endDate || DateTime <= new Date(endDate))
      );
    });
    return filteredLogs;
  };

  const startIndex = currentPage * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;

  // Slice the logs array to get entries for the current page
  const displayedLogs = filterLogsByDateRange().slice(startIndex, endIndex);

  const generatePDF = () => {
    const input = pdfRef.current;
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "px", "a4", true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 10;
        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );
        pdf.save("VisitorReport.pdf");
      });
    }
  };

  const generateExcel = () => {
    const newData = displayedLogs.map(
      ({ vPhoto, vSignature, ...rest }) => rest
    );
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(newData);

    XLSX.utils.book_append_sheet(wb, ws, "LoginReport");
    XLSX.writeFile(wb, "Login Report.xlsx");
  };

  return (
    <div>
      <NewNavBar />
      <h1 className="text-2xl text-black border-black border-dashed text-center p-4 mb-2 mt-2 font-bold border-b-4">
        VISITOR REPORT
      </h1>

      <div className="flex justify-center my-4">
        <label htmlFor="start-date" className="font-bold text-l mt-2">
          Start Date
        </label>
        <input
          type="date"
          id="start-date"
          name="start-date"
          value={startDate}
          onChange={handleStartDateChange}
          className="form-control w-72 bg-white px-6 py-3 ml-8 mr-8 text-sm leading-tight text-gray-700 border-2 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
        <label htmlFor="end-date" className="font-bold text-l mt-2">
          End Date
        </label>
        <input
          type="date"
          id="end-date"
          name="end-date"
          value={endDate}
          onChange={handleEndDateChange}
          className="form-control w-72 bg-white px-6 py-3 ml-8 mr-8 text-sm leading-tight text-gray-700 border-2 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
        <button
          onClick={generatePDF}
          className="px-6 font-bold  py-2 bg-red-700 hover:bg-blue-500 rounded"
        >
          Export PDF
        </button>

        <button
          onClick={generateExcel}
          className=" ml-2 px-6 font-bold bg-green-600 hover:bg-blue-500 rounded"
        >
          Excel
        </button>
      </div>
      <div className="">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col" id="report" ref={pdfRef}>
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden mr-4 ">
                  <div className="bg-white p-4">
                    <h1 className="text-center  text-blue-600 rounded text-lg font-bold">
                      GOVERNMENT OF NCT DELHI
                    </h1>
                    <div className="text-center">
                      <p className="text-center inline text-md font-bold text-blue-600">
                        Visitor Reports
                      </p>
                      <p className="inline text-md font-bold text-blue-600 ml-8">
                        Generated on: <span>{Mydate}</span>
                      </p>
                    </div>

                    <p className="text-center">
                      <span className="ml-6 font-bold text-blue-600">
                        Report From: {startDate}{" "}
                      </span>
                      <span className="ml-6 font-bold text-blue-600">
                        Report To: {endDate}
                      </span>
                      <span className="ml-6 font-bold text-blue-600">
                        Report Generated By: {getLoginInfo()?.userName}
                      </span>
                    </p>
                  </div>

                  <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                    <thead className="bg-gray-300 dark:bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          Index Id
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                        >
                          visitor Name
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
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {displayedLogs.map((user) => {
                        return (
                          <tr
                            key={user.Id}
                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                              {user.indexId}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white capitalize">
                              {user.vFirstName} {user.vLastName}
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
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div className="text-center bg-white pb-12 font-semibold text-blue-500 border-t-2 border-black">
                    <p>
                      ©2023 ESSI , Fax: +91 - 11 - 41519898,
                      Email:support@elkostaindia.com
                    </p>
                    <p>
                      {" "}
                      www.elkostaindia.com , 101- Mercantile House, K.G Marg ,
                      New Delhi-110001 , Ph: +91 - 11 - 41519899
                    </p>
                  </div>
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
          pageCount={Math.ceil(filterLogsByDateRange().length / entriesPerPage)}
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
          initialPage={currentPage}
        />
      </div>
    </div>
  );
});
export default VisitorReport;
