import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Common/HomePage";
import AddCustomer from "./Components/Customer/AddCustomer";
import ListCustomer from "./Components/Customer/AllCustomerList";
import ViewAddCustomer from "./Components/Customer/ViewAddCustomer";
import AddPower from "./Components/Power/AddPower";
import ListPower from "./Components/Power/AllPowerList";
import ViewAddPower from "./Components/Power/ViewAddPower";


function App() {
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />


          <Route path="/add_power" element={<AddPower />} />
          <Route path="/list_power" element={<ListPower />} />
          <Route path="/view_add_power/:id" element={<ViewAddPower />} />


          <Route path="/add_customer" element={<AddCustomer />} />
          <Route path="/list_customer" element={<ListCustomer />} />
          <Route path="/view_add_customer/:id" element={<ViewAddCustomer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
