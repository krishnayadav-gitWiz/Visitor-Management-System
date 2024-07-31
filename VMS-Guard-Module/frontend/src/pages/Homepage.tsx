import { useEffect, useState } from "react";
import custom_axios from "../axios/AxiosSetup";
import { ApiConstants } from "../api/ApiConstants";
import Footer from "../components/Footer";
import BarcodeScanner from "../components/BarcodeScanner";
import HomepageHeader from "../components/HomepageHeader";
import src from "../assets/backgroundImage.jpg";
interface VisitorModel {
  indexId: number;
  vDate: string;
  visitor: {
    vFirstName: string;
    vLastName: string;
    visitorType: string;
    vPhoto: string;
  };
}

const Homepage = () => {
  const [visitors, setVisitors] = useState<VisitorModel[]>([]);
  const [barcodeData,setBarcodeData]=useState();
    
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
  
  const handleDataFromBarcodeScanner=(data)=>{
    setBarcodeData(data);
  }
  const [scannedData, setScannedData] = useState("");
  const [storedData, setStoredData] = useState<Number>();
  const [isVisible, setIsVisible] = useState(true);
  const [visitor,setVisitor]=useState<Object>({})
  const handleVisibilityChange = () => {
    if (document.hidden) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    // Add a listener for visibility change
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      // Remove the listener when the component unmounts
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ( event.key === "Enter") {
        // 'Enter' key was pressed and the page is visible
        // Your logic here
        const fetchData=async()=>{
          const numberStr = storedData.toString();

  // Check if the number has at least n-3 digits
 
    // Extract the first n-3 digits and convert them back to a number
    const extractedNumber = parseInt(numberStr.slice(0, 18), 10);
    
   

          try {const response= await custom_axios.get(ApiConstants.BARCODESCAN(extractedNumber));
          console.log(response)
        setVisitor(response.data[0])}catch(error){

          }
        }
        console.log("storedData is here", storedData);
        
  fetchData();
        //sendDatatoMain(storedData);
      }
      // else if(!isVisible && event.key === "Enter"){
      //   console.log("storedData is here2", storedData);
      // }
    };

    // Add the event listener for keydown
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [storedData]);

 







  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setScannedData("");
    } else {
      setScannedData((prevData) => prevData + event.key);
    }
  };
  useEffect(() => {
    if (scannedData !== "") {
      //console.log("Scanned Data in useEffect :- ", scannedData);
      setStoredData(scannedData);
    }
  }, [scannedData]);
  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.key === "Enter") console.log("storedData is here", storedData);
  //   };
  //   window.addEventListener("keydown", handleKeyDown);

    
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [storedData]);
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    // window.addEventListener("keydown", handleOnClickData);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      //window.removeEventListener("keydown", handleOnClickData);
    };
  }, []);
  return (
    <div className="overflow-auto bg-white h-auto ">
      
      <HomepageHeader />
      <div className="mb-10 flex bg-white ">
        <div className="justify-start mt-6  lg:ml-0">
          <div className="ml-36 h-76 w-96 border-green-700 border-4 mt-16 rounded">
            
              <div  className=" ">
                <div className="">
                  <img
                    className=" h-76 w-96" // Add "object-cover" class for full width
                    src={visitor.visitor?visitor.visitor.vPhoto:
                      src}
                    alt="Sunset in the mountains"
                  />
                  <div className="px-6 py-4 bg-white text-gray-500 text-center">
                    <div className="font-bold text-xl uppercase mb-2">
                      {visitor.visitor?visitor.visitor.vFirstName:"____"} {visitor.visitor?visitor.visitor.vLastName:"_____"}
                    </div>
                    <div className="font-bold text-xl  mb-2">
                      {" "}
                      {visitor.visitor?visitor.visitor.visitorType:"____"}
                    </div>
                  </div>
                </div>
              </div>
            
          </div>
        </div>

        <div className=" flex flex-wrap justify-between rounded h-40 ml-4 lg:ml-24 mr-4 lg:mr-24 py-2">
          {visitors.slice(1, 5).map((visitor) => {
            return (
              <div
                key={visitor.indexId}
                className="  my-8 max-w-md  border-green-700 border-4 bg-white hover:flex-col border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <img
                  className="rounded-t-lg  h-40 w-56 cursor-pointer object-cover"
                  src={visitor.visitor.vPhoto}
                  alt="visitor photo"
                />
                <div className="p-2 text-center bg-white">
                  <h5 className="mb-  text-md font-bold tracking-tight uppercase upp text-gray-500">
                    {" "}
                    {visitor.visitor.vFirstName} {visitor.visitor.vLastName}{" "}
                  </h5>
                  <h5 className="mb- text-md font-bold tracking-tight text-gray-500">
                    {" "}
                    {visitor.visitor.visitorType}{" "}
                  </h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Homepage;
