//import React from "react";
import LOGO from '../assets/LOGO.png'
const Footer = () => {
    return (
        <div className="flex justify-center mt items-center mb-8">
          <div className=" flex   items-center flex-shrink-0 text-gray-800 mr-16">
            <span className="font-bold  p-3 text-xl text-blue-600  flex justify-center items-center gap-2">
              <img src={LOGO} className=" mr-5 ml-10 h-27 w-23 "></img> <p className="text-center text-gray-500 text-lg">Fax: +91-11-41519898 Email:support@elkostaindia.com,www.elkostaindia
              
              <p className="text-center text-gray-500 text-lg"> 101 - Mercantile House ,K.G. Marg , New Delhi - 110001 , ph.: +91-11-41519899</p>
             
              </p>
            </span>
          </div> 
        </div>
    )

}
export default Footer;