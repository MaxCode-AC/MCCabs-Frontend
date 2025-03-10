import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, 
  Paper, Typography
} from "@mui/material";

const CustomerManage = () => {
  const [customers, setCustomers] = useState([]);
  const [nic, setNic] = useState("");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", address: "", phone: "", nic: "" });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers", error);
    }
  };

  const fetchCustomerByNic = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/customers/${nic}`);
      setCustomers([response.data]);
    } catch (error) {
      alert("Customer not found");
    }
  };

  const handleDelete = async (nic) => {
    try {
      await axios.delete(`http://localhost:8080/api/customers/${nic}`);
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer", error);
    }
  };

  const handleSave = async () => {
    try {
      if (formData.nic) {
        await axios.put(`http://localhost:8080/api/customers/${formData.nic}`, formData);
      } else {
        await axios.post("http://localhost:8080/api/customers", formData);
      }
      fetchCustomers();
      setOpen(false);
    } catch (error) {
      console.error("Error saving customer", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>Customer Management</Typography>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <TextField 
          label="Enter NIC" 
          variant="outlined" 
          value={nic} 
          onChange={(e) => setNic(e.target.value)} 
        />
        <Button variant="contained" color="primary" onClick={fetchCustomerByNic}>Search</Button>
        <Button variant="contained" color="secondary" onClick={fetchCustomers}>View All</Button>
        <Button variant="contained" color="success" onClick={() => setOpen(true)}>Add Customer</Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>NIC</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.nic}>
                <TableCell>{customer.nic}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="warning" 
                    onClick={() => { setFormData(customer); setOpen(true); }}
                  >Edit</Button>
                  <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => handleDelete(customer.nic)}
                    style={{ marginLeft: "10px" }}
                  >Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{formData.nic ? "Edit Customer" : "Add Customer"}</DialogTitle>
        <DialogContent>
          <TextField 
            label="NIC" 
            fullWidth 
            margin="dense" 
            variant="outlined" 
            value={formData.nic} 
            onChange={(e) => setFormData({ ...formData, nic: e.target.value })} 
            disabled={!!formData.nic} 
          />
          <TextField 
            label="Name" 
            fullWidth 
            margin="dense" 
            variant="outlined" 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          />
          <TextField 
            label="Address" 
            fullWidth 
            margin="dense" 
            variant="outlined" 
            value={formData.address} 
            onChange={(e) => setFormData({ ...formData, address: e.target.value })} 
          />
          <TextField 
            label="Phone" 
            fullWidth 
            margin="dense" 
            variant="outlined" 
            value={formData.phone} 
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Close</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomerManage;
