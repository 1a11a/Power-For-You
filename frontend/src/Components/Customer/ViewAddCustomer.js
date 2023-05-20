import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../Data/API";
import NavBar from "../../Common/NavBar";
import { toast } from "react-toastify";

function ViewAddCustomer() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const params = useParams();

  const [message, setMessage] = useState(null);
  const [area, GetArea] = useState([]);
  const [customer, SetCustomer] = useState({
    c_id: "",
    c_full_name: "",
    c_address: "",
    c_email: "",
    c_residenship: "",
    c_area_id: "",
    c_contact: "",
  });

  const getAllCustomerByID = async () => {
    try {
      await axios.get(`${API_URL}/customer/get_customer/${params.id}`).then((res) => {
        const getData = res.data.Data;
        console.log(getData);
        SetCustomer(getData);
      });
    } catch (error) {
      console.log(error.response);
    }
  };

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
      const upData = {
        c_id: data.c_id,
        c_full_name: data.c_full_name,
        c_address: data.c_address,
        c_email: data.c_email,
        c_residenship: data.c_residenship,
        c_area_id: data.c_area_id,
        c_contact: data.c_contact,
      };

      console.log("upData", upData);
      await axios
        .put(`${API_URL}/customer/updte_customer/${params.id}`, upData)
        .then((res) => {
          if (res.data.code === 400) {
            setMessage(res.data.message);
          } else {
            console.log("data", data);
            toast.success(res.data.message);
            window.location.href = "/list_customer";
          }
        });
    } catch (error) {
      if (error.response.data.statusCode === 400) {
        setMessage(error.response.data.data);
      }
      console.log("data", data);
    }
  };

  const onDelete = async (e, id) => {
    try {
      console.log("id", id);
      await axios.delete(`${API_URL}/customer/delete_customer/${id}`).then((res) => {
        console.log("res", res);
        toast.success(res.data.message);
        window.location.href = "/list_customer";
      });
    } catch (error) {
      if (error.response.data.statusCode) {
        console.log(error.response.data.data);
      }
    }
  };

  useEffect(() => {
    getAllCustomerByID();
    getAllAddedAreas();
  }, []);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="container p-5">
        <h1 className="text-primary mb-4">UPDATE Customer</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group ">
            <label htmlFor="exampleInputEmail1">Customer ID</label>
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter Customer Id"
              defaultValue={customer.c_id}
              readOnly
              {...register("c_id", {
                required: "Customer ID must be filled.",
                pattern: {
                  value: /^[a-zA-Z0-9 ]*$/,
                  message: "Only letters and numbers are allowed.",
                },
              })}
            />
            {errors.c_id && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                {errors.c_id.message}
              </p>
            )}
          </div>

          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Full Name Location"
              defaultValue={customer.c_full_name}
              {...register("c_full_name", {
                required: "Full Name must be filled.",
                pattern: {
                  value: /^[a-zA-Z ]*$/,
                  message: "Only letters are allowed.",
                },
              })}
            />
            {errors.c_full_name && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                {errors.c_full_name.message}
              </p>
            )}
          </div>

          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1">Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Address"
              defaultValue={customer.c_address}
              {...register("c_address", {
                required: "Address must be filled.",
                pattern: {
                  value: /[A-Za-z0-9'\.\-\s\,]*$/,
                  message:
                    "Special characters, numbers, commas and spaces are allowed.",
                },
              })}
            />
            {errors.c_address && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                {errors.c_address.message}
              </p>
            )}
          </div>



          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1">Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Email"
              defaultValue={customer.c_email}
              {...register("c_email", {
                required: "Customer Email must be filled.",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invalid email address.",
                },
              })}
            />
            {errors.c_email && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                {errors.c_email.message}
              </p>
            )}
          </div>

          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1">Residenship</label>
            <select
              className="form-control dropdown-toggle"
              defaultValue={customer.c_residenship}
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

            {errors.c_residenship && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                {errors.c_residenship.message}
              </p>
            )}
          </div>

          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1">Area ID</label>
            <select
              className="form-control dropdown-toggle"
              defaultValue={customer.c_area_id}
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

            {errors.s_area_id && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                {errors.c_area_id.message}
              </p>
            )}
          </div>

          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1">Contact Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Customer Contact Number"
              defaultValue={customer.c_contact}
              {...register("c_contact", {
                required: "Customer Contact No must be filled.",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number.",
                },
              })}
            />
            {errors.c_contact && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                {errors.c_contact.message}
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
            className="btn btn-success mt-4"
            style={{ width: "100%" }}
          >
            Update
          </button>
        </form>
        <div className="row">
          <div className="col-6">
            <button
              type="submit"
              className="btn btn-danger mt-4"
              style={{ width: "100%" }}
              onClick={(e) => {
                if (
                  window.confirm(
                    `Are you sure you want to delete this ${customer.c_id}?`
                  )
                ) {
                  onDelete(e, customer.c_id);
                }
              }}
            >
              Delete
            </button>
          </div>

          <div className="col-6">
            <Link to={"/list_customer"}>
              <button
                type="submit"
                className="btn btn-primary mt-4"
                style={{ width: "100%" }}
              >
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAddCustomer;
