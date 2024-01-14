// EditLinedPaper.js
import { useState } from "react";
import { Container, Paper, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EditLinedPaper = ({ data }) => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    title: data?.title,
    description: data?.description,
    category: data.category,
    downloadLinks: {
      word: data.downloadLinks.word,
      pdf: data.downloadLinks.pdf,
    },
    image: data.image,
  });

  const handleSave = async () => {
    // Implement your logic to save the edited data to the server
    // ...

    // Redirect to the main page after editing the file
    history.push("/");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        {/* Form fields based on Lined Paper */}
        <TextField
          label="العنوان"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <TextField
          label="الوصف"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          sx={{ mb: 2 }}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <TextField
          label="الفئة"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        />
        <TextField
          label="رابط Word"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={formData.downloadLinks.word}
          onChange={(e) =>
            setFormData({
              ...formData,
              downloadLinks: {
                ...formData.downloadLinks,
                word: e.target.value,
              },
            })
          }
        />
        <TextField
          label="رابط PDF"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={formData.downloadLinks.pdf}
          onChange={(e) =>
            setFormData({
              ...formData,
              downloadLinks: { ...formData.downloadLinks, pdf: e.target.value },
            })
          }
        />
        <TextField
          label="رابط الصورة"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />

        <Button variant="contained" color="success" onClick={handleSave}>
          حفظ التعديلات
        </Button>
      </Paper>
    </Container>
  );
};

export default EditLinedPaper;
