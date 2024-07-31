
import React, { useState, useCallback, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

const ImageCapture =React.memo( ({ onCapture, fieldId,imageData }) => {
  const [image, setImage] = useState('');
  const webcamRef = useRef(null);
  const [cameraDevices, setCameraDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
 useEffect(()=>{
setImage(imageData)
 },[imageData])
  useEffect(() => {
    // Enumerate available media devices (cameras)
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const cameraDevices = devices.filter((device) => device.kind === 'videoinput');
      setCameraDevices(cameraDevices);
// setNumberofCamera(cameraDevices.length);
      // Select the first camera as the default option (you can change this logic)
      if (cameraDevices.length > 0) {
        setSelectedDeviceId(cameraDevices[0].deviceId);
      }
    });
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
   // console.log(imageSrc)
    onCapture(imageSrc);
  }, [onCapture]);

  const handleDeviceChange = (event) => {
    setSelectedDeviceId(event.target.value);
  };

  return (
    <div className="webcam-container">
      <div className="webcam-img">
        {image === '' ? (
          <>
            <Webcam
              audio={false}
              height={200}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={220}
              videoConstraints={{
                width: 220,
                height: 200,
                facingMode: 'user',
                deviceId: selectedDeviceId, // Specify the selected camera device
              }}
            />
            <select onChange={handleDeviceChange} value={selectedDeviceId}>
              {cameraDevices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </select>
          </>
        ) : (
          <img src={image} alt="Captured" />
        )}
      </div>
      <div>
        {image !== '' ? (
          <button
          type='button'
            onClick={() => {
              setImage('');
            }}
            className="webcam-btn w-md px-4 py-2 font-bold text-white bg-gray-600 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            Retake Image
          </button>
        ) : (
          <button
          type='button'
            className="webcam-btn w-md px-4 py-2 font-bold text-white bg-gray-600 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            onClick={capture}
          >
            Capture photo
          </button>
        )}
      </div>
    </div>
  );
});

export default ImageCapture;
