import React from "react";
import '../assets/css/Homepage.css'
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div
        className="d-flex flex-wrap align-items-cente ml-5"
        style={{
          marginTop: "100px",
        }}
      >
        <Link to={"/list_area"} className="ml-4">
          <div className="m-3 card" style={{ width: "20rem", height: "25rem" }}>
            <img
              src="https://freepngimg.com/download/map/62873-map-computer-location-icon-icons-free-transparent-image-hd.png"
              className="card-img"
              alt="img"
            />
            <h2>Area</h2>
          </div>
        </Link  >
        <Link to={"/list_customer"} className="ml-4">
          <div className="m-3 card" style={{ width: "20rem", height: "25rem" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4814/4814961.png"
              className="card-img"
              alt="img"
            />
            <h2>Customer</h2>
          </div>
        </Link>

        <Link to={"/list_power"} className="ml-4">
          <div className="m-3 card" style={{ width: "20rem", height: "25rem" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3256/3256107.png"
              className="card-img"
              alt="img"
            />
            <h2>Power</h2>
          </div>
        </Link>
        <Link to={"/list_staff"} className="ml-4">
          <div className="m-3 card" style={{ width: "20rem", height: "25rem" }}>
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/free-office-staff-9-1184344.png?f=webp&w=256"
              className="card-img"
              alt="img"
            />
            <h2>Staff</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default HomePage;
