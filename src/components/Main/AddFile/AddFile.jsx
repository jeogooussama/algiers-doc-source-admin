import { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InterfaceForm from "./InterfaceForm";
import LinedPaperForm from "./LinedPaperForm";

const AddFile = () => {
  const navigate = useNavigate();
  const [fileType, setFileType] = useState("interface");
  const [formData, setFormData] = useState({
    interface: {
      title: "",
      description: "",
      university: "",
      language: "",
      downloadLinks: {
        word: "",
        pdf: "",
      },
      image: "",
    },
    linedPaper: {
      title: "",
      description: "",
      downloadLinks: {
        word: "",
        pdf: "",
      },
      image: "",
    },
  });

  const handleTypeChange = (event) => {
    setFileType(event.target.value);
    setFormData({
      interface: {
        title: "",
        description: "",
        university: "",
        language: "",
        downloadLinks: {
          word: "",
          pdf: "",
        },
        image: "",
      },
      linedPaper: {
        title: "",
        description: "",
        downloadLinks: {
          word: "",
          pdf: "",
        },
        image: "",
      },
    });
  };

  const handleSubmit = async () => {
    try {
      const endpoint = fileType === "interface" ? "interfaces" : "linedPapers";
      const response = await axios.post(`https://algeridoc.adaptable.app/${endpoint}/`, {
        ...formData[fileType],
      });

      console.log("File added successfully:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error adding file:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <form action="./" method="post">
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="file-type-label">نوع الملف</InputLabel>
            <Select
              labelId="file-type-label"
              id="file-type"
              value={fileType}
              label="نوع الملف"
              onChange={handleTypeChange}
            >
              <MenuItem value="interface">واجهات</MenuItem>
              <MenuItem value="linedPaper">ورق مسطر</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="العنوان"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={formData[fileType].title}
            onChange={(e) =>
              setFormData({
                ...formData,
                [fileType]: {
                  ...formData[fileType],
                  title: e.target.value,
                },
              })
            }
            required
          />

          <TextField
            label="الوصف"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            sx={{ mb: 2 }}
            value={formData[fileType].description}
            onChange={(e) =>
              setFormData({
                ...formData,
                [fileType]: {
                  ...formData[fileType],
                  description: e.target.value,
                },
              })
            }
            required
          />

          {fileType === "interface" && (
            <InterfaceForm formData={formData} setFormData={setFormData} />
          )}

          {fileType === "linedPaper" && (
            <LinedPaperForm formData={formData} setFormData={setFormData} />
          )}

          <Button
            variant="contained"
            color="success"
            type="button"
            onClick={handleSubmit}
          >
            إضافة الملف
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddFile;
