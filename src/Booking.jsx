import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, MenuItem, Grid, Container, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const BookingForm = () => {
  const [customers, setCustomers] = useState([]);
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    customerNic: "",
    carId: "",
    origin: "",
    destination: "",
    distance: "",
    bookingDate: dayjs(),
  });

  useEffect(() => {
    axios.get("http://localhost:8080/api/customers").then((res) => setCustomers(res.data));
    axios.get("http://localhost:8080/api/cars").then((res) => setCars(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, bookingDate: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/bookings", formData);
      alert("Booking successful!");
    } catch (error) {
      alert("Error creating booking");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Create Booking
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Customer NIC"
                name="customerNic"
                value={formData.customerNic}
                onChange={handleChange}
              >
                {customers.map((customer) => (
                  <MenuItem key={customer.nic} value={customer.nic}>
                    {customer.nic}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Car Model"
                name="carId"
                value={formData.carId}
                onChange={handleChange}
              >
                {cars.map((car) => (
                  <MenuItem key={car.id} value={car.id}>
                    {car.model} - ${car.price}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth label="Origin" name="origin" value={formData.origin} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Destination" name="destination" value={formData.destination} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth type="number" label="Distance (km)" name="distance" value={formData.distance} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <DatePicker label="Booking Date" value={formData.bookingDate} onChange={handleDateChange} fullWidth />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit Booking
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </LocalizationProvider>
  );
};

export default BookingForm;
