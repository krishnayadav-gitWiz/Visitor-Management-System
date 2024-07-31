import { ApiConstants } from "../api/ApiConstants";
import custom_axios from "../axios/AxiosSetup";
import React, { useEffect, useState } from "react";
import NewNavBar from "../components/NewNavbar";

interface VisitorModel {
  Id: number;
  vFirstName: string;
  vLastName: string;
  vPhoto: string;
}

const VisitorImage = () => {
  const [visitors, setVisitors] = useState<VisitorModel[]>([]);

  const getVisitorImages = async () => {
    const response = await custom_axios.get(ApiConstants.VISITORS.FIND_ALL);
    setVisitors(response.data);
  };
  useEffect(() => {
    if (visitors.length == 0) getVisitorImages();
  }, []);

  return (
    <div>
      <NewNavBar />

      <h1 className=" px-3 py-4 font-bold text-3xl justify-center flex border-b-4 border-black">
        {" "}
        Visitor Images
      </h1>
      <div className=" flex  flex-wrap justify-center">
        {visitors.map((visitor) => {
          return (
            <div
              key={visitor.Id}
              className=" mx-4 my-8 max-w-sm bg-white hover:flex-col border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                className="rounded-t-lg  h-48 w-48 hover:scale-150 transition transform duration-500 cursor-pointer object-cover"
                src={visitor.vPhoto}
                alt="visitor photo"
              />

              <div className="p-5">
                <h5 className="mb-2  text-xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
                  {" "}
                  {visitor.vFirstName} {visitor.vLastName}
                </h5>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default VisitorImage;
