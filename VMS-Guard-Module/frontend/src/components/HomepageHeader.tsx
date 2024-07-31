import { getLoginInfo } from "../utils/LoginInfo";

const HomepageHeader =()=>{
    
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
      // Update the time initially and then every second
      updateTime();
      setInterval(updateTime, 1000);
      const TodayDate = new Date().toDateString();
    
    return(
        <div>
        <div className=" bg-gray-600 border-blue-500 border-b-4 h-auto">
            
            <h1 className="text-center   text-white py-6  font-bold text-xl">Visitor Management System</h1>
        </div>
        <div className="flex justify-between bg-blue-300">
            <div className="w-1/2 flex justify-start font-bold ml-8"><span>Logged In: {getLoginInfo()?.userName}</span></div>
            <div className="w-1/2 flex justify-end mr-8 font-bold" id="timeDisplay">Time: <span className="ml-2 mr-1" id="currentTime"></span> | <span className="ml-1">{TodayDate}</span></div>
        </div>
        </div>
    )
}
export default HomepageHeader;