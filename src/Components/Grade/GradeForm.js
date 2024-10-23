import React, { useState, useRef } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
  Box,
} from '@mui/material';

function GradeForm() {
  const [formData, setFormData] = useState({
    code: '',
    libelle: '',
    niveau: '',
    traitementBase: '',
    indemnites: {
      indemniteSujection: '',
      indemniteFonction: '',
      indemniteTournee: '',
      indemniteRepresentation: '',
    },
    retenue: {
      rcar: '',
      igr: '',
      amo: '',
      sm: '',
    },
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(''); // For showing success message

  const formRef = useRef(null); // Reference to the form container

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split('.');

    if (section === 'indemnites' || section === 'retenue') {
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage(''); // Clear success message on new submission
  
    // Basic validation (adapt as needed)
    let validationErrors = {};
    if (!formData.code.trim()) {
      validationErrors.code = 'Le code est obligatoire.';
    }
    if (!formData.libelle.trim()) {
      validationErrors.libelle = 'Le libellé est obligatoire.';
    }
    if (!formData.traitementBase || formData.traitementBase <= 0) {
      validationErrors.traitementBase =
        'Le traitement de base doit être positif.';
    }
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      scrollToTop(); // Scroll to the top when errors are present
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8080/api/grades', formData);
      setSuccessMessage('Le grade a été ajouté avec succès.');

      scrollToTop(); // Scroll to the top when submission is successful
  
      // Reset form after successful submission
      setFormData({
        code: '',
        libelle: '',
        niveau: '',
        traitementBase: '',
        indemnites: {
          indemniteSujection: '',
          indemniteFonction: '',
          indemniteTournee: '',
          indemniteRepresentation: '',
        },
        retenue: {
          rcar: '',
          igr: '',
          amo: '',
          sm: '',
        },
      });
    } catch (error) {
      let errorMessage = 'Erreur lors de la création du Grade.';
  
      if (error.response && error.response.data) {
        errorMessage += ` Détails: ${error.response.data}`;
      }
      setErrors({ general: errorMessage });
      scrollToTop(); // Scroll to the top when there's an error
    }
  };

  const scrollToTop = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Container maxWidth="sm">
      <Box ref={formRef} sx={{ mt: 4 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Créer un Nouveau Grade
        </Typography>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        {errors.general && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.general}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.code)}
            helperText={errors.code}
            sx={{ input: { backgroundColor: 'white' } }} 
          />
          <TextField
            label="Libellé"
            name="libelle"
            value={formData.libelle}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.libelle)}
            helperText={errors.libelle}
            sx={{ input: { backgroundColor: 'white' } }} 
          />
          <TextField
            label="Niveau"
            name="niveau"
            value={formData.niveau}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.niveau)}
            helperText={errors.niveau}
            sx={{ input: { backgroundColor: 'white' } }} 
          />
          <TextField
            label="Traitement de Base"
            name="traitementBase"
            type="number"
            value={formData.traitementBase}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={Boolean(errors.traitementBase)}
            helperText={errors.traitementBase}
            sx={{ input: { backgroundColor: 'white' } }} 
          />

          {/* Indemnités Section */}
          <Typography variant="h6" component="h3" gutterBottom>
            Indemnités
          </Typography>
          <TextField
            label="Indemnité de Sujection"
            name="indemnites.indemniteSujection"
            type="number"
            value={formData.indemnites.indemniteSujection}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ input: { backgroundColor: 'white' } }} 
          />
          <TextField
            label="Indemnité de Fonction"
            name="indemnites.indemniteFonction"
            type="number"
            value={formData.indemnites.indemniteFonction}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ input: { backgroundColor: 'white' } }} 
          />
          <TextField
            label="Indemnité de Tournée"
            name="indemnites.indemniteTournee"
            type="number"
            value={formData.indemnites.indemniteTournee}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ input: { backgroundColor: 'white' } }} 
          />
          <TextField
            label="Indemnité de Représentation"
            name="indemnites.indemniteRepresentation"
            type="number"
            value={formData.indemnites.indemniteRepresentation}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ input: { backgroundColor: 'white' } }} 
          />

          {/* Retenues Section */}
          <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
            Retenues
          </Typography>
          <TextField
            label="RCAR"
            name="retenue.rcar"
            type="number"
            value={formData.retenue.rcar}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ input: { backgroundColor: 'white' } }} 
          />
          <TextField
            label="IGR"
            name="retenue.igr"
            type="number"
            value={formData.retenue.igr}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ input: { backgroundColor: 'white' } }} 
          />
          <TextField
            label="AMO"
            name="retenue.amo"
            type="number"
            value={formData.retenue.amo}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ input: { backgroundColor: 'white' } }} 
          />
          <TextField
            label="SM"
            name="retenue.sm"
            type="number"
            value={formData.retenue.sm}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ input: { backgroundColor: 'white' } }} 
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 3 }}
          >
            Enregistrer
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default GradeForm;
