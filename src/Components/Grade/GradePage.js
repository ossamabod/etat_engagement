import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  TablePagination,
} from '@mui/material';
import { useDispatch , useSelector } from 'react-redux';
import { fetchingGrades } from '../../feature/Grade/GradeAction';

export default function GradePage() {
  const {Grades, Grade}=useSelector((state)=>state.Grade )
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [filteredGrades, setFilteredGrades] = useState([]); // Grades filtered by search
  const [searchTerm, setSearchTerm] = useState(''); // Search input
  const [page, setPage] = useState(0); // Pagination: current page
  const [rowsPerPage, setRowsPerPage] = useState(8); // Pagination: rows per page

  // Fetch all grades on component mount
  useEffect(() => {
        dispatch(fetchingGrades);
        console.log("grades are fetched:"+Grades.length);
  }, []);
  useEffect(() => {
    // Set filtered grades when Grades state updates
    setFilteredGrades(Grades);
  }, [Grades]);
  

  // Handle search input change
  const handleSearchChange = (event) => {
  
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    setPage(0); // Reset to first page on new search

    // Filter grades by 'libelle' based on search term
    const filtered = Grades.filter((Grade) =>
      console.log("Grades are : " + Grade.libelle),
      Grade.libelle.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredGrades(filtered);
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleEdit = (gradeId) => {
    navigate(`/edit-grade/${gradeId}`);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, color: 'var(--text-color)' }}>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        sx={{ color: 'var(--primary-color)' }}
      >
        Gestion des Grades
      </Typography>

      <TextField
        label="Recherche par libellé"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ backgroundColor: 'white' }}
      />

      {filteredGrades.length > 0 ? (
        <Paper elevation={3} sx={{ backgroundColor: 'var(--sidebar-color)', color: 'var(--text-color)' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Code</strong></TableCell>
                <TableCell><strong>Libellé</strong></TableCell>
                <TableCell><strong>Niveau</strong></TableCell>
                <TableCell><strong>Traitement de Base</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredGrades.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((Grade) => (
                <TableRow key={Grade.id} sx={{ '&:hover': { backgroundColor: 'var(--primary-color-light)' } }}>
                  <TableCell>{Grade.code}</TableCell>
                  <TableCell>{Grade.libelle}</TableCell>
                  <TableCell>{Grade.niveau}</TableCell>
                  <TableCell>{Grade.traitementBase}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ backgroundColor: 'var(--primary-color)', color: 'var(--sidebar-color)', mr: 1 }}
                      onClick={() => handleEdit(Grade.id)}
                    >
                      Editer
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ backgroundColor: 'var(--primary-color)', color: 'var(--sidebar-color)' }}
                    
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[8, 16, 24]}
            component="div"
            count={filteredGrades.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ mt: 2 }}
          />
        </Paper>
      ) : (
        <Typography variant="body1" sx={{ color: 'var(--text-color)' }}>
          Aucun grade disponible.
        </Typography>
      )}
    </Container>
  );
}
