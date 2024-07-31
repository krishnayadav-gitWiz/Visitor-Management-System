import React from "react";
import { useNavigate } from "react-router-dom";
import { ApiConstants } from "../api/ApiConstants";
//import LOGO from "../assets/LOGO.png";
import custom_axios from "../axios/AxiosSetup";
import { toast } from "react-toastify";

const Login = () => {
  let navigate = useNavigate();
  let userName: any = React.useRef();
  let password: any = React.useRef();

  const loginApp = async () => {
    if (userName.current.value == "" || password.current.value == "") {
      toast.info("Please fill the information");
      return;
    }
    try {
      const response = await custom_axios.post(ApiConstants.LOGIN, {
        userName: userName.current.value,
        password: password.current.value,
      });
      localStorage.setItem("token", response.data.token);
      dispatchEvent(new Event("storage"));
      navigate("/appointmentForm");
    } catch (error: any) {
      if (error.response.status == 401) toast.warn(error.response.data.message);
    }

    // navigate("/");
  };

  return (
    <div className="flex items-center justify-center mt-8">
      <div className="w-full  max-w-lg">
        <div className="flex  justify-center items-center mb-6">
          <div className=" flex   items-center flex-shrink-0 text-blue mr-16">
            <span className="font-bold  p-3 text-3xl text-blue-600  flex justify-center items-center gap-2">
              {/* <img src={LOGO} className="h-15 w-20 "></img>   */}
            </span>
          </div>
        </div>
        <div className="bg-blue-300 shadow-lg rounded px-12 pt-6 pb-8 mb-4">
          {/* @csrf */}

          <div className="mb-4">
            <label
              className="block text-gray-700 text-base font-bold mb-2"
              htmlFor="userName"
            >
              Username
            </label>
            <input
              ref={userName}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="userName"
              value={userName.current?.value}
              onChange={(e) => (userName.current.value = e.target.value)}
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-base font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              ref={password}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={password.current?.value}
              onChange={(e) => (password.current.value = e.target.value)}
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="current-password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={loginApp}
              className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
            >
              Login
            </button>
            {/* <a onClick={() => navigate("/signUp")} className="cursor-pointer inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800">
              Sign Up
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
