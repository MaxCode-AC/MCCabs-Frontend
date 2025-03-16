import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CustomerPage() {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Mega City Cab
          </Typography>
          <Button variant="contained" color="secondary">Logout</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h3" gutterBottom>
          Welcome, Customer!
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large"
            onClick={() => navigate("/add-customer")} // Navigate to AddCustomer
          >
            Register
          </Button>
          <Button variant="contained" color="primary" size="large"
         onClick={() => navigate("/Booking")} // Navigate to AddCustomer
         
         >
            Book Now
          </Button>
        </Box>
      </Container>
    </>
  );
}
