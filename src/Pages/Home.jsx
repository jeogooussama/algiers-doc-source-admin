import { Box } from "@mui/material";
import {  FileCard, Filter, Navbar } from "../components";


const Home = () => {
    return (
      <Box >
        <Navbar />
        <Filter />
        <FileCard/>
      </Box>
    );
  };

export default Home