// src/pages/AddFile.js
import  { useState } from 'react';
import { Container, Paper, TextField, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddFile = () => {
  const history = useNavigate();
  const [fileType, setFileType] = useState('interface');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    university: '',
    language: '',
    downloadLinks: {
      word: '',
      pdf: '',
    },
    image: '',
  });

  const handleTypeChange = (event) => {
    setFileType(event.target.value);
    setFormData({
      title: '',
      description: '',
      university: '',
      language: '',
      downloadLinks: {
        word: '',
        pdf: '',
      },
      image: '',
    });
  };

  const handleSubmit = async () => {
    // Implement your logic to save the data to the server based on fileType
    // ...

    // Redirect to the main page after adding the file
    history.push('/');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="file-type-label">نوع الملف</InputLabel>
          <Select
            labelId="file-type-label"
            id="file-type"
            value={fileType}
            label="نوع الملف"
            onChange={handleTypeChange}
          >
            <MenuItem value="interface">Interfaces</MenuItem>
            <MenuItem value="linedPaper">Lined Paper</MenuItem>
          </Select>
        </FormControl>

        {/* Form fields based on fileType */}
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
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        {fileType === 'interface' && (
          <>
            <TextField
              label="الجامعة"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={formData.university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
            />
            <TextField
              label="اللغة"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            />
            <TextField
              label="رابط Word"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={formData.downloadLinks.word}
              onChange={(e) => setFormData({ ...formData, downloadLinks: { ...formData.downloadLinks, word: e.target.value } })}
            />
            <TextField
              label="رابط PDF"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={formData.downloadLinks.pdf}
              onChange={(e) => setFormData({ ...formData, downloadLinks: { ...formData.downloadLinks, pdf: e.target.value } })}
            />
            <TextField
              label="رابط الصورة"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </>
        )}

        {fileType === 'linedPaper' && (
          <>
            <TextField
              label="الفئة"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={formData.university}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
            <TextField
              label="رابط Word"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={formData.downloadLinks.word}
              onChange={(e) => setFormData({ ...formData, downloadLinks: { ...formData.downloadLinks, word: e.target.value } })}
            />
            <TextField
              label="رابط PDF"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={formData.downloadLinks.pdf}
              onChange={(e) => setFormData({ ...formData, downloadLinks: { ...formData.downloadLinks, pdf: e.target.value } })}
            />
            <TextField
              label="رابط الصورة"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </>
        )}

        <Button variant="contained" color="success" onClick={handleSubmit}>
          إضافة الملف
        </Button>
      </Paper>
    </Container>
  );
};

export default AddFile;
