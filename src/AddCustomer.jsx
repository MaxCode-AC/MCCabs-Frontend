import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Container, Typography, Paper, Snackbar, Alert } from "@mui/material";

export default function AddCustomer() {
    const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    phone: "",
    nic: "",
  });
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false); // For Snackbar

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/customers", customer);
      setMessage("Customer added successfully!");
      setOpen(true); // Show success message
      setCustomer({ name: "", address: "", phone: "", nic: "" }); // Clear form
    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding customer");
      setOpen(true); // Show error message
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
          Register Now
        </Typography>
        {/* Back Button */}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate(-1)} // Navigate back
        sx={{ marginBottom: 2 }}
      >
        Back
      </Button>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={customer.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={customer.address}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Phone (07XXXXXXXX)"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="NIC"
            name="nic"
            value={customer.nic}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            REGISTER
          </Button>
          
        </form>
        
      </Paper>

      {/* Snackbar Notification */}
      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity={message.includes("successfully") ? "success" : "error"}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
