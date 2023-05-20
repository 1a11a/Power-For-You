import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../Data/API";
import NavBar from "../../Common/NavBar";
import ViewButton from "../../assets/images/eye.png";

function ListCustomer() {
  const [loading, setLoading] = useState(false);
  const [customer, Getcustomer] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const doc = new jsPDF("landscape");

  const getAllAddedCustomers = async () => {
    try {
      await axios.get(`${API_URL}/customer/get_customer`).then((res) => {
        console.log("first", res.data.Data);
        Getcustomer(res.data.Data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const filteredData = customer.filter((item) => {
    return Object.values(item)
      .join("")
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      customer.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(customer);
    }
  };

  const downloadReport = () => {
    doc.text("Added Customer List", 30, 10);

    let array = [];
    customer.map((st, index) => {
      let row = [];
      row.push(index + 1);
      row.push(st.c_id);
      row.push(st.c_full_name);
      row.push(st.c_address);
      row.push(st.c_email);
      row.push(st.c_residenship);
      row.push(st.c_area_id);
      row.push(st.c_contact);
      array.push(row);
      return row;
    });

    doc.autoTable({
      head: [
        [
          "No",
          "Customer Id",
          "Full Name",
          "Address",
          "Email",
          "Residenship",
          "Area Id",
          "Contact No",
        ],
      ],

      body: array,
    });

    doc.save("Customer Report.pdf");
  };

  useEffect(() => {
    getAllAddedCustomers();
  }, []);

  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div className="container p-0 mt-4 mb-5">
        <div className="row mt-3">
          <div className="col">
            <a href="/add_customer">
              <span style={{ fontSize: "22px", fontWeight: "bold" }}>
                Add New Customer
              </span>
            </a>
          </div>
        </div>
        <div className="row align-items-start mt-4">
          <div className="col-7">
            <h2 className="font-weight-bold">Customer List</h2>
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
                    <th scope="col">Customer Id</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Email</th>
                    <th scope="col">Residenship</th>
                    <th scope="col">Area Id</th>
                    <th scope="col">Contact No</th>
                    <th scope="col">View</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={item.c_id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.c_id}</td>
                    <td>{item.c_full_name}</td>
                    <td>{item.c_address}</td>
                    <td>{item.c_email} </td>
                    <td>{item.c_residenship} </td>
                    <td>{item.c_area_id} </td>
                    <td>{item.c_contact} </td>
                    <td>
                      <p>
                        <Link to={`/view_add_customer/${item.c_id}`}>
                          <img src={ViewButton} alt="" />
                        </Link>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })
        ) : customer && customer.length > 0 ? (
          <div className="row align-items-center mt-5 ">
            <div className="col">
              <table className="table" style={{ width: "100%" }}>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Customer Id</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Email</th>
                    <th scope="col">Residenship</th>
                    <th scope="col">Area Id</th>
                    <th scope="col">Contact No</th>
                    <th scope="col">View</th>
                  </tr>
                </thead>
                <tbody>
                  {customer.map((item, index) => (
                    <tr key={item.c_id}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.c_id}</td>
                      <td>{item.c_full_name}</td>
                      <td>{item.c_address}</td>
                      <td>{item.c_email} </td>
                      <td>{item.c_residenship} </td>
                      <td>{item.c_area_id} </td>
                      <td>{item.c_contact} </td>
                      <td>
                        <p>
                          <Link to={`/view_add_customer/${item.c_id}`}>
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
            Customer List is not found at this moment. Please try again later.
            <br />
            <br />
          </div>
        )}
      </div>
    </div>
  );
}
export default ListCustomer;
