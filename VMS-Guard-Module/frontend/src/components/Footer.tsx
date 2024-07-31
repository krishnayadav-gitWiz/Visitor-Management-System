import React from "react";
import LOGO from '../assets/LOGO.png'
const Footer = () => {
    return (
      
            <span className="font-bold br-2 b bg-purple-300 flex-1 mt-2 mb-5 absolute rounded-lg border-t-2 border-black p-3 text-xl text-blue-600  flex justify-center items-center ">
              <img src={LOGO} className=" mr-5 ml-10 h-16 w-20 "></img> <p className="text-center text-gray-500 text-base">Fax: +91-11-41519898 Email:support@elkostaindia.com, www.elkostaindia, 101 - Mercantile House, K.G. Marg, New Delhi - 110001, ph.: +91-11-41519899
              </p>
           
        </span>
    )

}
export default Footer;