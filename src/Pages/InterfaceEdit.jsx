import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Container,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
} from "@mui/material";
import axios from "axios";
import uniList from "../components/Main/AddFile/unList";

const InterfaceEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    university: "",
    language: "",
    downloadLinks: { word: "", pdf: "" },
    image: "",
    type: "interface",
  });
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://algeridoc.adaptable.app/interfaces/${id}`
        );
        setFormData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleCityChange = (city) =>
    setFormData({ ...formData, city, university: "" });

  const handleSubmit = async () => {
    try {
      await axios.put(
        `https://algeridoc.adaptable.app/interfaces/${id}`,
        formData
      );
      handleSnackbar("Edit successful");
    } catch (error) {
      console.error("Error updating data:", error);
      handleSnackbar("Error editing");
    }
  };

  const handleDelete = () => setConfirmationDialogOpen(true);

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://algeridoc.adaptable.app/interfaces/${id}`);
      setConfirmationDialogOpen(false);
      handleSnackbar("Deletion successful");
      navigate("/");
    } catch (error) {
      console.error("Error deleting data:", error);
      handleSnackbar("Error deleting");
    }
  };

  const handleSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={formData.title}
        onChange={(e) =>
          setFormData({ ...formData, title: e.target.value })
        }
        required
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        required
      />

      <Autocomplete
        options={uniList.map((uni) => uni.city)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="City"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
        )}
        value={formData.city}
        onChange={(_, newValue) => handleCityChange(newValue)}
      />

      <TextField
        label="University"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={formData.university}
        onChange={(e) =>
          setFormData({ ...formData, university: e.target.value })
        }
        autoComplete="off"
      />

      <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
        <InputLabel id="language-label">Language</InputLabel>
        <Select
          labelId="language-label"
          id="language"
          value={formData.language}
          label="Language"
          onChange={(e) =>
            setFormData({ ...formData, language: e.target.value })
          }
        >
          <MenuItem value="Arabic">Arabic</MenuItem>
          <MenuItem value="French">French</MenuItem>
          <MenuItem value="English">English</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="PDF Link"
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
        label="Word Link"
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
      />

      <TextField
        label="Image Link"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={formData.image}
        onChange={(e) =>
          setFormData({ ...formData, image: e.target.value })
        }
      />

      <Button
        variant="contained"
        color="error"
        onClick={handleDelete}
        sx={{ mt: 2, mr: 2 }}
      >
        Delete
      </Button>
      <Button variant="contained" color="success" onClick={handleSubmit}>
        Save Changes
      </Button>

      <Dialog
        open={confirmationDialogOpen}
        onClose={() => setConfirmationDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete {formData.title}?</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmationDialogOpen(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={
            snackbarMessage.includes("successful") ? "success" : "error"
          }
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default InterfaceEdit;
