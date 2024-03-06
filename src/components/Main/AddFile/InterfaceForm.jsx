import { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import uniList from "./unList";

const InterfaceForm = ({ formData, setFormData }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Extract distinct city names from uniList
    const distinctCities = [...new Set(uniList.map((uni) => uni.city))];
    setCities(distinctCities);
  }, []);

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
                ...formData.interface,
                city: e.target.value,
              },
            })
          }
        >
          {cities.map((city, index) => (
            <MenuItem key={index} value={city}>
              {index+1}-{city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* University Text Field */}
      <TextField
        label="الجامعة"
        variant="outlined"
        fullWidth
        value={formData.interface.university || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            interface: {
              ...formData.interface,
              university: e.target.value,
            },
          })
        }
        sx={{ mb: 2 }}
        autoComplete="off"
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
