import React, { useRef } from "react";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { getLoginInfo } from "../utils/LoginInfo";
import { Dropdown } from "flowbite-react";
import { ApiConstants } from "../api/ApiConstants";
import Photo from "../assets/onkarphoto-dOsJ7YIFSqM-unsplash.jpg";
import custom_axios from "../axios/AxiosSetup";
const NewNavBar = () => {
  let navigate = useNavigate();
  const role = getLoginInfo()?.userType;

  function updateTime() {
    const currentTimeElement = document.getElementById("currentTime");
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const timeString = `${hours}:${minutes}:${seconds}`;
    if (currentTimeElement) {
      currentTimeElement.textContent = timeString;
    }
  }
  // Update the time initially and then every second
  updateTime();
  setInterval(updateTime, 1000);
  const TodayDate = new Date().toDateString();

  const HandleSubmit = async () => {
    const userId = getLoginInfo()?.userId;

    if (userId) {
      try {
        await custom_axios.put(ApiConstants.LOGInOutReports.LOGOUT(userId), {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        });
        localStorage.removeItem("token");
        navigate("/");
      } catch (error) {
        alert("something went wrong , try again");
      }
    }
  };

  return (
    <div>
      <div className="flex bg-blue-100  border-blue-500 justify-center ">
        <div className="w-1/3 flex justify-start p-1 ml-8">
          <img className="w-12 h-6" src={Photo} alt="logo" />
        </div>
        <div className="w-1/3 flex justify-center text-l font-bold">
          {" "}
          <h1>DELHI SECRETARIAT</h1>
        </div>
        <div className="w-1/3 flex justify-end mr-8 p-1 font-bold">
          {" "}
          <img className="w-12 h-6" src={Photo} alt="logo" />
        </div>
      </div>

      <nav className="flex items-center  justify-between flex-wrap  bg-purple-300  lg:px-12 shadow-lg border-solid border-t-2 border-b-2 border-blue-700">
        <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
          <div className="flex items-center flex-shrink-0 text-gray-800 mr-16">
            <img src={Logo} className="h-28 w-32 "></img>
          </div>
        </div>
        <div className="menu  w-full  lg:block flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 ml-2 ml-60">
          <div className="text-md font-bold text-blue-700 lg:flex-grow">
            <div className="lg:inline-block lg:mt-0 rounded-lg border-white text-white bg-blue-700 border-2 py-1 shadow-xl hover:bg-green-700 mr-1">
              <Dropdown label="View" dismissOnClick={false}>
                <Dropdown.Item
                  onClick={() => navigate("/TodayEntries")}
                  className="bg-blue-400 border-b-2 border-black rounded"
                >
                  Today's Entry
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate("/Lastweek")}
                  className="bg-blue-400 border-b-2 border-black rounded"
                >
                  Last Week
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate("/LastMonth")}
                  className="bg-blue-400 border-b-2 border-black rounded"
                >
                  Last Month
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate("/LastSixMonths")}
                  className="bg-blue-400 border-b-2 border-black rounded"
                >
                  Last Six Month's
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate("/Visitors")}
                  className="bg-blue-400 border-b-2 border-black rounded"
                >
                  Visitors
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate("/Appointments")}
                  className="bg-blue-400 border-b-2 border-black rounded"
                >
                  Appointments
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate("/visitorImage")}
                  className="bg-blue-400 border-b-2 border-black rounded"
                >
                  Visitor Image
                </Dropdown.Item>
              </Dropdown>
            </div>
            <div className="lg:inline-block  lg:mt-0 rounded-lg border-white text-white bg-blue-700 border-2 py-1 shadow-xl hover:bg-green-700 mr-1">
              <Dropdown label="Passes" dismissOnClick={false}>
                <Dropdown.Item
                  onClick={() => navigate("/newVisitor")}
                  className="bg-blue-400 border-b-2 border-black rounded"
                >
                  Add New Visitor
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate("/visitorEntry")}
                  className="bg-blue-400 border-b-2 border-black rounded"
                >
                  View & Cancel Pass
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate("/UpdateVisitor")}
                  className="bg-blue-400 border-b-2 border-black rounded"
                >
                  Edit User Info.
                </Dropdown.Item>
              </Dropdown>
            </div>

            <div className="lg:inline-block  lg:mt-0 rounded-lg border-white text-white bg-blue-700 border-2 py-1 shadow-xl hover:bg-green-700 mr-1">
              <Dropdown label="Reports" dismissOnClick={false}>
                <Dropdown.Item
                  onClick={() => navigate("/AppointmentReport")}
                  className="bg-blue-400 border-b-2 border-black rounded"
                >
                  Appointment Reports
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate("/LoginReports")}
                  className="bg-blue-400 border-b-2 border-black rounded"
                >
                  Login Reports
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate("/VisitorReport")}
                  className="bg-blue-400 border-b-2 border-black rounded"
                >
                  Visitor Reports
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate("/VisitDateReport")}
                  className="bg-blue-400 border-b-2 border-black rounded"
                >
                  Visitor Visit Date Reports
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate("/GatesVisited")}
                  className="bg-blue-400 border-b-2 border-black rounded"
                >
                  Gates Visited
                </Dropdown.Item>
              </Dropdown>
            </div>

            <div className="lg:inline-block  lg:mt-0 rounded-lg border-white text-white bg-blue-700 border-2 py-1 shadow-xl hover:bg-green-700 mr-1">
              <Dropdown label="Settings" dismissOnClick={false}>
                <Dropdown.Item
                  onClick={() => navigate("/changePassword")}
                  className="bg-blue-400 border-b-2 border-black rounded"
                >
                  Change Password
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={HandleSubmit}
                  className="bg-blue-400 border-b-2 border-black rounded"
                >
                  Logout
                </Dropdown.Item>
              </Dropdown>
            </div>

            <div
              style={{ display: role != "Admin" ? "none" : "" }}
              className="lg:inline-block  lg:mt-0 rounded-lg border-white text-white bg-blue-700 border-2 py-1 shadow-xl hover:bg-green-700 mr-1"
            >
              <Dropdown label="Users" dismissOnClick={false}>
                <Dropdown.Item
                  onClick={() => navigate("/AddUser")}
                  className="bg-blue-400 border-b-2 border-black rounded"
                >
                  Add User
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => navigate("/users")}
                  className="bg-blue-400 border-b-2 border-black rounded"
                >
                  View Users
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>
        </div>
      </nav>
      {/* SUB NAVBAR */}
      <div className="flex bg-purple-300 border-b-2 border-blue-500 justify-center ">
        <div className="w-1/3 justify-start flex ml-8 text-green-700 text-xl font-bold">
          Logged in:{" "}
          <span className="text-xl ml-2 capitalize text-green-700">
            {" "}
            {getLoginInfo()?.userName}
          </span>
        </div>
        <div className="w-1/3 flex justify-center text-xl font-bold">
          {" "}
          <h1></h1>
        </div>
        <div className="w-1/3 flex justify-end mr-8 font-bold" id="timeDisplay">
          Time: <span className="ml-2 mr-1" id="currentTime"></span> |{" "}
          <span className="ml-1">{TodayDate}</span>
        </div>
      </div>
    </div>
  );
};

export default NewNavBar;
