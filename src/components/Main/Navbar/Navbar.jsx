import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" color="success">
      <Toolbar sx={{ justifyContent: "space-between",flexDirection:"row-reverse"}}>
        <Box display={"flex"} gap={3}>
          <Button component={Link} to="/" variant="outlined" color="inherit">
            الرئيسية
          </Button>
          <Button component={Link} to="/add" variant="outlined" color="inherit">
            إضافة
          </Button>
        </Box>
        <Typography variant="h6">AlgeriaDocs</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
