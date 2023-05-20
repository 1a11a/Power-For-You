import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import NavBar from "../../Common/NavBar";
import axios from "axios";
import { API_URL } from "../../Data/API";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function AddCustomer() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [message, setMessage] = useState(null);
  const [area, GetArea] = useState([]);

  const getAllAddedAreas = async () => {
    try {
      await axios.get(`${API_URL}/area/get_area`).then((res) => {
        console.log("first", res.data.Data);
        GetArea(res.data.Data);
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const onSubmit = async (data) => {
    try {
      await axios.post(`${API_URL}/customer/add_customer`, data).then((response) => {
        console.log("ds", response.data.code);
        if (response.data.code === 400) {
          setMessage(response.data.message);
        } else {
          console.log("Data", response.data);
          toast.success(response.data.message);
          window.location.reload();
        }
      });
    } catch (error) {
      setMessage(error);
    }
  };

  useEffect(() => {
    getAllAddedAreas();
  }, []);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="container p-5">
        <h1 className="text-primary mb-4">ADD NEW CUSTOMER</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group ">
            <label htmlFor="exampleInputEmail1">Customer ID</label>
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter Customer Id"
              {...register("c_id", {
                required: "Customer ID must be filled.",
                pattern: {
                  value: /^[a-zA-Z0-9 ]*$/,
                  message: "Only letters and numbers are allowed.",
                },
              })}
            />
            {errors.s_id && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                {errors.s_id.message}
              </p>
            )}
          </div>

          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Customer Full Name"
              {...register("c_full_name", {
                required: "Full Name must be filled.",
                pattern: {
                  value: /^[a-zA-Z ]*$/,
                  message: "Only letters are allowed.",
                },
              })}
            />
            {errors.s_full_name && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                {errors.s_full_name.message}
              </p>
            )}
          </div>

          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1">Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Address"
              {...register("c_address", {
                required: "Address must be filled.",
                pattern: {
                  value: /[A-Za-z0-9'\.\-\s\,]*$/,
                  message:
                    "Special characters, numbers, commas and spaces are allowed.",
                },
              })}
            />
            {errors.s_address && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                {errors.s_address.message}
              </p>
            )}
          </div>


          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1">Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Email"
              {...register("c_email", {
                required: "Customer Email must be filled.",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invalid email address.",
                },
              })}
            />
            {errors.s_email && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                {errors.s_email.message}
              </p>
            )}
          </div>

          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1">Residenship</label>
            <select
              className="form-control dropdown-toggle"
              {...register("c_residenship", {
                required: "Residenship must be selected.",
              })}
            >
              <option selected={true} disabled defaultValue="DEFAULT">
                Select Residenship
              </option>
              <option key={1} value={"Permenent"}>
                Permenent 
              </option>
              <option key={2} value={"Temparary"}>
                Temparary 
              </option>
            </select>

            {errors.s_gender && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                {errors.s_gender.message}
              </p>
            )}
          </div>

          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1">Area ID</label>
            <select
              className="form-control dropdown-toggle"
              {...register("c_area_id", {
                required: "Area Id must be selected.",
              })}
            >
              <option selected={true} disabled defaultValue="DEFAULT">
                Select Area ID
              </option>
              {area && area.length > 0 ? (
                area.map((item, index) => (
                  <option key={index} value={item.area_id}>
                    {item.area_id}
                  </option>
                ))
              ) : (
                <option>No Area Id Found</option>
              )}
            </select>

            {errors.c_area_id && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                {errors.s_area_id.message}
              </p>
            )}
          </div>

          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1">Contact Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Contact Number"
              {...register("c_contact", {
                required: "Customer Contact No must be filled.",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number.",
                },
              })}
            />
            {errors.s_contact && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                {errors.s_contact.message}
              </p>
            )}
          </div>

          {message && (
            <p style={{ color: "red", fontSize: "18px", marginTop: "10px" }}>
              {message}
            </p>
          )}
          <button
            type="submit"
            className="btn btn-primary mt-4"
            style={{ width: "100%" }}
          >
            Submit
          </button>
        </form>
        <div>
          <Link to={"/list_customer"}>
            <button
              type="submit"
              className="btn btn-danger mt-2"
              style={{ width: "100%" }}
            >
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddCustomer;
