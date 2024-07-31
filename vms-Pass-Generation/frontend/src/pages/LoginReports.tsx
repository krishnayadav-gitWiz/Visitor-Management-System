import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { ApiConstants } from "../api/ApiConstants";
import custom_axios from "../axios/AxiosSetup";
import jsPDF from "jspdf";
import NewNavBar from "../components/NewNavbar";
import * as XLSX from "xlsx";
import { getLoginInfo } from "../utils/LoginInfo";
import Footer from "../components/Footer";
import html2canvas from "html2canvas";

interface Logs {
  indexId: number;
  LogedInDateTime: string;
  LogedOutDateTime: string;
  userId: number;
}
const entriesPerPage = 20;
const LoginReport = () => {
  const [logs, setLogs] = useState<Logs[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const pdfRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async () => {
    try {
      const response = await custom_axios.get(
        ApiConstants.LOGInOutReports.FINDALL
      );
      setLogs(response.data);
    } catch (error) {
      alert("Data fetching failed");
    }
  };

  useEffect(() => {
    if (logs.length === 0) fetchData();
  }, []);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const filterLogsByDateRange = () => {
    const filteredLogs = logs.filter((record) => {
      const logInDateTime = new Date(record.LogedInDateTime);
      return (
        (!startDate || logInDateTime >= new Date(startDate)) &&
        (!endDate || logInDateTime <= new Date(endDate))
      );
    });
    return filteredLogs;
  };

  const startIndex = currentPage * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;

  const displayedLogs = filterLogsByDateRange().slice(startIndex, endIndex);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

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
        pdf.save("LoginReport.pdf");
      });
    }
  };

  const generateExcel = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(displayedLogs);

    XLSX.utils.book_append_sheet(wb, ws, "LoginReport");
    XLSX.writeFile(wb, "Login Report.xlsx");
  };
  const Mydate = new Date().toLocaleDateString();

  return (
    <>
      <NewNavBar />
      <h1 className="text-2xl text-black text-center p-4 mb-2 mt-2 font-bold border-black border-b-4 border-dashed">
        Login Logout Reports
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
          {" "}
          PDF
        </button>

        <button
          onClick={generateExcel}
          className=" ml-2 px-6 font-bold bg-green-600 hover:bg-blue-500 rounded"
        >
          Excel
        </button>
      </div>
      <div className="">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col">
            <div className="overflow-x-auto shadow-md ">
              <div className="inline-block min-w-full align-middle">
                <div
                  id="LoginLogoutReport"
                  ref={pdfRef}
                  className="overflow-hidden pb-2 mr-4 bg-white"
                >
                  <div className="bg-white p-4">
                    <h1 className="text-center  text-blue-600 rounded text-lg font-bold">
                      GOVERNMENT OF NCT DELHI
                    </h1>
                    <div className="text-center">
                      <p className="text-center inline text-md font-bold text-blue-600">
                        Login / Logout Reports
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
                    <thead className="bg-gray-400 dark:bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="py-3 px-4 text-xs font-bold  ml-2 text-left text-black uppercase dark:text-gray-400"
                        >
                          IndexId
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-4 text-xs font-bold ml-2 text-left text-black uppercase dark:text-gray-400"
                        >
                          userId
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-2 text-xs font-bold ml-2  text-left text-black uppercase dark:text-gray-400"
                        >
                          Loggedin Date / Time
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-2 text-xs font-bold ml-2  text-left text-black uppercase dark:text-gray-400"
                        >
                          LoggedOut Date / Time
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
                            <td className="py-4 indent-8 px-4 bg-white  text-sm font-medium text-black whitespace-nowrap dark:text-white">
                              {record.indexId}
                            </td>
                            <td className="py-2 indent-8 px-4  bg-white text-sm font-medium text-black whitespace-nowrap dark:text-white">
                              {record.userId}
                            </td>
                            <td className="py-2 indent-12 px-4 text-sm   bg-white font-medium text-black whitespace-nowrap dark:text-white">
                              {new Date(record.LogedInDateTime).toLocaleString(
                                undefined,
                                {
                                  timeZone: "Asia/Kolkata",
                                }
                              )}
                            </td>
                            <td className=" ml-4 py-4 indent-12 px-4 text-sm  bg-white font-medium text-black whitespace-nowrap dark:text-white">
                              {new Date(record.LogedOutDateTime).toLocaleString(
                                undefined,
                                {
                                  timeZone: "Asia/Kolkata",
                                }
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div className="text-center pb-8 font-semibold text-blue-500 border-t-2 border-black">
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
    </>
  );
};

export default LoginReport;
