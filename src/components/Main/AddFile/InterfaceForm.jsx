import { useState, useEffect } from "react";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import uniList from "./unList";

const InterfaceForm = ({ formData, setFormData }) => {
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [universitiesInSelectedCity, setUniversitiesInSelectedCity] = useState([]);

  useEffect(() => {
    // Set universities in the selected city when the city changes
    const universitiesForCity =
      formData.interface.city &&
      uniList.find((uni) => uni.city === formData.interface.city)?.universities;
    setUniversitiesInSelectedCity(universitiesForCity || []);

    // If there are universities in the selected city, set the first one
    if (universitiesForCity && universitiesForCity.length > 0) {
      setFormData({
        ...formData,
        interface: {
          ...formData.interface,
          university: universitiesForCity[0],
        },
      });
    }
  }, [formData.interface.city]);

  return (
    <>
      {/* City Select Option */}
      <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
        <InputLabel id="city-label">المدينة</InputLabel>
        <Select
          labelId="city-label"
          id="city"
          value={formData?.interface?.city || ""}
          label="المدينة"
          onChange={(e) =>
            setFormData({
              ...formData,
              interface: {
                ...formData?.interface,
                city: e.target.value,
              },
            })
          }
        >
          {uniList.map((uni, index) => (
            <MenuItem key={index} value={uni.city}>
              {index + 1}- {uni.city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* University Autocomplete */}
      <Autocomplete
        options={universitiesInSelectedCity}
        getOptionLabel={(option) => option}
        value={formData.interface.university || null}
        onChange={(_, newValue) =>
          setFormData({
            ...formData,
            interface: {
              ...formData.interface,
              university: newValue || "",
            },
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="الجامعة"
            variant="outlined"
            fullWidth
            required
          />
        )}
        sx={{ mb: 2 }}
      />

      {/* Other form fields */}
      <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
        <InputLabel id="language-label">اللغة</InputLabel>
        <Select
          labelId="language-label"
          id="language"
          value={formData?.interface?.language}
          label="اللغة"
          onChange={(e) =>
            setFormData({
              ...formData,
              interface: {
                ...formData?.interface,
                language: e.target.value,
              },
            })
          }
          required
        >
          <MenuItem value="arabic">العربية</MenuItem>
          <MenuItem value="french">الفرنسية</MenuItem>
          <MenuItem value="english">الإنجليزية</MenuItem>
        </Select>
      </FormControl>

      {/* Word Link TextField */}
      <TextField
        label="رابط Word"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={formData.interface.downloadLinks.word}
        onChange={(e) =>
          setFormData({
            ...formData,
            interface: {
              ...formData.interface,
              downloadLinks: {
                ...formData.interface.downloadLinks,
                word: e.target.value,
              },
            },
          })
        }
        required
      />

      {/* PDF Link TextField */}
      <TextField
        label="رابط PDF"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={formData.interface.downloadLinks.pdf}
        onChange={(e) =>
          setFormData({
            ...formData,
            interface: {
              ...formData.interface,
              downloadLinks: {
                ...formData.interface.downloadLinks,
                pdf: e.target.value,
              },
            },
          })
        }
      />

      {/* Image Link TextField */}
      <TextField
        label="رابط الصورة"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={formData.interface.image}
        onChange={(e) =>
          setFormData({
            ...formData,
            interface: {
              ...formData.interface,
              image: e.target.value,
            },
          })
        }
      />
    </>
  );
};

export default InterfaceForm;
