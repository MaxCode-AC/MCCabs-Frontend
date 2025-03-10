import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CustomerPage() {
  const navigate = useNavigate(); // Hook to navigate between pages

  return (
    <>
      {/* Header */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Mega City Cab
          </Typography>
          <Button variant="contained" color="secondary">Logout</Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h3" gutterBottom>
          Welcome, Customer!
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Book your ride now and enjoy a comfortable journey.
        </Typography>

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large"
            onClick={() => navigate("/add-customer")} // Navigate to AddCustomer
          >
            Register
          </Button>
          <Button variant="contained" color="primary" size="large">
            Book Now
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ textAlign: "center", py: 2, bgcolor: "#f8f8f8", mt: 5 }}>
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()} Mega City Cab. All Rights Reserved.
        </Typography>
      </Box>
    </>
  );
}
