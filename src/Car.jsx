import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [carId, setCarId] = useState("");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ model: "", number: "", driverName: "", price: "" });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/cars");
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars", error);
    }
  };

  const fetchCarById = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/cars/${carId}`);
      setCars([response.data]);
    } catch (error) {
      alert("Car not found");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/cars/${id}`);
      fetchCars();
    } catch (error) {
      console.error("Error deleting car", error);
    }
  };

  const handleSave = async () => {
    try {
      if (formData.id) {
        await axios.put(`http://localhost:8080/api/cars/${formData.id}`, formData);
      } else {
        await axios.post("http://localhost:8080/api/cars", formData);
      }
      fetchCars();
      setOpen(false);
    } catch (error) {
      console.error("Error saving car", error);
    }
  };

  return (
    <Container>
      <h2>Car Management</h2>
      <TextField
        label="Enter Car ID"
        variant="outlined"
        value={carId}
        onChange={(e) => setCarId(e.target.value)}
        size="small"
      />
      <Button onClick={fetchCarById} variant="contained" color="primary" style={{ margin: 10 }}>
        Search
      </Button>
      <Button onClick={fetchCars} variant="contained" color="secondary" style={{ margin: 10 }}>
        View All
      </Button>
      <Button onClick={() => setOpen(true)} variant="contained" color="success" style={{ margin: 10 }}>
        Add Car
      </Button>

      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Driver</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.id}>
                <TableCell>{car.id}</TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.number}</TableCell>
                <TableCell>{car.driverName}</TableCell>
                <TableCell>{car.price}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => {
                      setFormData(car);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(car.id)}
                    style={{ marginLeft: 10 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{formData.id ? "Edit Car" : "Add Car"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Model"
            fullWidth
            margin="dense"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
          />
          <TextField
            label="Number"
            fullWidth
            margin="dense"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
          />
          <TextField
            label="Driver Name"
            fullWidth
            margin="dense"
            value={formData.driverName}
            onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
          />
          <TextField
            label="Price"
            fullWidth
            margin="dense"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CarManagement;
