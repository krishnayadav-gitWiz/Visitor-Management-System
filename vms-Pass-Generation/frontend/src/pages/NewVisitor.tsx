import React, { useState, useEffect } from "react";

import custom_axios from "../axios/AxiosSetup";
import { getLoginInfo } from "../utils/LoginInfo";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ApiConstants } from "../api/ApiConstants";
import ImageCapture from "../components/ImageCapture";
import NewNavBar from "../components/NewNavbar";
import SignatureCapture from "../signatureComponent/SignatureCapture";

const validationSchema = Yup.object().shape({
  vFirstName: Yup.string().required("First Name is required"),
  vLastName: Yup.string().required("Last Name is required"),
  vDateOfBirth: Yup.date()
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth cannot be in the future")
    .test("valid-date", "Invalid Date of Birth", (value) => {
      const dob = new Date(value);
      const currentYear = new Date().getFullYear();
      return dob.getFullYear() >= 1900 && dob.getFullYear() <= currentYear;
    }),
  vehicleNo: Yup.string().required("vehicle number is required"),
  vMobileNo: Yup.string()
    .required("Contact Number is required")
    .matches(/^\d{10}$/, "Contact number must be a 10-digit number"),
  vAddress: Yup.string().required("Address is required"),
  visitorType: Yup.string()
    .required("Visitor Type is required")
    .oneOf(["Normal", "VIP", "VVIP"], "Invalid visitor Type Type"),
});
const NewVisitor = () => {
  let navigate = useNavigate();
  const [vPhoto, setVphoto] = useState("");
  const [vSignature, setVsignature] = useState("");

  const handleCapture = (imageSrc) => {
    setVphoto(imageSrc);
  };
  const handleSignatureCapture = (data) => {
    if (data !== "") {
      setVsignature(`data:image/png;base64,${data}`);
    }
  };
  useEffect(() => {
    console.log(vSignature, "this is form data");
  }, [vSignature]);

  const formik = useFormik({
    initialValues: {
      vFirstName: "",
      vLastName: "",
      vDateOfBirth: "",
      vehicleNo: "",
      vMobileNo: "",
      vAddress: "",
      visitorType: "",
      vPhoto: "",
      vSignature: "",
    },
    validationSchema,

    onSubmit: async (values) => {
      const role = getLoginInfo()?.userType;
      if (role !== "") {
        try {
          const formData = new FormData();
          formData.append("vFirstName", values.vFirstName);
          formData.append("vLastName", values.vLastName);
          formData.append("vDateOfBirth", values.vDateOfBirth);
          formData.append("vAddress", values.vAddress);
          formData.append("vMobileNo", values.vMobileNo);
          formData.append("vehicleNo", values.vehicleNo);
          formData.append("visitorType", values.visitorType);
          formData.append("vPhoto", vPhoto);
          formData.append("vSignature", vSignature);

          //  formData.forEach(function(value, key){
          //  console.log(key, value);
          //  });

          const response = await custom_axios.post(
            ApiConstants.VISITORS.ADD,
            formData
          );

          toast.success("Visitor added successfully!!!");
          navigate("/visitors");
        } catch (error) {
          console.error(error);
          toast.error("Error adding user. Please try again.");
        }
      } else {
        toast.info("Forbidden Resource");
      }
    },
  });

  return (
    <div className="">
      <NewNavBar />
      <div className="flex justify-center px-4 mt-1 my-12">
        <div className="w-screen bg-blue-300 px-8 shadow-2xl mx-auto justify-center p-5 rounded-lg">
          <h1 className="text-center font-bold text-xl border-b-2 border-black">
            Register New Visitor
          </h1>
          <form
            className="px-8 pt-6 pb-8 mb-4 bg-blue-300 rounded"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4 md:flex justify-center flex-col md:justify-between mx-auto text-center ">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                {...formik.getFieldProps("vFirstName")}
                className="w-3/12 mx-auto px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="vFirstName"
                type="text"
                placeholder="First Name"
              />
              {formik.touched.vFirstName && formik.errors.vFirstName && (
                <p className="text-red-500">{formik.errors.vFirstName}</p>
              )}
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                {...formik.getFieldProps("vLastName")}
                className="w-3/12 mx-auto px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="vLastName"
                type="text"
                placeholder="Last Name"
              />
              {formik.touched.vLastName && formik.errors.vLastName && (
                <p className="text-red-500">{formik.errors.vLastName}</p>
              )}
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="dateofBirth"
              >
                Date of Birth
              </label>
              <input
                {...formik.getFieldProps("vDateOfBirth")}
                className="w-3/12 mx-auto px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="DateOfBirth"
                type="Date"
                placeholder="Date of birth here!"
              />
              {formik.touched.vDateOfBirth && formik.errors.vDateOfBirth && (
                <p className="text-red-500">{formik.errors.vDateOfBirth}</p>
              )}
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="vehicleNumber"
              >
                Vehicle Number
              </label>
              <input
                {...formik.getFieldProps("vehicleNo")}
                className="w-3/12 mx-auto px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="VehicleNo"
                type="text"
                placeholder="Vehicle Number"
              />
              {formik.touched.vehicleNo && formik.errors.vehicleNo && (
                <p className="text-red-500">{formik.errors.vehicleNo}</p>
              )}
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="contactNumberL"
              >
                Mobile Number
              </label>
              <input
                {...formik.getFieldProps("vMobileNo")}
                className="w-3/12 mx-auto px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="vMobileNo"
                type="number"
                placeholder="Contact Number"
              />
              {formik.touched.vMobileNo && formik.errors.vMobileNo && (
                <p className="text-red-500">{formik.errors.vMobileNo}</p>
              )}
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="visitorType"
              >
                Visitor Type
              </label>
              <select
                {...formik.getFieldProps("visitorType")}
                className="w-3/12 mx-auto px-3 py-2 mb-3 text-sm text-center leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="VisitorType"
                defaultValue=""
              >
                <option value="">Select Visitor Type</option>
                <option value="Normal">Normal</option>
                <option value="VIP">VIP</option>
                <option value="VVIP">VVIP</option>
              </select>
              {formik.touched.visitorType && formik.errors.visitorType && (
                <p className="text-red-500">{formik.errors.visitorType}</p>
              )}
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="address"
              >
                Address
              </label>
              <input
                {...formik.getFieldProps("vAddress")}
                className="w-3/12 px-3 mb-3 mx-auto py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="vAddress"
                type="text"
                placeholder="Visitor Address"
              />
              {formik.touched.vAddress && formik.errors.vAddress && (
                <p className="text-red-500">{formik.errors.vAddress}</p>
              )}
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="PhotoImage"
              >
                Photo Image
              </label>
              <div id="vPhoto" {...formik.getFieldProps("vPhoto")}>
                <ImageCapture
                  imageData={""}
                  onCapture={handleCapture}
                  fieldId="vPhoto"
                />
              </div>
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="vSignature"
              >
                Signature
              </label>
              <div id="vSignature" {...formik.getFieldProps("vSignature")}>
                <SignatureCapture onCapture={handleSignatureCapture} />
              </div>
              <div className="mb-8 mt-4 text-center">
                        <button
                            type="submit"
                            className="w-3/12 px-4 py-2 font-bold text-white bg-gray-600 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        >
                            Register
                        </button>
                        </div>
            </div>
            <hr className="mb-4 border-t" />
          </form>
        </div>
      </div>
    </div>
  );
};
export default NewVisitor;
