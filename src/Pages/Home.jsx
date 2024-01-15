import { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { FileCard, Filter, Navbar } from '../components';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filterValues, setFilterValues] = useState({
    search: '',
    type: '',
    language: '',
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);

      // Fetch interfaces
      const interfacesResponse = await axios.get('http://localhost:3001/interfaces/get-all');
      const interfacesData = interfacesResponse.data;

      // Fetch lined papers
      const linedPapersResponse = await axios.get('http://localhost:3001/linedPapers/get-all');
      const linedPapersData = linedPapersResponse.data;

      // Combine interfaces and lined papers into a single array
      const combinedData = [...interfacesData, ...linedPapersData];

      setData(combinedData);
      setFilteredData(combinedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  const handleFilterChange = (filterType, value) => {
    setFilterValues((prevValues) => ({ ...prevValues, [filterType]: value }));

    // Reset filters
    if (filterType === 'reset') {
      setFilterValues({ search: '', type: '', language: '' });
    }
  };

  useEffect(() => {
    const applyFilters = () => {
      let filteredResult = [...data];

      // Apply search filter
      if (filterValues.search) {
        const searchKeyword = filterValues.search.toLowerCase();
        filteredResult = filteredResult.filter(
          (item) => item.title.toLowerCase().includes(searchKeyword)
        );
      }

      // Apply type filter
      if (filterValues.type) {
        filteredResult = filteredResult.filter((item) => item.type === filterValues.type);
      }

      // Apply language filter
      if (filterValues.language) {
        filteredResult = filteredResult.filter((item) => item.language === filterValues.language);
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
        <Typography variant="h6">Loading...</Typography>
      ) : error ? (
        <Box>
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
        <FileCard data={filteredData} loading={loading} error={error} onRefresh={handleRefresh} />
      )}
    </Box>
  );
};

export default Home;
