import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider } from '@mui/material';
import './EtatEngagement.scss';
import axios from 'axios';

const EtatEngagement = () => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/Employee/1');
        setEmployee(response.data.data.content[0]); // Access the first element in the array
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, []);

  if (!employee) {
    return <div>Loading...</div>;
  }

  const calculateDifference = (newValue, oldValue = 0) => {
    return formatNumber(newValue - oldValue, 2);
  };

  const formatNumber = (num, precision = 2) => {
    return parseFloat(num).toFixed(precision);
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
          <Typography variant="body1"><strong>CIN:</strong> {employee.cin}</Typography>
          <Typography variant="body1"><strong>Concernant:</strong> {employee.nom} {employee.prenom}</Typography>
          <Typography variant="body1"><strong>Date de naissance:</strong> {formatDate(employee.dateNaissance)}</Typography>
          <Typography variant="body1"><strong>Grade:</strong> {employee.grade?.libelle || 'N/A'}</Typography>
          <Typography variant="body1"><strong>Situation de famille:</strong> {employee.situationFam}</Typography>
          <Typography variant="body1"><strong>Enfants à charge:</strong> {formatNumber(employee.nbEnfants, 0)}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1"><strong>Mutuelle:</strong> MG</Typography>
          <Typography variant="body1"><strong>Province:</strong> {employee.province}</Typography>
          <Typography variant="body1"><strong>Date d'effet:</strong> {formatDate(employee.dateEntree)}</Typography>
          <Typography variant="body1"><strong>Date Recrut:</strong> {formatDate(employee.dateRecrut)}</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        DECOMPTE ANNUEL COMPARE DES EMOLUMENTS
      </Typography>

      <TableContainer component={Paper}>
        <Table className="table-etatengagment">
          <TableHead>
            <TableRow>
              <TableCell>Nature des éléments modifiés</TableCell>
              <TableCell>Montant annuel Ancien</TableCell>
              <TableCell>Montant annuel Nouveau</TableCell>
              <TableCell>Différence</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Traitement de Base</TableCell>
              <TableCell>0.00</TableCell>
              <TableCell>{formatNumber(employee.grade?.traitementBase || 0, 2)}</TableCell>
              <TableCell>{calculateDifference(employee.grade?.traitementBase || 0)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>P.A {formatNumber(employee.Pa || 0, 0)} %</TableCell>
              <TableCell></TableCell>
              <TableCell>{formatNumber(employee.EtatEngagement?.[0]?.montantPA || 0, 2)}</TableCell>
              <TableCell>{calculateDifference(employee.EtatEngagement?.[0]?.montantPA || 0)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}><strong>Total</strong></TableCell>
              <TableCell>{formatNumber(employee.EtatEngagement?.[0]?.montantTotal || 0, 2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        ALLOCATIONS ET INDEMNITÉS
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Allocations Familiales</TableCell>
              <TableCell>{formatNumber(employee.EtatEngagement?.[0]?.allocationsFamiliales || 0, 2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Indemnité de Sujétion</TableCell>
              <TableCell>{formatNumber(employee.grade?.indemnites?.indemniteSujection || 0, 2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Indemnité de Fonction</TableCell>
              <TableCell>{formatNumber(employee.grade?.indemnites?.indemniteFonction || 0, 2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Indemnité de Tournée</TableCell>
              <TableCell>{formatNumber(employee.grade?.indemnites?.indemniteTournee || 0, 2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Indemnité de Représentation</TableCell>
              <TableCell>{formatNumber(employee.grade?.indemnites?.indemniteRepresentation || 0, 2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Emoluments Annuels Bruts
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Brut Mensuel</TableCell>
              <TableCell>{formatNumber(employee.EtatEngagement?.[0]?.brutMensuel || 0, 2)}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>RCAR</TableCell>
              <TableCell>{formatNumber(employee.grade?.Retenue?.RCAR || 0, 2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>IGR</TableCell>
              <TableCell>{formatNumber(employee.grade?.Retenue?.IGR || 0, 2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>AMO</TableCell>
              <TableCell>{formatNumber(employee.grade?.Retenue?.AMO || 0, 2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>SM</TableCell>
              <TableCell>{formatNumber(employee.grade?.Retenue?.SM || 0, 2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="body1" sx={{ mt: 2 }}>
        <strong>Net à ordonnancer:</strong> {formatNumber(employee.EtatEngagement?.[0]?.netAOrdonner || 0, 2)}
      </Typography>
    </Container>
  );
};

export default EtatEngagement;
