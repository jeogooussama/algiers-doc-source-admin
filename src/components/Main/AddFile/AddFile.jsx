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
      const response = await axios.post(
        `http://localhost:3001/${endpoint}/`,
        {
          ...formData[fileType],
        }
      );

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
            <>
              <TextField
                label="الجامعة"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={formData.interface.university}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    interface: {
                      ...formData.interface,
                      university: e.target.value,
                    },
                  })
                }
                required
              />
              <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                <InputLabel id="language-label">اللغة</InputLabel>
                <Select
                  labelId="language-label"
                  id="language"
                  value={formData.interface.language}
                  label="اللغة"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      interface: {
                        ...formData.interface,
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
          )}

          {fileType === "linedPaper" && (
            <>
              <TextField
                label="رابط Word"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={formData.linedPaper.downloadLinks.word}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    linedPaper: {
                      ...formData.linedPaper,
                      downloadLinks: {
                        ...formData.linedPaper.downloadLinks,
                        word: e.target.value,
                      },
                    },
                  })
                }
                required
              />
              <TextField
                label="رابط PDF"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={formData.linedPaper.downloadLinks.pdf}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    linedPaper: {
                      ...formData.linedPaper,
                      downloadLinks: {
                        ...formData.linedPaper.downloadLinks,
                        pdf: e.target.value,
                      },
                    },
                  })
                }
                required
              />
              <TextField
                label="رابط الصورة"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={formData.linedPaper.image}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    linedPaper: {
                      ...formData.linedPaper,
                      image: e.target.value,
                    },
                  })
                }
              />
            </>
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
