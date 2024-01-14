import { Container, Paper, TextField, Button, Stack, IconButton, Select, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import LanguageIcon from "@mui/icons-material/Language";
import RefreshIcon from "@mui/icons-material/Refresh";

const Filter = () => {
  const types = [
    { value: "option1", label: "الخيار 1", icon: "🔍" },
    { value: "option2", label: "الخيار 2", icon: "📁" },
    { value: "option3", label: "الخيار 3", icon: "📅" },
  ];

  const languages = [
    { value: "arabic", label: "العربية", icon: "🇦🇪" },
    { value: "french", label: "الفرنسية", icon: "🇫🇷" },
    { value: "english", label: "الإنجليزية", icon: "🇬🇧" },
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
          InputProps={{
            startAdornment: (
              <IconButton color="primary" aria-label="search">
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
        <Stack direction={{ xs: "column", sm: "column", md: "row" }} spacing={2}>
          <Select
            label="تصفية حسب النوع"
            variant="outlined"
            style={{ minWidth: 120, flexGrow: 1 }}
            startAdornment={
              <IconButton color="primary">
                <FilterListIcon />
              </IconButton>
            }
          >
            {types.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <Select
            label="تصفية حسب اللغة"
            variant="outlined"
            style={{ minWidth: 120, flexGrow: 1 }}
            startAdornment={
              <IconButton color="primary">
                <LanguageIcon />
              </IconButton>
            }
          >
            {languages.map((option) => (
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
        >
          إعادة تعيين
        </Button>
      </Paper>
    </Container>
  );
};

export default Filter;
