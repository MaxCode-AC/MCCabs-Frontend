import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddCustomer from "./AddCustomer";
import Admin from "./Admin";
import CustomerManage from "./CustomerManage";
import Car from "./Car";

function App() {
  return (           
    <Router>
      <Routes>
        {/* Admin page as the default (first) page */}
        <Route path="/" element={<Admin />} />

        {/* Route for Customer Page */}
        <Route path="/CustomerManage" element={<CustomerManage />} />

        {/* Route for Adding Customer */}
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/Car" element={<Car />} />
      </Routes>
    </Router>
  );
}

export default App;
