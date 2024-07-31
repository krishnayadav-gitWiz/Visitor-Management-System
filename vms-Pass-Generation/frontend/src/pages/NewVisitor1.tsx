import React, { useEffect, useState } from 'react';
import ImageCapture from '../components/ImageCapture';
import cbimage from "../assets/cbimage.png";
import cbimage1 from "../assets/cbimage (1).png";
import cbimage2 from "../assets/cbimage (2).png";
import cbimage3 from "../assets/cbimage (3).png";
import cbimage4 from "../assets/cbimage (4).png"
import NewNavBar from "../components/NewNavbar";;
const NewVisitor = () => {
  const [cameraStream, setCameraStream] = useState(null);
  const [images, setImages] = useState([]);
  const [vPhoto,setvPhoto]= useState();
  const handleCapture = (imageSrc) => {
    setvPhoto(imageSrc);
  };
  const data=[cbimage1,cbimage2,cbimage3,cbimage4,cbimage,cbimage1,cbimage2,cbimage,cbimage,cbimage,cbimage,cbimage,cbimage,cbimage,cbimage];
  useEffect(() => {
    console.log(data.length);
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => setCameraStream(stream))
      .catch((error) => console.error('Error accessing camera:', error));

    
    // fetch('')
    //   .then(response => response.json())
    //   .then(data => setImages(data))
    //   .catch(error => console.error('Error fetching images:', error));
         setImages(data);
    
    return () => {
      if (cameraStream) {
        const tracks = cameraStream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
    <NewNavBar/>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto',backgroundColor:'#93C5FD' }}>
      {/* <div style={{ textAlign: 'center', marginRight: '20px' }}>
        {cameraStream && <video style={{ width: '400px', height: '300px' }} autoPlay playsInline srcObject={cameraStream} />}
      </div> */}

      <div style={{ display: 'flex', flexDirection: 'row',marginTop:'10vh'}}>
        <div style={{ flex: 1 , marginRight:"20px",marginLeft:"20px"}}>
          {images.slice(0, Math.ceil(images.length / 2)).map((image, index) => (
            <div key={index} style={{textAlign:'center'}} >
            <img key={index} style={{ width: '15vh', height: '15vh', marginBottom: '10px' }} src={image} alt={`Image ${index}`} />
            <p>Match Percent: {index}</p>
          </div>
          ))}
        </div>
        <div style={{justifyContent:'center',alignItems:"center",marginTop:"30vh"}}>
           <ImageCapture onCapture={handleCapture} fieldId="vPhoto" imageData={""} />
           </div>
        <div style={{ flex: 1, marginRight:"20px",marginLeft:"20px" }}>
          {images.slice(Math.ceil(images.length / 2)).map((image, index) => (
            <div key={index} style={{textAlign:'center'}} >
            <img key={index} style={{ width: '15vh', height: '15vh', marginBottom: '10px' }} src={image} alt={`Image ${index}`} />
            <p>Match Percent: {index}</p>
          </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'fixed', bottom: 0, right: 0 }}>
        <p>Maximum match:</p>
  <img src={images[4]} alt="Your Image" style={{ width: '100px', height: '100px',border:"4px solid green" }} />
</div>
    </div>
    </div>
  );
};

export default NewVisitor;
