import { useState } from 'react';
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
    // Simple validation check
    if (
      (fileType === 'interface' &&
        (!formData.title ||
          !formData.description ||
          !formData.university ||
          !formData.language ||
          !formData.downloadLinks.word)) ||
      (fileType === 'linedPaper' &&
        (!formData.title ||
          !formData.description ||
          !formData.university ||
          !formData.downloadLinks.word))
    ) {
      // If required fields are not filled, don't submit
      alert('من فضلك تاكد من ملء جميع الفراغات');
      return;
    }

    // Implement your logic to save the data to the server based on fileType
    // ...

    // Redirect to the main page after adding the file
    history.push('/');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <form>
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

          {/* Form fields based on fileType */}
          <TextField
            label="العنوان"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
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
            required
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
                required
              />
              <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                <InputLabel id="language-label">اللغة</InputLabel>
                <Select
                  labelId="language-label"
                  id="language"
                  value={formData.language}
                  label="اللغة"
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
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
                value={formData.downloadLinks.word}
                onChange={(e) =>
                  setFormData({ ...formData, downloadLinks: { ...formData.downloadLinks, word: e.target.value } })
                }
                required
              />
              <TextField
                label="رابط PDF"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={formData.downloadLinks.pdf}
                onChange={(e) =>
                  setFormData({ ...formData, downloadLinks: { ...formData.downloadLinks, pdf: e.target.value } })
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
                required
              />
              <TextField
                label="رابط Word"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={formData.downloadLinks.word}
                onChange={(e) =>
                  setFormData({ ...formData, downloadLinks: { ...formData.downloadLinks, word: e.target.value } })
                }
                required
              />
              <TextField
                label="رابط PDF"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={formData.downloadLinks.pdf}
                onChange={(e) =>
                  setFormData({ ...formData, downloadLinks: { ...formData.downloadLinks, pdf: e.target.value } })
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
            </>
          )}

          <Button variant="contained" color="success" type="button" onClick={handleSubmit}>
            إضافة الملف
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddFile;
