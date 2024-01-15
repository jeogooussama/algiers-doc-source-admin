import { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Stack,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import LanguageIcon from "@mui/icons-material/Language";
import RefreshIcon from "@mui/icons-material/Refresh";

// ... (your imports)

const Filter = ({ onFilterChange }) => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [language, setLanguage] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    onFilterChange("search", event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
    onFilterChange("type", event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    onFilterChange("language", event.target.value);
  };

  const handleReset = () => {
    setSearch("");
    setType("");
    setLanguage("");
    onFilterChange("reset");
  };

  const typeOptions = [
    { value: "interfaces", label: "الواجهات" },
    { value: "LinedPapers", label: "الورق المخطط" },
  ];

  const languageOptions = [
    { value: "arabic", label: "العربية" },
    { value: "french", label: "الفرنسية" },
    { value: "english", label: "الإنجليزية" },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          alignItems: "center",
        }}
      >
        <TextField
          label="البحث"
          variant="outlined"
          placeholder="ابحث هنا"
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <IconButton color="primary" aria-label="search">
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
        <Stack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={2}
        >
          <Select
            label="تصفية حسب النوع"
            variant="outlined"
            style={{ minWidth: 120, flexGrow: 1 }}
            value={type}
            onChange={handleTypeChange}
            startAdornment={
              <IconButton color="primary">
                <FilterListIcon />
              </IconButton>
            }
          >
            {typeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <Select
            label="تصفية حسب اللغة"
            variant="outlined"
            style={{ minWidth: 120, flexGrow: 1 }}
            value={language}
            onChange={handleLanguageChange}
            startAdornment={
              <IconButton color="primary">
                <LanguageIcon />
              </IconButton>
            }
          >
            {languageOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        <Button
          variant="contained"
          color="warning"
          startIcon={<RefreshIcon />}
          sx={{ width: "100%", maxWidth: 200 }}
          onClick={handleReset}
        >
          إعادة تعيين
        </Button>
      </Paper>
    </Container>
  );
};
export default Filter;
