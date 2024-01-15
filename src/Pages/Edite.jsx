import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, TextField } from '@mui/material';
import axios from 'axios';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    type: '', // Add type to identify the model type (interface or linedPaper)
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data based on the id
        const interfaceResponse = await axios.get(`http://localhost:3001/interfaces/get/${id}`);
        const fetchedInterfaceData = interfaceResponse.data;
        setFormData(fetchedInterfaceData);
      } catch (interfaceError) {
        console.error('Error fetching interface data:', interfaceError);
        // If data is not found as an interface, try fetching as lined paper
        try {
          const linedPaperResponse = await axios.get(`http://localhost:3001/linedPapers/get/${id}`);
          const fetchedLinedPaperData = linedPaperResponse.data;
          setFormData(fetchedLinedPaperData);
        } catch (linedPaperError) {
          console.error('Error fetching lined paper data:', linedPaperError);
          // If both attempts fail, you can set a default state or handle it as needed
        }
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    try {
      // Perform update logic based on the formData
      const url = formData.type === 'interface'
        ? `http://localhost:3001/interfaces/update/${id}`
        : `http://localhost:3001/linedPapers/update/${id}`;

      await axios.put(url, formData);

      // Redirect to the main page after updating the file
      navigate('/');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Common Form fields */}
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

      {/* Form fields specific to Interface */}
      {formData.type === 'interface' && (
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
          <TextField
            label="لغة الواجهة"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={formData.language}
            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            required
          />
        </>
      )}

      {/* Form fields specific to Lined Paper */}
      {formData.type === 'linedPaper' && (
        <>
          {/* If you removed the category field, no need to display it here */}
        </>
      )}

      {/* Common Form fields */}
      <TextField
        label="رابط Word"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={formData.downloadLinks.word}
        onChange={(e) =>
          setFormData({
            ...formData,
            downloadLinks: { ...formData.downloadLinks, word: e.target.value },
          })
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

      <Button variant="contained" color="success" type="button" onClick={handleSubmit}>
        حفظ التعديلات
      </Button>
    </Container>
  );
};

export default Edit;
