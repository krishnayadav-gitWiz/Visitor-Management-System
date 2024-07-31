import React, { useState, useEffect } from "react";

const BarcodeScanner = (sendDatatoMain) => {
  const [scannedData, setScannedData] = useState("");
  const [storedData, setStoredData] = useState("");
  const [isVisible, setIsVisible] = useState(true);

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
      if (isVisible && event.key === "Enter") {
        // 'Enter' key was pressed and the page is visible
        // Your logic here
        console.log("storedData is here1", storedData);
        sendDatatoMain(storedData);
      }
      else if(!isVisible && event.key === "Enter"){
        console.log("storedData is here2", storedData);
      }
    };

    // Add the event listener for keydown
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible,storedData]);

 







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
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") console.log("storedData is here", storedData);
    };
    window.addEventListener("keydown", handleKeyDown);

    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [storedData]);
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    // window.addEventListener("keydown", handleOnClickData);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      //window.removeEventListener("keydown", handleOnClickData);
    };
  }, []);

  // const handleOnClickData = (event) => {
  //   if (event.key === "Enter") {
  //     console.log("storedData :- ", storedData);
  //   }
  // };

  return (
    <div>
    {/* <div>
      <h1>Barcode Scanner</h1>
      <p>Scanned Data: {scannedData}</p>
       <p>Stored Data: {storedData}</p>
     </div>*/}
     </div>
  );
};

export default BarcodeScanner;
