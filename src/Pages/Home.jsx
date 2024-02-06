import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { FileCard, Filter, Navbar } from "../components";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filterValues, setFilterValues] = useState({
    search: "",
    type: "",
    language: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);

      const interfacesResponse = await axios.get(
        "https://algiridocsapi.onrender.com/interfaces/"
      );
      const interfacesData = interfacesResponse.data;

      const linedPapersResponse = await axios.get(
        "https://algiridocsapi.onrender.com/linedPapers/"
      );
      const linedPapersData = linedPapersResponse.data;

      const combinedData = [...interfacesData, ...linedPapersData];

      setData(combinedData);
      setFilteredData(combinedData);
    } catch (error) {
      console.error("Error fetching data:", error);

      // Check for network errors
      if (axios.isAxiosError(error) && !error.response) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("Error loading files.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  const handleFilterChange = (filterType, value) => {
    setFilterValues((prevValues) => ({ ...prevValues, [filterType]: value }));
  };

  useEffect(() => {
    const applyFilters = () => {
      let filteredResult = [...data];

      // Apply search filter
      if (filterValues.search) {
        const searchKeyword = filterValues.search.toLowerCase();
        filteredResult = filteredResult.filter((item) =>
          item.title.toLowerCase().includes(searchKeyword)
        );
      }

      // Apply type filter
      if (filterValues.type) {
        if (filterValues.type === "interfaces") {
          filteredResult = filteredResult.filter(
            (item) => item.type === "interface"
          );
        } else if (filterValues.type === "LinedPapers") {
          filteredResult = filteredResult.filter(
            (item) => item.type === "linedpaper"
          );
        }
      }

      // Apply language filter
      if (filterValues.language) {
        filteredResult = filteredResult.filter(
          (item) => item.language === filterValues.language
        );
      }

      setFilteredData(filteredResult);
    };

    applyFilters();
  }, [filterValues, data]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <Navbar />
      <Filter onFilterChange={handleFilterChange} />
      {loading ? (
        <Typography sx={{m:4, textAlign:"center"}} variant="h6">Loading...</Typography>
      ) : error ? (
        <Box sx={{m:4, justifyContent:"center",alignItems:"center" ,display:"flex" ,flexDirection:"column"}}>
          <Typography variant="h6" color="error">
            Error loading files.
          </Typography>
          <Button variant="contained" color="warning" onClick={handleRefresh}>
            Refresh
          </Button>
        </Box>
      ) : filteredData?.length === 0 ? (
        <Typography variant="h6">No files found</Typography>
      ) : (
        <FileCard
          data={filteredData}
          loading={loading}
          error={error}
          onRefresh={handleRefresh}
        />
      )}
    </Box>
  );
};

export default Home;
