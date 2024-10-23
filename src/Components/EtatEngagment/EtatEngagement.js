import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider } from '@mui/material';
import './EtatEngagement.scss'; // Custom CSS
import axios from 'axios';

const EtatEngagement = () => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // Fetch employee data from the server
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/Employee/1'); // Adjust endpoint as needed
        setEmployee(response.data.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, []);

  if (!employee) {
    return <div>Loading...</div>;
  }

  // Helper function to calculate differences for salary comparison
  const calculateDifference = (newValue, oldValue = 0) => {
    return formatNumber(newValue - oldValue);
  };

  const formatNumber = (num,num2) => {
    return parseFloat(num).toFixed(num2);
  };
  const formatDate = (date) => {
    return date ? new Date(date).toISOString().slice(0, 10) : 'N/A';
  };


  return (
    <Container className="home-etat" sx={{ fontFamily: "'Poppins', sans-serif" }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ color: '#695cfe' }}>
        ETAT D'ENGAGEMENT
      </Typography>


      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" sx={{ color: 'var(--text-color)' }}><strong>CIN:</strong> {employee.cin}</Typography>
          <Typography variant="body1" sx={{ color: 'var(--text-color)' }}><strong>Concernant:</strong> {employee.nom} {employee.prenom}</Typography>
          <Typography variant="body1" sx={{ color: 'var(--text-color)' }}><strong>Date de naissance:</strong> {formatDate(employee.dateNaissance)}</Typography>
          <Typography variant="body1" sx={{ color: 'var(--text-color)' }}><strong>Grade:</strong> {employee.grade?.libelle || 'N/A'}</Typography>
          <Typography variant="body1" sx={{ color: 'var(--text-color)' }}><strong>Situation de famille:</strong> {employee.situationFam}</Typography>
          <Typography variant="body1" sx={{ color: 'var(--text-color)' }}><strong>Enfants à charge:</strong> {formatNumber(employee.nbEnfants,0)}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" sx={{ color: 'var(--text-color)' }}><strong>Mutuelle:</strong> MG</Typography>
          <Typography variant="body1" sx={{ color: 'var(--text-color)' }}><strong>Province:</strong> {employee.province}</Typography>
          <Typography variant="body1" sx={{ color: 'var(--text-color)' }}><strong>Date d'effet:</strong> {formatDate(employee.dateEntree)}</Typography>
          <Typography variant="body1" sx={{ color: 'var(--text-color)' }}><strong>Date Recrut:</strong> {formatDate(employee.dateRecrut)}</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, borderColor: 'var(--primary-color)' }} />

      <Typography variant="h5" gutterBottom sx={{ color: 'var(--primary-color)' }}>
        DECOMPTE ANNUEL COMPARE DES EMOLUMENTS
      </Typography>

      <TableContainer component={Paper} sx={{ 
          backgroundColor: 'var(--primary-color-light)',
          marginTop: '0px',  // Remove margin at the top
          paddingTop: '0px'  // Remove padding at the top
        }}>
        <Table className="table-etatengagment table-bordered table-hover dt-responsive">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'var(--text-color)' }}>Nature des éléments modifiés</TableCell>
              <TableCell sx={{ color: 'var(--text-color)' }}>Montant annuel Ancien</TableCell>
              <TableCell sx={{ color: 'var(--text-color)' }}>Montant annuel Nouveau</TableCell>
              <TableCell sx={{ color: 'var(--text-color)' }}>Différence</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ color: 'var(--text-color)' }}>Traitement de Base</TableCell>
              <TableCell sx={{ color: 'var(--text-color)' }}>0.00</TableCell>
              <TableCell sx={{ color: 'var(--text-color)' }}>{formatNumber(employee.grade?.traitementBase || 0,2)}</TableCell>
              <TableCell sx={{ color: 'var(--text-color)' }}>{calculateDifference(employee.grade?.traitementBase || 0,2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ color: 'var(--text-color)' }}>P.A  {formatNumber(employee.pa,0)}  %</TableCell>
              <TableCell sx={{ color: 'var(--text-color)' }}></TableCell>
              <TableCell sx={{ color: 'var(--text-color)' }}>{formatNumber(employee.etatEngagement?.[0]?.montantPA || 0,2)}</TableCell>
              <TableCell sx={{ color: 'var(--text-color)' }}>{calculateDifference(employee.etatEngagement?.[0]?.montantPA || 0,2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}><strong>Total</strong></TableCell>
              <TableCell sx={{ color: 'var(--text-color)' }}>{formatNumber(employee.etatEngagement?.[0]?.montantTotal || 0,2)}</TableCell>
              
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom sx={{ mt: 4, color: 'var(--primary-color)' }}>
        ALLOCATIONS ET INDEMNITÉS
      </Typography>

      <TableContainer component={Paper} sx={{ backgroundColor: 'var(--primary-color-light)' }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell sx={{ color: 'var(--text-color)' }}>Allocations Familiales</TableCell>
              <TableCell sx={{ color: 'var(--text-color)' }}>{formatNumber(employee.etatEngagement?.[0]?.allocationsFamiliales || 0,2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ color: 'var(--text-color)' }}>Indemnité de Sujétion (Zone)</TableCell>
              <TableCell sx={{ color: 'var(--text-color)' }}>{formatNumber(employee.grade?.indemnites?.indemniteSujection || 0,2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ color: 'var(--text-color)' }}>Indemnité de fonction</TableCell>
              <TableCell sx={{ color: 'var(--text-color)' }}>{formatNumber(employee.grade?.indemnites?.indemniteFonction || 0,2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ color: 'var(--text-color)' }}>Indemnité de tournée</TableCell>
              <TableCell sx={{ color: 'var(--text-color)' }}>{formatNumber(employee.grade?.indemnites?.indemniteTournee || 0,2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom sx={{ mt: 4, color: 'var(--primary-color)' }}>
        Emoluments Annuels Bruts
      </Typography>

      <TableContainer component={Paper} sx={{ backgroundColor: 'var(--primary-color-light)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'var(--text-color)' }}>Brut Mensuel</TableCell>
              <TableCell sx={{ color: 'var(--text-color)' }}>{formatNumber(employee.etatEngagement?.[0]?.brutMensuel || 0,2)}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ color: 'var(--text-color)' }}>RCAR</TableCell>
              <TableCell sx={{ color: 'var(--text-color)' }}>{formatNumber(employee.grade?.retenue?.rcar || 0,2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ color: 'var(--text-color)' }}>AMO</TableCell>
              <TableCell sx={{ color: 'var(--text-color)' }}>{formatNumber(employee.grade?.retenue?.amo || 0,2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ color: 'var(--text-color)' }}>SM</TableCell>
              <TableCell sx={{ color: 'var(--text-color)' }}>{formatNumber(employee.grade?.retenue?.sm || 0,2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ color: 'var(--text-color)' }}>IGR</TableCell>
              <TableCell sx={{ color: 'var(--text-color)' }}>{formatNumber(employee.grade?.retenue?.igr || 0,2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body1" sx={{ mt: 2, color: 'var(--text-color)' }}>
        <strong>Net à ordonnancer:</strong> {formatNumber(employee.etatEngagement?.[0]?.netAOrdonner,2) || 0}
      </Typography>
    
   
    </Container>
  );
};

export default EtatEngagement;
