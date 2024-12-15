import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Stepper, Step, StepLabel } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [step, setStep] = useState(0); // Step 0: Grade Details, Step 1: Indemnities, Step 2: Retenues
  const { gradeId } = useParams();

  useEffect(() => {
    if (gradeId) {
      axios.get(`http://localhost:8080/api/grades/getGrade/${gradeId}`)
        .then((response) => {
          if (response.data.success && response.data.data.length > 0) {
            const fetchedData = response.data.data[0];
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
          }
        })
        .catch((error) => toast.error(`Erreur: ${error.message}`));
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

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handleBack = () => setStep((prevStep) => prevStep - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (gradeId) {
        await axios.put(`http://localhost:8080/api/grades/${gradeId}`, formData);
        toast.success('Le grade a été mis à jour avec succès.');
      } else {
        await axios.post('http://localhost:8080/api/grades', formData);
        toast.success('Le grade a été ajouté avec succès.');
      }
    } catch (error) {
      toast.error(`Erreur lors de la soumission: ${error.message}`);
    }
  };

  const steps = ['Détails du Grade', 'Indemnités', 'Retenues'];

  return (
    <Container maxWidth="sm">
      <ToastContainer position="bottom-right" />
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {gradeId ? 'Modifier le Grade' : 'Créer un Nouveau Grade'}
        </Typography>
        
        <Stepper activeStep={step} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit}>
          {step === 0 && (
            <>
              <TextField
                label="Code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Libellé"
                name="libelle"
                value={formData.libelle}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Niveau"
                name="niveau"
                value={formData.niveau}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Traitement de Base"
                name="traitementBase"
                type="number"
                value={formData.traitementBase}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </>
          )}
          
          {step === 1 && (
            <>
              <TextField
                label="Indemnité de Fonction"
                name="indemnites.indemniteFonction"
                type="number"
                value={formData.indemnites.indemniteFonction}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Indemnité de Tournee"
                name="indemnites.indemniteTournee"
                type="number"
                value={formData.indemnites.indemniteTournee}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Indemnité de Sujection"
                name="indemnites.indemniteSujection"
                type="number"
                value={formData.indemnites.indemniteSujection}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Indemnité de Representation"
                name="indemnites.indemniteRepresentation"
                type="number"
                value={formData.indemnites.indemniteRepresentation}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </>
          )}
          
          {step === 2 && (
            <>
              <TextField
                label="RCAR"
                name="retenue.rcar"
                type="number"
                value={formData.retenue.rcar}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="IGR"
                name="retenue.igr"
                type="number"
                value={formData.retenue.igr}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="AMO"
                name="retenue.amo"
                type="number"
                value={formData.retenue.amo}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="SM"
                name="retenue.sm"
                type="number"
                value={formData.retenue.sm}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            {step > 0 && (
              <Button variant="outlined" onClick={handleBack}>
                Retour
              </Button>
            )}
            {step < steps.length -1 ? (
              <Button variant="contained" onClick={handleNext}>
                Suivant
              </Button>
            ) : (
              <Button variant="contained" color="primary" type="submit">
                {gradeId ? 'Mettre à jour' : 'Enregistrer'}
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default GradeForm;
