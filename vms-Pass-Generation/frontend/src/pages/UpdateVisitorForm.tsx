import React, { useEffect, useState } from "react";
import custom_axios from "../axios/AxiosSetup";
import { getLoginInfo } from "../utils/LoginInfo";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
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

const UpdateVisitorForm = () => {
  let navigate = useNavigate();
  const [vPhoto, setVphoto] = useState("");
  const [vSignature, setVsignature] = useState("");
  const { Id } = useParams();

  const handleCapture = (imageSrc) => {
    formik.setFieldValue("vPhoto", imageSrc);
    console.log(setVphoto);
  };
  // const [userData , setUserData] = useState({
  //     vFirstName: '',
  //     vLastName: '',
  //     vDateOfBirth: '',
  //     vehicleNo: '',
  //    vMobileNo: '',
  //    vAddress: '',
  //    visitorType: '',
  //    vPhoto: '',
  //   // vSignature:'',

  //         });

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
          {
            !vPhoto
              ? formData.append("vPhoto", values.vPhoto)
              : formData.append("vphoto", vPhoto);
          }
          //formData.append('vSignature', vSignature);
          // console.log(vPhoto,'this is v photo')

          formData.forEach(function (value, key) {
            console.log(key, value);
          });

          const response = await custom_axios.put(
            ApiConstants.VISITORS.Update(Id),
            formData
          );
          console.log(response);
          alert("user details updated sucessfully");

          navigate("/updateVisitor");
        } catch (error) {
          console.error(error);
          toast.error("Error adding user. Please try again.");
        }
      } else {
        toast.info("Forbidden Resource");
      }
    },
  });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await custom_axios.get(
          ApiConstants.VISITORS.FINDONE(Id)
        );
        ///setUserData(response.data);
        formik.setValues({
          vFirstName: response.data.vFirstName || "",
          vLastName: response.data.vLastName || "",
          vDateOfBirth: response.data.vDateOfBirth || "",
          vehicleNo: response.data.vehicleNo || "",
          vMobileNo: response.data.vMobileNo || "",
          vAddress: response.data.vAddress || "",
          visitorType: response.data.visitorType || "",
          vPhoto: response.data.vPhoto || "", // Add vPhoto here if needed
          vSignature: response.data.vSignature || "", // Add vSignature here if needed
        });
      } catch (error) {
        console.log("error fetching data ", error);
      }
    };
    fetchUserData();
  }, [Id]);

  return (
    <div>
      <NewNavBar />

      {formik.values && (
        <div className=" mt-4 container mx-auto">
          <div className="flex justify-center px-4 mt-1 my-12">
            <div className=" bg-blue-300 px-8 shadow-2xl mx-auto justify-center p-5 rounded-lg">
              <h1 className="text-center font-bold text-xl border-b-2 border-black">
                Update Visitor Info.
              </h1>
              <h3 className="pt-4 text-2xl text-center"></h3>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-blue-300 rounded"
                onSubmit={formik.handleSubmit}
              >
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="userName"
                    >
                      First Name
                    </label>
                    <input
                      {...formik.getFieldProps("vFirstName")}
                      // value={userData.vFirstName}
                      // onChange={(e) => customHandleChange('vFirstName', e.target.value)}
                      name="vFirstName"
                      /*value={userData.vFirstName}*/
                      // onChange={(e) => customHandleChange('vLastName', e.target.value)}
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="vFirstName"
                      type="text"
                    />
                    {formik.touched.vFirstName && formik.errors.vFirstName && (
                      <p className="text-red-500">{formik.errors.vFirstName}</p>
                    )}
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="vLastName"
                    >
                      Last Name
                    </label>
                    <input
                      {...formik.getFieldProps("vLastName")}
                      /*value={userData.vLastName}*/
                      //onChange={(e) => customHandleChange('vLastName', e.target.value)}

                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="vLastName"
                      type="text"
                    />
                    {formik.touched.vLastName && formik.errors.vLastName && (
                      <p className="text-red-500">{formik.errors.vLastName}</p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="shiftTime"
                  >
                    Date of Birth
                  </label>
                  <input
                    {...formik.getFieldProps("vDateOfBirth")}
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="DateOfBirth"
                    type="Date"
                    //value={userData.vDateOfBirth}
                    // onChange={(e) => customHandleChange('vDateOfBirth', e.target.value)}
                  />
                  {formik.touched.vDateOfBirth &&
                    formik.errors.vDateOfBirth && (
                      <p className="text-red-500">
                        {formik.errors.vDateOfBirth}
                      </p>
                    )}
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="vehicleNo"
                    >
                      Vehicle Number
                    </label>
                    <input
                      {...formik.getFieldProps("vehicleNo")}
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="VehicleNo"
                      type="text"
                      // value={userData.vehicleNo}
                      // onChange={(e) => customHandleChange('vehicleNo', e.target.value)}
                    />
                    {formik.touched.vehicleNo && formik.errors.vehicleNo && (
                      <p className="text-red-500">{formik.errors.vehicleNo}</p>
                    )}
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="contactNumberL"
                    >
                      Mobile Number
                    </label>
                    <input
                      {...formik.getFieldProps("vMobileNo")}
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="vMobileNo"
                      type="number"
                      // value={userData.vMobileNo}
                      // onChange={(e) => customHandleChange('vMobileNo', e.target.value)}
                    />
                    {formik.touched.vMobileNo && formik.errors.vMobileNo && (
                      <p className="text-red-500">{formik.errors.vMobileNo}</p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="contactNumberM"
                  >
                    Visitor Type
                  </label>
                  <select
                    {...formik.getFieldProps("visitorType")}
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="visitorType"
                    // value={userData.visitorType}
                    //onChange={(e) => customHandleChange('visitorType', e.target.value)}
                  >
                    <option value="">Select Visitor Type</option>
                    <option value="Normal">Normal</option>
                    <option value="VIP">VIP</option>
                    <option value="VVIP">VVIP</option>
                  </select>
                  {formik.touched.visitorType && formik.errors.visitorType && (
                    <p className="text-red-500">{formik.errors.visitorType}</p>
                  )}
                </div>

                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="userName"
                    >
                      Address
                    </label>
                    <input
                      {...formik.getFieldProps("vAddress")}
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="vAddress"
                      type="text"
                      //value={userData.vAddress}
                      //onChange={(e) => customHandleChange('vAddress', e.target.value)}
                    />
                    {formik.touched.vAddress && formik.errors.vAddress && (
                      <p className="text-red-500">{formik.errors.vAddress}</p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="PhotoImage"
                  >
                    Photo Image
                  </label>

                  <div
                    id="vPhoto"

                    //{...formik.getFieldProps('vPhoto')}
                  >
                    {/* <img src={formik.values.vPhoto}/> */}
                    <ImageCapture
                      onCapture={handleCapture}
                      fieldId="vPhoto"
                      imageData={formik.values.vPhoto}
                    />
                    {/* {formik.touched.vPhoto && formik.errors.vPhoto && (
                            <p className="text-red-500">{formik.errors.vPhoto}</p>
                        )} */}
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="vSignature"
                  >
                    Signature
                  </label>
                  <div id="vSignature" {...formik.getFieldProps("vSignature")}>
                    <img src={formik.values.vSignature} alt="" />
                  </div>
                </div>

                <div className="mb-8 text-center">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 font-bold text-white bg-gray-600 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  >
                    Update
                  </button>
                </div>
                <hr className="mb-4 border-t" />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateVisitorForm;
