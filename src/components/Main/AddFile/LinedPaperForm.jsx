import { TextField } from "@mui/material";

const LinedPaperForm = ({ formData, setFormData }) => {
  return (
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
  );
};

export default LinedPaperForm;
