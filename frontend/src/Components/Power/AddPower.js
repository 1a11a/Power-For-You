import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NavBar from "../../Common/NavBar";
import axios from "axios";
import { API_URL } from "../../Data/API";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function AddPower() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [message, setMessage] = useState(null);

  const onSubmit = async (data) => {
    try {
      await axios.post(`${API_URL}/power/add_power`, data).then((response) => {
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

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="container p-5">
        <h1 className="text-primary mb-4">ADD NEW POWER</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group ">
            <label htmlFor="exampleInputEmail1">Power Sourse ID</label>
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter Power Id"
              {...register("ps_id", {
                required: "Power ID must be filled.",
                pattern: {
                  value: /^[a-zA-Z0-9 ]*$/,
                  message: "Only letters and numbers are allowed.",
                },
              })}
            />
            {errors.ps_id && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                {errors.ps_id.message}
              </p>
            )}
          </div>
          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1">Power Type</label>
            <select
              className="form-control dropdown-toggle"
              {...register("ps_type", {
                required: "Power Type must be selected.",
              })}
            >
              <option selected={true} disabled defaultValue="DEFAULT">
                Select Power Type
              </option>
              <option key={1} value={"Natural Gas"}>
                Natural Gas
              </option>
              <option key={2} value={"Nuclear Energy"}>
                Nuclear Energy
              </option>
              <option key={3} value={"Coal"}>
                Coal
              </option>
            </select>

            {errors.ps_type && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                {errors.ps_type.message}
              </p>
            )}
          </div>

          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1">Power Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Power Location"
              {...register("ps_location", {
                required: "Power Location must be filled.",
                pattern: {
                  value: /^[a-zA-Z0-9 ]*$/,
                  message: "Only letters and numbers are allowed.",
                },
              })}
            />
            {errors.ps_location && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                {errors.ps_location.message}
              </p>
            )}
          </div>

          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1">Power In-Charge</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Power Location"
              {...register("ps_in_charge", {
                required: "Powe In-Charge must be filled.",
                pattern: {
                  value: /^[a-zA-Z0-9 ]*$/,
                  message: "Only letters and numbers are allowed.",
                },
              })}
            />
            {errors.ps_in_charge && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                {errors.ps_in_charge.message}
              </p>
            )}
          </div>

          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1">No. Of Staff</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter No. Of Staff"
              {...register("ps_staff", {
                required: "Number of customer must be filled.",
                pattern: {
                  //only numbers
                  value: /^[0-9]*$/,
                  message: "Only numbers are allowed.",
                },
              })}
            />
            {errors.ps_staff && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                {errors.ps_staff.message}
              </p>
            )}
          </div>

          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1">Power Voltage</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Power Sources"
              {...register("ps_volt", {
                required: "Power voltage must be filled.",
                pattern: {
                  value: /^[a-zA-Z0-9 ]*$/,
                  message: "Only letters and numbers are allowed.",
                },
              })}
            />
            {errors.ps_volt && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                {errors.ps_volt.message}
              </p>
            )}
          </div>

          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1">Power Allocated Area</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Power Sources"
              {...register("ps_allo_area", {
                required: "Power aloocated area must be filled.",
                pattern: {
                  value: /^[a-zA-Z0-9 ]*$/,
                  message: "Only letters and numbers are allowed.",
                },
              })}
            />
            {errors.ps_allo_area && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
                {errors.ps_allo_area.message}
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
          <Link to={"/list_power"}>
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

export default AddPower;
