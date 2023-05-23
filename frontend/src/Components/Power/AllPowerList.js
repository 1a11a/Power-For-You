import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../Data/API";
import NavBar from "../../Common/NavBar";
import ViewButton from "../../assets/images/eye.png";

function ListPower() {
  const [loading, setLoading] = useState(false);
  const [power, GetPower] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const doc = new jsPDF("landscape");

  const getAllAddedPowers = async () => {
    try {
      await axios.get(`${API_URL}/power/get_power`).then((res) => {
        console.log("first", res.data.Data);
        GetPower(res.data.Data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const filteredData = power.filter((item) => {
    return Object.values(item)
      .join("")
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      power.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(power);
    }
  };

  const downloadReport = () => {
    doc.text("Added Power List", 30, 10);

    let array = [];
    power.map((st, index) => {
      let row = [];
      row.push(index + 1);
      row.push(st.pc_id);
      row.push(st.ps_type);
      row.push(st.ps_location);
      row.push(st.ps_in_charge);
      row.push(st.ps_staff);
      row.push(st.ps_volt);
      row.push(st.ps_allo_area);
      array.push(row);
      return row;
    });

    doc.autoTable({
      head: [
        [
          "No",
          "Power Id",
          "Power Type",
          "Power Location",
          "Power In Charge",
          "No. Of Staff",
          "Power Voltage",
          "Allocated Area",
        ],
      ],

      body: array,
    });

    doc.save("Power Source Report.pdf");
  };

  useEffect(() => {
    getAllAddedPowers();
  }, []);

  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div className="container p-0 mt-4 mb-5">
        <div className="row mt-3">
          <div className="col">
            <a href="/add_power">
              <span style={{ fontSize: "22px", fontWeight: "bold" }}>
                Add New Power
              </span>
            </a>
          </div>
        </div>
        <div className="row align-items-start mt-4">
          <div className="col-7">
            <h2 className="font-weight-bold">Power List</h2>
          </div>
          <div className="col" style={{ width: "100%" }}>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search..."
                style={{ width: "110%", border: "rounded-5" }}
                aria-label="Search"
                onChange={(e) => searchItems(e.target.value)}
              />
            </form>
          </div>
          <div className="col buttons2  ml-5 mr-0">
            <Link onClick={downloadReport} className="button_pdf">
              &nbsp;&nbsp;Download Report
            </Link>
          </div>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : searchInput.length > 1 ? (
          filteredResults.map((item, index) => {
            return (
              <table className="table" style={{ width: "100%" }}>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Power Id</th>
                    <th scope="col">Power Type</th>
                    <th scope="col">Power Location</th>
                    <th scope="col">Power In Charge</th>
                    <th scope="col">No. Of Staff</th>
                    <th scope="col">Power Voltage</th>
                    <th scope="col">Allocated Area</th>
                    <th scope="col">View</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={item.ps_id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.ps_id}</td>
                    <td>{item.ps_type}</td>
                    <td>{item.ps_location}</td>
                    <td>{item.ps_in_charge} </td>
                    <td>{item.ps_staff} </td>
                    <td>{item.ps_volt} </td>
                    <td>{item.ps_allo_area} </td>
                    <td>
                      <p>
                        <Link to={`/view_add_power/${item.ps_id}`}>
                          <img src={ViewButton} alt="" />
                        </Link>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })
        ) : power && power.length > 0 ? (
          <div className="row align-items-center mt-5 ">
            <div className="col">
              <table className="table" style={{ width: "100%" }}>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Power Id</th>
                    <th scope="col">Power Type</th>
                    <th scope="col">Power Location</th>
                    <th scope="col">Power In Charge</th>
                    <th scope="col">No. Of Staff</th>
                    <th scope="col">Power Voltage</th>
                    <th scope="col">Allocated Area</th>
                    <th scope="col">View</th>
                  </tr>
                </thead>
                <tbody>
                  {power.map((item, index) => (
                    <tr key={item.power_id}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.ps_id}</td>
                      <td>{item.ps_type}</td>
                      <td>{item.ps_location}</td>
                      <td>{item.ps_in_charge} </td>
                      <td>{item.ps_staff} </td>
                      <td>{item.ps_volt} </td>
                      <td>{item.ps_allo_area} </td>
                      <td>
                        <p>
                          <Link to={`/view_add_power/${item.ps_id}`}>
                            <img src={ViewButton} alt="" />
                          </Link>
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="not_found mt-4">
            Power List is not found at this moment. Please try again later.
            <br />
            <br />
          </div>
        )}
      </div>
    </div>
  );
}
export default ListPower;
