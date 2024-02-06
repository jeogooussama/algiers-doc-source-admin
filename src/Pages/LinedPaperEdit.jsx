import  { useEffect, useState } from "react";
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
} from "@mui/material";
import axios from "axios";

const LinedPaperEdit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    downloadLinks: {
      word: "",
      pdf: "",
    },
    image: "",
    type: "linedpaper",
  });

  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigte = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://algiridocsapi.onrender.com/linedPapers/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const url = `https://algiridocsapi.onrender.com/linedPapers/${id}`;
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
      const url = `https://algiridocsapi.onrender.com/linedPapers/${id}`;
      await axios.delete(url);
      setConfirmationDialogOpen(false);
      setSnackbarMessage("Deletion successful");
      setSnackbarOpen(true);
      navigte('/')
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
          severity={snackbarMessage.includes("successful") ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LinedPaperEdit;
