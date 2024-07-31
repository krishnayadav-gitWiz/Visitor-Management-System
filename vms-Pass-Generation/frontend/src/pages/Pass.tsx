import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import custom_axios from "../axios/AxiosSetup";
import { ApiConstants } from "../api/ApiConstants";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Logo from "../assets/secretariat.avif";
import essilogo from "../assets/Logo.png";
import React from "react";
import Barcode from "react-barcode";
import NewNavBar from "../components/NewNavbar";
import { getLoginInfo } from "../utils/LoginInfo";
import Footer from "../components/Footer";
import QRCode from "react-qr-code";
const Pass = () => {
  const { indexId } = useParams();
  const [userData, setUserData] = useState({
    indexId: null,
    PassNumber: "",
    purpose: "",
    toMeet: "",
    AuthobyWhome: "",
    Barcode: "",
    vDate: "",
    Department: "",
    validFor: "",
    visitor: {
      vFirstName: "",
      vLastName: "",
      vPhoto: "",
      vSignature: "",
      vAddress: "",
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await custom_axios.get(
          ApiConstants.VISITORS_VISIT_DATE.FINDONE(indexId)
          
        );
        console.log(response);
        setUserData(response.data[0]);
      } catch (error) {
        console.log("error fetching data ", error);
      }
    };
    fetchUserData();
  }, [indexId]);

  const handlePrintPDF = async () => {
    const pdf = new jsPDF("l", "px", "a4");

    const pdfContainer = document.getElementById("pdf-container");

    if (pdfContainer) {
      const canvas = await html2canvas(pdfContainer);
      const imageData = canvas.toDataURL("image/jpeg");
      pdf.text("", 10, 10);
      pdf.addImage(imageData, "JPEG", 10, 20, 190, 0);
      pdf.save(`${userData.visitor.vFirstName}-EntryPass.pdf`);
    }
  };

  return (
    <div>
      <NewNavBar />
      {userData && (
        <div
          id="pdf-container"
          className="max-w-4xl   border-t-8 border-black max-h-xl mt-10 justify-center mx-auto bg-gray-300 pt-0 pl-2 pb-2 pr-2 mb-10 shadow-md"
        >
          <div className="flex ">
            <span className="flex inline-block">
              <img className="h-16 mt-2 pb-1 w-16 " src={Logo} alt="" />
            </span>
            <span>
              <h1 className="text-2xl flex ml-60 mt-3 inline-block font-bold  text-center">
                DELHI SECRETARIAT
              </h1>
            </span>
            <span className="flex inline-block">
              {" "}
              <img
                className="h-20 ml-60 pb-1 w-24 "
                src={essilogo}
                alt="essi"
              />
            </span>
          </div>
          <hr className="border-4 border-dashed border-black " />
          <h2 className=" text-center font-bold text-xl">
            Government of NCT Delhi
          </h2>

          <div className=" mb-10 flex">
            <div className="w-1/3 flex border-black border-2 rounded justify-between mt-5 p-2 bg-green-100 items-center mr-2 mb-">
              <div className="">
                <img
                  alt="Photo"
                  src={userData.visitor.vPhoto}
                  className="mr-3 rounded ml-5 mt-4 h-32 w-36"
                />
                <h2 className="ml-5 text-base font-bold mt- capitalize">
                  {userData.visitor.vFirstName} {userData.visitor.vLastName}
                </h2>
                <p className="text-sm ml-4 mt-4">
                  Entry Valid for one person only.
                </p>
                <p className="text-sm ml-4 mb">
                  This slip should be returned at the gate duly signed by the
                  official visited, at the time of exit from the building.
                </p>
              </div>
            </div>
            <div className="w-1/3  max-w-xl mt-5 mr-4 ml-1 mb-0 bg-green-100 border-black border-2 rounded  pt-2 pl-2 pr-2">
              <p className="text-sm  font-bold">
                PASS NO: <span>{userData.PassNumber}</span>
              </p>
              <div className="flex justify-between">
                <p className="text-sm mt-2  font-bold">PURPOSE: </p>
                <span className="ml-2 font-semiBold ml-1 mt-1 mr-36">
                  {userData.purpose}{" "}
                </span>
                {/* {userData.purpose} */}
              </div>
              <div className="flex ">
                <p className="text-sm mt-2 font-bold">DEPARTMENT: </p>
                <span className=" ml-2 font-semiBold mt-1 flex justify-start ">
                  {userData.Department}
                </span>
              </div>

              <div className="flex ">
                <p className="text-sm mt-2 font-bold">ADDRESS: </p>
                <span className=" ml-2 font-semiBold justify-start flex mt-1">
                  {userData.visitor.vAddress}
                </span>
              </div>

              <div className="flex ">
                <p className="text-sm mt-2 mb-8 font-bold">VALID FOR: </p>
                <span className=" ml-2 font-semiBold mt-1 capitalize flex justify-start">
                  {" "}
                  {userData.validFor}
                </span>
              </div>
              <QRCode
    size={256}
    style={{ height: "30%", maxWidth: "100%", width: "100%" }}
    value={userData.Barcode+userData.visitor.Id}
    viewBox={`0 0 256 256`}
    />
              {/*<Barcode
                width={1.3}
                format="codabar"
                marginRight={2}
                marginLeft={2}
                height={60}
                value={userData.Barcode}
      />*/}
            </div>
            <div className="w-1/3 mt-1 bg-green-100 border-black border-2 rounded mt-5  p-2">
              <span>
                {" "}
                <p className="text-sm  font-semibold">
                  Pass Generated By: {getLoginInfo()?.userName} (
                  {getLoginInfo()?.userId})
                </p>
              </span>
              {/* <p className="p-1 ml-2">{userData.vDate}</p> */}
              <p className="p-1 ml-2">{userData.vDate}</p>

              <p className="text-sm mt-2 font-bold">To Meet: </p>

              <div className="flex  mt-4">
                <p className="text-sm  ml-2 font-semibold">Name:</p>
                <span className="font-semiBold ml-2 mb-1  flex justify-start">
                  {userData.toMeet}
                </span>
              </div>

              <p className="text-sm mt-2 mb-4 ml-2 font-semibold">Signature:</p>

              <label htmlFor="img">Visitor Signature</label>
              <img
                src={userData.visitor.vSignature}
                alt="User Signature"
                className="w-56 h-20 mt-2 rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center ">
        <button
          id="handlePrintPDF"
          className="bg-blue-500 hover:bg-red-500 font-bold text-white px-6 py-4 rounded"
          onClick={handlePrintPDF}
        >
          Print
        </button>
      </div>
      <Footer />
    </div>
  );
};
export default Pass;
