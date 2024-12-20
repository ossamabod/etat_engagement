import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Stepper, Step, StepLabel } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch ,useSelector } from 'react-redux';
import {  addGrade,fetchGrade } from '../../feature/Grade/GradeAction';
import { setGrade,updateGradeField } from '../../feature/Grade/GradeSlice';


function GradeForm() {
  const dispatch= useDispatch();
  const{Grade}= useSelector((state)=>state.Grade);

  const [step, setStep] = useState(0); 
  const { gradeId } = useParams();
  console.log("gradeId : "+ gradeId);
  
  useEffect(() => {
    if (gradeId) {
      console.log("gradeId:", gradeId);
      dispatch(fetchGrade({ gradeId }));
    }
  }, [gradeId, dispatch]);
  
  const handleChange=(e)=>{
        const{name,value}=e.target;
        dispatch(updateGradeField({name,value}))
  }

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handleBack = () => setStep((prevStep) => prevStep - 1);

  
  const handleSubmit =(e)=>{
      e.preventDefault();
     dispatch(addGrade({gradeId,Grade}))

  }

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
                value={Grade.code}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Libellé"
                name="libelle"
                value={Grade.libelle}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Niveau"
                name="niveau"
                value={Grade.niveau}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Traitement de Base"
                name="traitementBase"
                type="number"
                value={Grade.traitementBase}
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
                value={Grade.indemnites.indemniteFonction}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Indemnité de Tournee"
                name="indemnites.indemniteTournee"
                type="number"
                value={Grade.indemnites.indemniteTournee}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Indemnité de Sujection"
                name="indemnites.indemniteSujection"
                type="number"
                value={Grade.indemnites.indemniteSujection}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Indemnité de Representation"
                name="indemnites.indemniteRepresentation"
                type="number"
                value={Grade.indemnites.indemniteRepresentation}
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
                value={Grade.retenue.rcar}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="IGR"
                name="retenue.igr"
                type="number"
                value={Grade.retenue.igr}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="AMO"
                name="retenue.amo"
                type="number"
                value={Grade.retenue.amo}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="SM"
                name="retenue.sm"
                type="number"
                value={Grade.retenue.sm}
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
