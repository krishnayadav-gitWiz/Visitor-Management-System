//import React, { useRef } from "react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Photo from "../assets/onkarphoto-dOsJ7YIFSqM-unsplash.jpg";
import { getLoginInfo } from "../utils/LoginInfo";
import custom_axios from "../axios/AxiosSetup";
import { ApiConstants } from "../api/ApiConstants";

const NavBar = () => {
  let navigate = useNavigate();

  function updateTime() {
    const currentTimeElement = document.getElementById('currentTime');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    if (currentTimeElement) {
      currentTimeElement.textContent = timeString;
    }
  }

  const HandleSubmit=async()=>{
    const userId = getLoginInfo()?.userId;
    if(userId){
      try{
        await custom_axios.put(ApiConstants.LOGInOutReports.LOGOUT(userId),{
            headers: { Authorization: "Bearer " + localStorage.getItem("token") } 
        });
        localStorage.removeItem("token");
        navigate("/")
    }catch(error){
        alert("something went wrong , try again")
    }
    }
  }
  // Update the time initially and then every second
  updateTime();
  setInterval(updateTime, 1000);
  const TodayDate = new Date().toDateString();
  

  return (
    <div>
  <div className="flex justify-center bg-blue-200">
 <div className="w-1/3 ml-16"> <img className="p-1 ml-4 h-8 w-8"  src={Photo} alt="flag" /> </div>
 <div className="w-1/3  text-center text-blue-700 font-bold mt-1"> <h2>Delhi Secretariat</h2> </div>
 <div className="w-1/3  justify-end mr-16 flex"> <img className="  p-1 h-8 w-8" src={Photo} alt="flag" /> </div>

  </div>
 
    <nav className="flex items-center  justify-between flex-wrap bg-gray-600  lg:px-12 shadow border-solid border-t-2 border-blue-700">
      <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
        <div className="flex items-center flex-shrink-0 text-gray-800 mr-16">
          <span className="font-semibold text-xl text-white tracking-tight flex justify-center items-center gap-2">
            <img src={Logo} className="h-28 w-32 "></img>
          </span>
        </div>
      </div>
      <div className="menu w-full lg:block flex-grow lg:flex ml-32 lg:items-center lg:w-auto lg:px-3 px-8">
        <div className="text-md font-bold text-blue-700 lg:flex-grow">
          {/* <a onClick={() => navigate("/active")} className="block mt-4 text-white lg:inline-block lg:mt-0 hover:text-white cursor-pointer px-4 py-2 rounded hover:bg-blue-700 mr-2">
            Create Appointment
          </a> */}
          <a onClick={() => navigate("/changePassword")} className=" cursor-pointer border-2 border-white block mt-4 text-white lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2">
            Change Password
          </a>
          <a
            onClick={() => navigate("/appointmentform")}
            
            className="block cursor-pointer mt-4 border-2 border-white text-white lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
          >
            Create Appointment
          </a>
          
          <a
            onClick={() => navigate("/visitorsPage")}
            
            className="block cursor-pointer mt-4 border-2 border-white text-white lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
          >
            Visitors
          </a>
         

          <a
            onClick={HandleSubmit}
            className="  block cursor-pointer border-2 border-white mt-4 text-white lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
          >
            Log out
          </a>
          
        </div>
        {/* This is an example component */}
        <div className="flex ">
        
        </div>
      </div>
    </nav> 

    <div className="bg-blue-200 border-b-2 border-blue-600 flex justify-between">
     <div className="w-1/2 ml-16 font-bold text-green-600" > Logged In: <span>{getLoginInfo()?.userName}</span></div>
     <div className="w-1/3 flex justify-end mr-8  font-bold" id="timeDisplay">Time: <span className="ml-2 mr-1" id="currentTime"></span> | <span className="ml-1">{TodayDate}</span></div>

    </div>

    </div>
  );
};

export default NavBar;