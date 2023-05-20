import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../Data/API";
import NavBar from "../../Common/NavBar";
import { toast } from "react-toastify";

function ViewAddPower() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const params = useParams();

  const [message, setMessage] = useState(null);
  const [power, SetPower] = useState({
    ps_id: "",
    ps_type: "",
    ps_location: "",
    ps_in_charge: "",
    ps_staff: "",
    ps_volt: "",
    ps_allo_area: "",
  });

  const getAllPowerByID = async () => {
    try {
      await axios.get(`${API_URL}/power/get_power/${params.id}`).then((res) => {
        const getData = res.data.Data;
        console.log(getData);
        SetPower(getData);
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const onSubmit = async (data) => {
    try {
      const upData = {
        ps_id: data.ps_id,
        ps_type: data.ps_type,
        ps_location: data.ps_location,
        ps_in_charge: data.ps_in_charge,
        ps_staff: data.ps_staff,
        ps_volt: data.ps_volt,
        ps_allo_area: data.ps_allo_area,
      };

      console.log("upData", upData);
      await axios
        .put(`${API_URL}/power/updte_power/${params.id}`, upData)
        .then((res) => {
          if (res.data.code === 400) {
            setMessage(res.data.message);
          } else {
            console.log("data", data);
            toast.success(res.data.message);
            window.location.href = "/list_power";
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
      await axios.delete(`${API_URL}/power/delete_power/${id}`).then((res) => {
        console.log("res", res);
        toast.success(res.data.message);
        window.location.href = "/list_power";
      });
    } catch (error) {
      if (error.response.data.statusCode) {
        console.log(error.response.data.data);
      }
    }
  };

  useEffect(() => {
    getAllPowerByID();
  }, []);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="container p-5">
        <h1 className="text-primary mb-4">UPDATE AREA</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group ">
            <label htmlFor="exampleInputEmail1">Power Sourse ID</label>
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter Power Id"
              readOnly
              defaultValue={power.ps_id}
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
              defaultValue={power.ps_type}
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
              defaultValue={power.ps_location}
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
              defaultValue={power.ps_in_charge}
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
              defaultValue={power.ps_staff}
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
              defaultValue={power.ps_volt}
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
              defaultValue={power.ps_allo_area}
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
                    `Are you sure you want to delete this ${power.ps_id}?`
                  )
                ) {
                  onDelete(e, power.ps_id);
                }
              }}
            >
              Delete
            </button>
          </div>

          <div className="col-6">
            <Link to={"/list_power"}>
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

export default ViewAddPower;
