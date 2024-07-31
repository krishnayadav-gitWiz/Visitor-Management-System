import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ApiConstants } from "../api/ApiConstants";
import custom_axios from "../axios/AxiosSetup";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navBar";
//import { useState } from 'react';

const validationSchema = Yup.object().shape({
  fName: Yup.string()
    .required("First Name is required")
    .matches(/^[A-Za-z\s]+$/, "First name must contain text only"),
  lName: Yup.string()
    .required("Last Name is required")
    .matches(/^[A-Za-z\s]+$/, "Last name must contain text only"),
  DateofBirth: Yup.date()
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth cannot be in the future")
    .test("valid-date", "Invalid Date of Birth", (value) => {
      const dob = new Date(value);
      const currentYear = new Date().getFullYear();
      return dob.getFullYear() >= 1900 && dob.getFullYear() <= currentYear;
    }),
  vehicleNo: Yup.string().required("Vehicle Option is required"),
  mobileNo: Yup.string()
    .required("Mobile number is required")
    .matches(/^\d{10}$/, "Mobile number must be a 10-digit number"),
  address: Yup.string().required("Address is required"),
  AuthorizedBy: Yup.string().required("Employee Name is required"),
  EmpId: Yup.string().required("Employee ID is required"),
});

const AppointmentForm = () => {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fName: "",
      lName: "",
      DateofBirth: "",
      vehicleOption: "",
      vehicleNo: null,
      mobileNo: "",
      address: "",
      AuthorizedBy: "",
      EmpId: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // if (values.vehicleOption === 'without') {
      //     values.vehicleNo = null;
      //   }
      try {
        const response = await custom_axios.post(
          ApiConstants.APPOINTMENT.CREATE,
          {
            fName: values.fName,
            lName: values.lName,
            DateofBirth: values.DateofBirth,
            vehicleNo: values.vehicleNo,
            mobileNo: values.mobileNo,
            address: values.address,
            AuthorizedBy: values.AuthorizedBy,
            EmpId: values.EmpId,
          }
        );
        console.log(response.data);
        toast.success("Appointment Created Successfully!!!");
        navigate("/visitorsPage");
      } catch (error) {
        console.error(error);
        toast.error("Error creating appointment. Please try again.");
      }
    },
  });

  return (
    <div>
      <NavBar></NavBar>

      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full lg:w-5/12 bg-blue-300 shadow-2xl mx-auto justify-center p-5 rounded-lg">
            <h3 className="pt-4 border-b-2 border-black rouded font-bold text-2xl text-center">
              Create An Appointment!
            </h3>
            <form
              className="px-8 pt-6 pb-8 mb-4 bg-blue-300 rounded"
              onSubmit={formik.handleSubmit}
            >
              {/* First Name */}
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="fName"
                  >
                    First Name
                  </label>
                  <input
                    {...formik.getFieldProps("fName")}
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="fName"
                    type="text"
                    placeholder="First Name"
                  />
                  {formik.touched.fName && formik.errors.fName && (
                    <p className="text-red-500">{formik.errors.fName}</p>
                  )}
                </div>
                <div className="md:ml-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="lName"
                  >
                    Last Name
                  </label>
                  <input
                    {...formik.getFieldProps("lName")}
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="lName"
                    type="text"
                    placeholder="Last Name"
                  />
                  {formik.touched.lName && formik.errors.lName && (
                    <p className="text-red-500">{formik.errors.lName}</p>
                  )}
                </div>
              </div>

              {/* Date of Birth */}
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="DateOfBirth"
                >
                  Date Of Birth
                </label>
                <input
                  {...formik.getFieldProps("DateofBirth")}
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="DateOfBirth"
                  type="Date"
                  placeholder="DD-MM-YYYY"
                />
                {formik.touched.DateofBirth && formik.errors.DateofBirth && (
                  <p className="text-red-500">{formik.errors.DateofBirth}</p>
                )}
              </div>

              {/* Rest of the form */}
              {/* ... (existing form inputs) */}
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="VehicleNo"
                  >
                    Vehicle No.
                  </label>
                  <input
                    {...formik.getFieldProps("vehicleNo")}
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="vehicleNo"
                    type="string"
                    placeholder="Vehicle number"
                  />
                  {formik.touched.vehicleNo && formik.errors.vehicleNo && (
                    <p className="text-red-500">{formik.errors.vehicleNo}</p>
                  )}
                </div>

                <div className="md:ml-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    {...formik.getFieldProps("address")}
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="address"
                    type="text"
                    placeholder="Address"
                  />
                  {formik.touched.address && formik.errors.address && (
                    <p className="text-red-500">{formik.errors.address}</p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="mobileNo"
                >
                  Mobile Number
                </label>
                <input
                  {...formik.getFieldProps("mobileNo")}
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="mobileNo"
                  type="Number"
                  placeholder="mobile no"
                />
                {formik.touched.mobileNo && formik.errors.mobileNo && (
                  <p className="text-red-500">{formik.errors.mobileNo}</p>
                )}
              </div>
              <h4 className="pt-4 mb-4 text-xl text-center">Authorized By</h4>
              <div className="mb-8 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Employee Name
                  </label>
                  <input
                    {...formik.getFieldProps("AuthorizedBy")}
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="AuthorizedBy"
                    type="text"
                    placeholder="Employee Number"
                  />

                  {formik.touched.AuthorizedBy &&
                    formik.errors.AuthorizedBy && (
                      <p className="text-red-500">
                        {formik.errors.AuthorizedBy}
                      </p>
                    )}
                  {/* <p className="text-xs italic text-red-500">Please choose a password.</p> */}
                </div>
                <div className="md:ml-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="EmpId"
                  >
                    Employee ID
                  </label>
                  <input
                    {...formik.getFieldProps("EmpId")}
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="EmpId"
                    type="text"
                    placeholder="Employee Id"
                  />
                  {formik.touched.EmpId && formik.errors.EmpId && (
                    <p className="text-red-500">{formik.errors.EmpId}</p>
                  )}
                </div>
              </div>

              <div className="mb-6 text-center">
                <button
                  type="submit"
                  className="w-full px-4 py-2 font-bold text-white bg-gray-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                >
                  Create Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AppointmentForm;
