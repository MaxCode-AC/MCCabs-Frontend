import React from "react";
import { AppBar, Toolbar, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication tokens or session data (if needed)
    console.log("Logged out!");
    navigate("/login"); // Redirect to login page
  };

  return (
    <Box>
      {/* Header */}
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Admin Dashboard</Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome, Admin!
        </Typography>
        <Box display="flex" justifyContent="center" gap={2} mt={3}>
          <Button 
          
          variant="contained" color="primary" onClick={() => navigate("/CustomerManage")}>
            Customers
          </Button>
          <Button variant="contained" color="secondary" onClick={() => navigate("/orders")}>
            Orders
          </Button>
          <Button variant="contained" color="success" onClick={() => navigate("/Car")}>
            Cars
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
