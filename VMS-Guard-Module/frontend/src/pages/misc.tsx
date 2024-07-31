import Header from '../components/Header';
import Photo from '../assets/Photo.jpg'
import { useEffect, useState } from 'react';
import custom_axios from '../axios/AxiosSetup';
import { ApiConstants } from '../api/ApiConstants';

interface VisitorModel {
  indexId: number;
  vDate: string;
  visitor: {
    vFirstName: string;
    visitorType: string;
    vPhoto: string;
  };
}

const Homepage = () => {
  const [visitors, setVisitors] = useState<VisitorModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await custom_axios.get(ApiConstants.VISITORS_VISIT_DATE.FINDALL);
        setVisitors(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />

      {visitors.map((user, index) => (
        <div key={index} className={`mt-16 flex justify-between ${index === 0 ? 'first-entry' : 'other-entries'}`}>
          <div className="flex justify-center">
            <div className="w-1/2 max-w-6xl rounded overflow-hidden shadow-lg">
              <img className="w-full max-h-5xl" src={user.visitor.vPhoto} alt="Sunset in the mountains" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Name: {user.visitor.vFirstName}</div>
                <div className="font-bold text-xl mb-2">UserType: {user.visitor.visitorType}</div>
              </div>
            </div>
          </div>

          {index === 0 ? (
            <div className="w-1/2 justify-center">
              <div>
                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={user.visitor.vPhoto}alt="" />
              </div>
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Name:{user.visitor.vFirstName} </h5>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">VisitorType: {user.visitor.visitorType}</h5>
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Homepage;