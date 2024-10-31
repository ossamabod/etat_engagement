import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
  const [successMessage, setSuccessMessage] = useState('');
  const formRef = useRef(null);
  const { gradeId } = useParams(); // Get gradeId from URL parameters
  console.log("gradeId from URL:", gradeId);
  console.log("gradeId="+gradeId)
  useEffect(() => {
    if (gradeId) {
      axios.get(`http://localhost:8080/api/grades/getGrade/${gradeId}`)
        .then((response) => {
          if (response.data.success && response.data.data && response.data.data.length > 0) {
            const fetchedData = response.data.data[0];
  
            // Map the data to the expected structure
            setFormData({
              code: fetchedData.code,
              libelle: fetchedData.libelle,
              niveau: fetchedData.niveau,
              traitementBase: fetchedData.traitementBase,
              indemnites: {
                indemniteSujection: fetchedData.indemnites.indemniteSujection || '',
                indemniteFonction: fetchedData.indemnites.indemniteFonction || '',
                indemniteTournee: fetchedData.indemnites.indemniteTournee || '',
                indemniteRepresentation: fetchedData.indemnites.indemniteRepresentation || '',
              },
              retenue: {
                rcar: fetchedData.Retenue?.RCAR || '',
                igr: fetchedData.Retenue?.IGR || '',
                amo: fetchedData.Retenue?.AMO || '',
                sm: fetchedData.Retenue?.SM || '',
              },
            });
          } else {
            console.error("Grade not found or unexpected response:", response.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching grade data:', error);
        });
    }
  }, [gradeId]);
  

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
    setSuccessMessage('');

    let validationErrors = {};
    if (!formData.code.trim()) {
      validationErrors.code = 'Le code est obligatoire.';
    }
    if (!formData.libelle.trim()) {
      validationErrors.libelle = 'Le libellé est obligatoire.';
    }
    if (!formData.traitementBase || formData.traitementBase <= 0) {
      validationErrors.traitementBase = 'Le traitement de base doit être positif.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      scrollToTop();
      return;
    }

    try {
      if (gradeId) {
        await axios.put(`http://localhost:8080/api/grades/${gradeId}`, formData);
        setSuccessMessage('Le grade a été mis à jour avec succès.');
      } else {
        await axios.post('http://localhost:8080/api/grades', formData);
        setSuccessMessage('Le grade a été ajouté avec succès.');
      }

      scrollToTop();
      
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
      let errorMessage = 'Erreur lors de la soumission du Grade.';
      if (error.response && error.response.data) {
        errorMessage += ` Détails: ${error.response.data}`;
      }
      setErrors({ general: errorMessage });
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Container maxWidth="sm">
      <Box ref={formRef} sx={{ mt: 4 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          {gradeId ? 'Modifier le Grade' : 'Créer un Nouveau Grade'}
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
          {/* Other fields for indemnities */}

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
          {/* Other fields for retenues */}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 3 }}
          >
            {gradeId ? 'Mettre à jour' : 'Enregistrer'}
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default GradeForm;
