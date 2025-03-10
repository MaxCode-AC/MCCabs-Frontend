import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";

export default function LandingPage() {
  return (
    <>
      {/* Header */}
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
            {/* Logo on Right */}
         <Box sx={{ marginRight: 2 }}>
            <img 
              src="/image/2.jpg"  
              alt="Logo" 
              style={{ height: 100 }} 
            />
          </Box>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
             
            Mega City Cab
          </Typography>
          <Button color="inherit">About</Button>
          <Button color="inherit">Services</Button>
          <Button color="inherit">Contact</Button>
          <Button variant="contained" color="primary">Login</Button>
        
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Mega City Cab
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Reliable and comfortable cab services in Colombo. Book your ride today!
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Book Now
        </Button>
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
