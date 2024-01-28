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
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import uniList from "../components/Main/AddFile/unList";

const InterfaceEdit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "", // New field for city
    university: "", // Only university, without city
    language: "",
    downloadLinks: {
      word: "",
      pdf: "",
    },
    image: "",
    type: "interface",
  });

  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/interfaces/${id}`
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);
  useEffect(() => {
    // If the city is selected and universities exist for that city
    if (formData.city && uniList.some((uni) => uni.city === formData.city)) {
      // Set university to the first university in the list
      const firstUniversity =
        uniList.find((uni) => uni.city === formData.city)?.universities[0] ||
        "";
      setFormData((prevData) => ({ ...prevData, university: firstUniversity }));
    }
  }, [formData.city]);
  const handleSubmit = async () => {
    try {
      const url = `http://localhost:3001/interfaces/${id}`;
      await axios.put(url, formData);
      setSnackbarMessage("Edit successful");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating data:", error);
      setSnackbarMessage("Error editing");
      setSnackbarOpen(true);
    }
  };

  const handleDelete = () => {
    setConfirmationDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const url = `http://localhost:3001/interfaces/${id}`;
      await axios.delete(url);
      setConfirmationDialogOpen(false);
      setSnackbarMessage("Deletion successful");
      setSnackbarOpen(true);
      navigate("/");
    } catch (error) {
      console.error("Error deleting data:", error);
      setSnackbarMessage("Error deleting");
      setSnackbarOpen(true);
    }
  };

  const cancelDelete = () => {
    setConfirmationDialogOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Common Form fields */}
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <TextField
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        sx={{ mb: 2 }}
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        required
      />

      {/* City Select Option */}
      <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
        <InputLabel id="city-label">المدينة</InputLabel>
        <Select
          labelId="city-label"
          id="city"
          value={formData?.city || ""}
          label="المدينة"
          onChange={(e) =>
            setFormData({
              ...formData,
              city: e.target.value,
            })
          }
        >
          {uniList.map((uni, index) => (
            <MenuItem key={index} value={uni.city}>
              {index + 1}-{uni.city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* University Autocomplete */}
      <Autocomplete
        options={
          formData.city
            ? uniList.find((uni) => uni.city === formData.city)?.universities ||
              []
            : []
        }
        getOptionLabel={(option) => option}
        value={formData.university}
        onChange={(_, newValue) =>
          setFormData({ ...formData, university: newValue })
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

      {/* Form fields specific to Interface */}
      {formData.type === "interface" && (
        <TextField
          label="Interface Language"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={formData.language}
          onChange={(e) =>
            setFormData({ ...formData, language: e.target.value })
          }
          required
        />
      )}

      {/* Common Form fields */}
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
        required
      />
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
        label="Image Link"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={formData.image}
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
      />

      {/* Delete Button */}
      <Button
        variant="contained"
        color="error"
        type="button"
        onClick={handleDelete}
        sx={{ mt: 2, mr: 2 }}
      >
        Delete
      </Button>

      {/* Save Changes Button */}
      <Button
        variant="contained"
        color="success"
        type="button"
        onClick={handleSubmit}
      >
        Save Changes
      </Button>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmationDialogOpen} onClose={cancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete {formData.title}?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for edit and delete feedback */}
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
