import React, { useState } from "react";
import { ApiConstants } from "../api/ApiConstants";
import custom_axios from "../axios/AxiosSetup";
import NavBar from "../components/navBar";
import { PDFDownloadLink, StyleSheet, Document, Page, Text, View } from '@react-pdf/renderer';
//import { toast } from "react-toastify";
import ReactPaginate from 'react-paginate';
interface UserModel {
  id : number ,
  fName: string;
  lName: string;
  AppointmentId: number;
  mobileNo: number;
  
}
const styles = StyleSheet.create({
     
    page: {
        flexDirection: 'column',
        backgroundColor: '#FAEBD7',
        marginTop: '15px',
        textAlign: 'center'
        
      },
      row: {
        flexDirection: 'row',
        marginBottom: 10,
      },
      Name: {
        fontWeight: 'bold',
        marginRight: 5,
        fontSize:'15px',
        marginTop: '10px'
        
      },
      LastName: {
        fontStyle: 'italic',
        marginRight: 5,
        fontSize:'15px',
        marginTop: '10px'
      },
      AppointmentId: {
        marginRight: 5,
        fontSize:'15px',
        marginTop: '10px'
      },
      mobileNo: {
        marginRight: 5,
        fontSize:'15px',
        marginTop: '10px'
      },
      view:{
      
      padding: '10px',
      },
      header:{
       
       fontSize: '20px',
       fontWeight:'bold',
       marginBottom: '15px',
       textDecoration: 'underline',
       fontStyle: 'italic'
       
      }

})


const VisitorsPage = () => {
  const [users, setUsers] = React.useState<UserModel[]>([]);
  const [currentPage,setCurrentPage]=useState(0);
  const [filterData , setFilterData]=useState([]);
  const[query,setQuery] = useState('');
  const getAllUsers = async () => {
      const response = await custom_axios.get(ApiConstants.APPOINTMENT.GET_ALL, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } });
      setUsers(response.data);
      setFilterData(response.data);
    } 

  React.useEffect(() => {
    if (users.length == 0) getAllUsers();
  }, []);

  const generatePdfContent = (user: UserModel) => (
    <Document>
      <Page size="A4"style={styles.page}>
        <View style={styles.view}>
            <Text id="header" style={styles.header}>WELCOME TO DELHI SECRETARIAT</Text>
          <Text style={styles.Name}>Visitor Name.: {user.fName} {user.lName}</Text>
          <Text style={styles.AppointmentId}>Appointment ID.: {user.AppointmentId}</Text>
          <Text style={styles.mobileNo}>Mobile No.: {user.mobileNo}</Text>
          
          {/* Add other data fields you want to include in the PDF */}
        </View>
      </Page>
    </Document>
  );

  const handlesearch =(event: React.ChangeEvent<HTMLInputElement>)=>{
    const getSearch = event.target.value;
    if(getSearch.length>0){
      // const searchData= users.filter((item)=>item.vFirstName.toLowerCase().includes(getSearch));
      const searchData = users.filter((item) => {
        const lowerCaseSearch = getSearch.toLowerCase();
        return (
          item.fName.toLowerCase().includes(lowerCaseSearch) ||
          item.lName.toLowerCase().includes(lowerCaseSearch) ||

          item.AppointmentId.toString().includes(getSearch) // Assuming `getSearch` is the phone number input
        );
      });
      setUsers(searchData);
    }else{
      setUsers(filterData)
    }
    setQuery(getSearch)
  }


  const entriesPerPage = 10;
  const startIndex =currentPage * entriesPerPage;
  const endIndex=startIndex + entriesPerPage;
  const displayedLogs = users.slice(startIndex,endIndex);
  const handlePageChange=(selectedPage: { selected: React.SetStateAction<number>; })=>{
    setCurrentPage(selectedPage.selected)
  }
      
   
  return (
    <div>
      <NavBar></NavBar>
      <div className='flex justify-center mb-4 border-b-2 border-blue-600'>
         <div className='display-center mr-24'>
            <h1 className="text-2xl text-black  text-center p-2  mt-4 font-mono font-bold ">VISITORS</h1>
         </div>
       <div className='justify-end ml-76 mt-4'>
            <label htmlFor="form-control"className='font-bold text-l mt-2' >Search: </label>
             <input  type="text" name='name' value={query}   className="form-control w-72 bg-white px-6 py-3 ml-8 mr-8 text-sm leading-tight text-gray-700 border-2 rounded shadow appearance-none focus:outline-none focus:shadow-outline" onChange={(e)=>handlesearch(e)} placeholder='Search...' />
       </div>
     </div>
     
      
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        FirstName
                      </th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        LastName
                      </th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Appointment ID
                      </th>
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Mobile NO.
                      </th>
                      
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        Download Appointment
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {displayedLogs.map((user) => {
                      return (
                        <tr key={user.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.fName}</td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">{user.lName}</td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.AppointmentId}</td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.mobileNo}</td>
                          
                          <td className="py-4 px-6 text-sm font-medium text-start whitespace-nowrap">
              <PDFDownloadLink
                document={generatePdfContent(user)}
                fileName="user.pdf"
              >
                <button  className="bg-yellow-400 hover:bg-red-500 rounded-lg px-4 py-2 text-white shadow-sm text-xl "
                
                
                >download</button>
              </PDFDownloadLink>
            </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-8 p-4 border-b-2 border-blue-700 mt-4">
       <ReactPaginate
       previousLabel={"Previous"}
       nextLabel={"Next"}
       breakLabel={"..."}
       breakClassName={"break-me"}
       pageCount={Math.ceil(users.length/entriesPerPage)}
       marginPagesDisplayed={2}
       pageRangeDisplayed={5}
       onPageChange={handlePageChange}
       containerClassName={"pagination"}
       activeClassName={"active"}
       pageClassName={"page-item"}
       pageLinkClassName={"page-link"}
       previousClassName={"page-item"}
       nextClassName={"page-item"}
       previousLinkClassName={"page-link"}
       nextLinkClassName={"page-link"} 
      

       />
       </div>
    </div>
  );
};

export default VisitorsPage;