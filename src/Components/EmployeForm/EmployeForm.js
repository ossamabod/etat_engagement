import React, { useState, useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns'; // Import date formatting library
import { ToastContainer } from 'react-toastify'; // Import toast library
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { fetchEmployee,saveEmployee } from '../../feature/Employee/EmployeeAction';
import { fetchGrades } from '../../feature/Grade/GradeAction';
import { useDispatch ,useSelector } from 'react-redux';


import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
  Box,
  Alert,
  CircularProgress,
  
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { updateEmployeeField , updateChildren, setEmployee} from '../../feature/Employee/EmployeeSlice';

const regionsData = {
  "Région de Tanger-Tétouan-Al Hoceïma": [
    "Préfecture de Tanger-Assilah",
    "Préfecture de M'diq-Fnideq",
    "Province de Tétouan",
    "Province de Fahs-Anjra",
    "Province de Larache",
    "Province d'Al Hoceïma",
    "Province de Chefchaouen",
    "Province d'Ouezzane"
  ],
  "Région de l'Oriental": [
    "Préfecture d'Oujda-Angad",
    "Province de Nador",
    "Province de Driouch",
    "Province de Jerada",
    "Province de Berkane",
    "Province de Taourirt",
    "Province de Guercif",
    "Province de Figuig"
  ],
  "Région de Fès-Meknès": [
    "Préfecture de Fès",
    "Préfecture de Meknès",
    "Province d’El Hajeb",
    "Province d’Ifrane",
    "Province de Moulay Yaâcoub",
    "Province de Séfrou",
    "Province de Boulemane",
    "Province de Taounate",
    "Province de Taza"
  ],
  "Région de Dakhla-Oued Ed Dahab": [
    "Province d'Oued Ed Dahab",
    "Province d'Aousserd"
  ],
  "Région de Casablanca-Settat": [
    "Préfecture de Casablanca",
    "Préfecture de Mohammédia",
    "Province d'El Jadida",
    "Province de Nouaceur",
    "Province de Médiouna",
    "Province de Benslimane",
    "Province de Berrechid",
    "Province de Settat",
    "Province de Sidi Bennour"
  ]
};



export default function EmployeeForm() {
  
  const dispatch= useDispatch();
  const{Employee,isSpouseFormVisible,children,message,grades ,isLoading}= useSelector((state)=>state.Employee);


  const { employeeId } = useParams(); 
  // const [Employee, setEmployee] = useState({
  //   cin: '',
  //   nom: '',
  //   prenom: '',
  //   dateNaissance: '',
  //   lieuNaissance: '',
  //   sexe: '',
  //   adresse: '',
  //   ville: '',
  //   dateEntree: '',
  //   avancement: '',
  //   grade: '',
  //   diplome: '',
  //   affectation: '',
  //   nivInst: '',
  //   situationFam: '',
  //   nbEnfants: 0,
  //   codeService: '',
  //   adresseFam: '',
  //   tel: '',
  //   observations: '',
  //   age: '',
  //   banque: '',
  //   numeroCompte: '',
  //   budget: '',
  //   dp: '',
  //   conjoint: {  // Initialize with empty values
  //     nom: '',
  //     prenom: '',
  //     profession: ''
  //   },
  //   region: '', 
  //   province: '',
  //   grade:{
  //     libelle:''
  //   }
  // });
  // const [grades, setGrades] = useState([]); // Array for storing grades from backend
  // const [children, setChildren] = useState([]); // Array for children information
  // const [isSpouseFormVisible, setIsSpouseFormVisible] = useState(false);
  // const [isChildFormVisible, setIsChildFormVisible] = useState(false);
  // const [message, setMessage] = useState(null);
  // const [isLoading, setIsLoading] = useState(false); 
  
  // useEffect(() => {
  //   if (employeeId) {
  //     setIsLoading(true); 
  //     axios.get(`http://localhost:8080/Employee/${employeeId}`)
  //       .then(response => {
  //         console.log('response:'+response);
  //         const { data, success } = response.data;
  //         if (success && data) {
  //           const employeeData = data.content[0];
            
  //           const formattedDateNaissance = employeeData.dateNaissance
  //             ? format(new Date(employeeData.dateNaissance), 'yyyy-MM-dd')
  //             : '';
  //           const formattedDateEntree = employeeData.dateEntree
  //             ? format(new Date(employeeData.dateEntree), 'yyyy-MM-dd')
  //             : '';
  
  //           setEmployee({
  //             ...employeeData,
  //             dateNaissance: formattedDateNaissance,
  //             dateEntree: formattedDateEntree,
  //             region: employeeData.region || '',
  //             province: employeeData.province || '',
  //             conjoint: employeeData.conjoint || { nom: '', prenom: '', profession: '' },
  //             grade: employeeData.grade || { id: '', libelle: '' },
  //           });
  
  //           setIsSpouseFormVisible(employeeData.situationFam !== 'Célibataire');
  
  //           if (employeeData.nbEnfants && employeeData.nbEnfants > 0) {
  //             const formattedEnfants = (employeeData.enfants || []).map(enfant => ({
  //               ...enfant,
  //               dateNaissance: enfant.dateNaissance ? format(new Date(enfant.dateNaissance), 'yyyy-MM-dd') : ''
  //             }));
  //             setChildren(formattedEnfants);
  //           } else {
  //             setChildren([]);
  //           }
  
  //         } else {
  //           console.error('Employee not found or unexpected response:', response.data);
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error fetching employee data:', error.message);
  //         if (error.response) {
  //           console.error('Server responded with:', error.response.data);
  //         } else if (error.request) {
  //           console.error('No response received:', error.request);
  //         }
  //       })
  //       .finally(() => {
  //         setIsLoading(false); 
  //       });
  //   }
  // }, [employeeId]);
  useEffect(() => {
    if (employeeId) {
      dispatch(fetchEmployee(employeeId));
    }
    dispatch(fetchGrades());
  }, [employeeId, dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateEmployeeField({ field: name, value }));
  };
  const handleChildChange = (index, event) => {
    const { name, value } = event.target;
    const updatedChildren = [...children];
    updatedChildren[index][name] = value;
    dispatch(updateChildren(updatedChildren));
  };



  // useEffect(() => {
  //   async function fetchGrades() {
  //     try {
  //       const response = await axios.get('http://localhost:8080/api/grades/getGrade');
  //       if (response.data && response.data.success) {
  //         setGrades(response.data.data); // response.data.data contains the array of grades
  //       } else {
  //         console.error('Unexpected response structure:', response);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching grades:', error);
  //     }
  //   }
  
  //   fetchGrades();
  // }, []);
  

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  
  //   if (name.startsWith('conjoint')) {
  //     const [_, field] = name.split('.'); // Split on the period to get the field name after 'conjoint'
  //     setEmployee(prevEmployee => ({
  //       ...prevEmployee,
  //       conjoint: {
  //         ...prevEmployee.conjoint,
  //         [field]: value
  //       }
  //     }));
  //   } else {
  //     setEmployee(prevEmployee => ({
  //       ...prevEmployee,
  //       [name]: value
  //     }));
  //   }
  
  //   if (name === 'situationFam') {
  //     setIsSpouseFormVisible(value !== 'Célibataire');
  //   }
  
  //   if (name === 'nbEnfants') {
  //     const newNbEnfants = parseInt(value) || 0;
  //     // Adjust the children array based on the number of children
  //     if (newNbEnfants !== children.length) {
  //       setChildren(Array(newNbEnfants).fill().map(() => ({
  //         nom: '',
  //         prenom: '',
  //         sexe: '',
  //         dateNaissance: '',
  //         aCharge: false
  //       })));
  //     }
  //   }
  // };
  

  // const handleChildChange = (index, event) => {
  //   const { name, value } = event.target;
  //   const updatedChildren = [...children];
  //   updatedChildren[index][name] = value;
  //   setChildren(updatedChildren);
  // };
  const handleRegionChange = (event) => {
    setEmployee(prevEmployee => ({
      ...prevEmployee,
      region: event.target.value,
      province: '' // Réinitialiser la province lorsque la région change
    }));
  };

  const handleProvinceChange = (event) => {
    setEmployee(prevEmployee => ({
      ...prevEmployee,
      province: event.target.value
    }));
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setIsLoading(true);
  
  //   try {
  //     const employeeData = {
  //       ...Employee,
  //       grade: { id: Employee.grade },
  //       conjoint: isSpouseFormVisible ? {
  //         nom: Employee.conjoint?.nom,
  //         prenom: Employee.conjoint?.prenom,
  //         profession: Employee.conjoint?.profession
  //       } : null,
  //       enfants: children
  //     };
  
  //     let response;
  //     if (employeeId) {
  //       response = await axios.put(`http://localhost:8080/Employee/${employeeId}`, employeeData);
  //       toast.success('Employé mis à jour avec succès !');
  //     } else {
  //       response = await axios.post('http://localhost:8080/Employee', employeeData);
  //       toast.success('Employé créé avec succès !');
  //       setEmployee({
  //         cin: '',
  //         nom: '',
  //         prenom: '',
  //         dateNaissance: '',
  //         lieuNaissance: '',
  //         sexe: '',
  //         adresse: '',
  //         ville: '',
  //         dateEntree: '',
  //         avancement: '',
  //         grade: '',
  //         diplome: '',
  //         affectation: '',
  //         nivInst: '',
  //         situationFam: 'Célibataire',
  //         nbEnfants: 0,
  //         conjoint: {  // Initialize with empty values
  //           nom: '',
  //           prenom: '',
  //           profession: ''
  //         },
  //         codeService: '',
  //         adresseFam: '',
  //         tel: '',
  //         observations: '',
  //         age: '',
  //         banque: '',
  //         numeroCompte: '',
  //         budget: '',
  //         dp: '',
  //         region: '', 
  //         province: ''
  //       });
  //       setChildren([]);
  //     }
  //   } catch (error) {
  //     toast.error('Erreur: Impossible de sauvegarder l\'employé.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    const employeeData = {
      ...Employee,
      grade: { id: Employee.grade },
      conjoint: isSpouseFormVisible
        ? {
            nom: Employee.conjoint?.nom,
            prenom: Employee.conjoint?.prenom,
            profession: Employee.conjoint?.profession,
          }
        : null,
      enfants: children,
    };
    dispatch(saveEmployee({ employeeData, employeeId }));
  };
  return (
    <Container maxWidth="md">
          <ToastContainer position="bottom-right" /> {/* Add the ToastContainer */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          {employeeId ? 'Modifier l\'Employé' : 'Ajouter un Employé'}
        </Typography>
        {message && (
          <Alert severity={message.startsWith('Erreur') ? 'error' : 'success'} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          {/* Basic Employee Info */}
          <Box sx={{ mb: 2 }}>
            <TextField
              label="CIN"
              name="cin"
              value={Employee.cin}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              sx={{ input: { backgroundColor: 'white' } }} 
            />
            <TextField
              label="N° D.P"
              name="dp"
              value={Employee.dp}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              sx={{ input: { backgroundColor: 'white' } }} 
            />
            <TextField
              label="Nom"
              name="nom"
              value={Employee.nom}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              sx={{ input: { backgroundColor: 'white' } }} 
            />
            <TextField
              label="Prénom"
              name="prenom"
              value={Employee.prenom}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
               sx={{ input: { backgroundColor: 'white' } }} 
            />
            <TextField
              label="Date de Naissance"
              name="dateNaissance"
              type="date"
              value={Employee.dateNaissance}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
              sx={{ input: { backgroundColor: 'white' } }} 
            />
            <TextField
              label="Lieu de Naissance"
              name="lieuNaissance"
              value={Employee.lieuNaissance}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              sx={{ input: { backgroundColor: 'white' } }} 
            />


          <TextField
            label="Grade"
            name="grade"
            value={Employee.grade ? Employee.grade.id : ''} // Ensure grade is properly set
            onChange={handleChange}
            select
            fullWidth
            margin="normal"
            required
            sx={{
              '.MuiSelect-select': { backgroundColor: 'white' },
              '.MuiOutlinedInput-root': { backgroundColor: 'white' },
            }}
          >
            {grades.map((grade) => (
              <MenuItem key={grade.id} value={grade.id}>
                {grade.libelle}
              </MenuItem>
            ))}
              </TextField>
             {/* Sélection de la région et de la province */}
        <TextField
          label="Région"
          name="region"
          value={Employee.region}
          onChange={handleRegionChange}
          select
          fullWidth
          margin="normal"
          required
          sx={{ 
            '.MuiSelect-select': { backgroundColor: 'white' }, 
            '.MuiOutlinedInput-root': { backgroundColor: 'white' } 
          }} 
        >
          {Object.keys(regionsData).map((region) => (
            <MenuItem key={region} value={region}>
              {region}
            </MenuItem>
          ))}
        </TextField>
        {Employee.region && (
        <TextField
          label="Province"
          name="province"
          value={Employee.province}
          onChange={handleProvinceChange}
          select
          fullWidth
          margin="normal"
          required
          sx={{
            '.MuiSelect-select': { backgroundColor: 'white' },
            '.MuiOutlinedInput-root': { backgroundColor: 'white' },
          }}
        >
          {regionsData[Employee.region].map((province) => (
            <MenuItem key={province} value={province}>
              {province}
            </MenuItem>
          ))}
        </TextField>
      )}
            <TextField
              label="Sexe"
              name="sexe"
              value={Employee.sexe}
              onChange={handleChange}
              select
              fullWidth
              margin="normal"
              required
              sx={{ 
                '.MuiSelect-select': { backgroundColor: 'white' }, // Targets the select input area
                '.MuiOutlinedInput-root': { backgroundColor: 'white' } // Ensures the whole input has white background
              }} 
            >
              <MenuItem value="M">Masculin</MenuItem>
              <MenuItem value="F">Féminin</MenuItem>
            </TextField>
          </Box>

          {/* Family and Contact Info */}
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Adresse"
              name="adresse"
              value={Employee.adresse}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              sx={{ input: { backgroundColor: 'white' } }} 
            />
            <TextField
              label="Ville"
              name="ville"
              value={Employee.ville}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              sx={{ input: { backgroundColor: 'white' } }} 
            />
            <TextField
              label="Date d'Entrée"
              name="dateEntree"
              type="date"
              value={Employee.dateEntree}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
              sx={{ input: { backgroundColor: 'white' } }} 
            />
          </Box>

          {/* Situation Familiale */}
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Situation Familiale"
              name="situationFam"
              value={Employee.situationFam}
              onChange={handleChange}
              select
              fullWidth
              margin="normal"
              required
              sx={{ 
                '.MuiSelect-select': { backgroundColor: 'white' }, // Targets the select input area
                '.MuiOutlinedInput-root': { backgroundColor: 'white' } // Ensures the whole input has white background
              }} 
            >
              <MenuItem value="Célibataire">Célibataire</MenuItem>
              <MenuItem value="Marié">Marié</MenuItem>
              <MenuItem value="Divorcé">Divorcé</MenuItem>
              <MenuItem value="Veuf">Veuf</MenuItem>
            </TextField>
          </Box>


          {isSpouseFormVisible && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Informations sur le Conjoint</Typography>
            <TextField
              label="Nom du Conjoint"
              name="conjoint.nom"
              value={Employee.conjoint.nom}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{ input: { backgroundColor: 'white' } }} 
            />
            <TextField
              label="Prénom du Conjoint"
              name="conjoint.prenom"
              value={Employee.conjoint.prenom}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{ input: { backgroundColor: 'white' } }} 
            />
            <TextField
              label="Profession du Conjoint"
              name="conjoint.profession"
              value={Employee.conjoint.profession}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{ input: { backgroundColor: 'white' } }} 
            />
          </Box>
        )}

          <Box sx={{ mb: 2 }}>
            <TextField
              label="Nombre d'Enfants"
              type="number"
              name="nbEnfants"
              value={Employee.nbEnfants}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              sx={{ input: { backgroundColor: 'white' } }} 
            />
          </Box>


          {/* Children Fields */}
          {children.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6">Informations sur les Enfants</Typography>
              {children.map((child, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">Enfant {index + 1}</Typography>
                  <TextField
                    label="Nom"
                    name="nom"
                    value={child.nom}
                    onChange={(e) => handleChildChange(index, e)}
                    fullWidth
                    margin="normal"
                    required
                    sx={{ input: { backgroundColor: 'white' } }} 
                  />
                  <TextField
                    label="Prénom"
                    name="prenom"
                    value={child.prenom}
                    onChange={(e) => handleChildChange(index, e)}
                    fullWidth
                    margin="normal"
                    required
                    sx={{ input: { backgroundColor: 'white' } }} 
                  />
                  <TextField
                    label="Date de Naissance"
                    name="dateNaissance"
                    type="date"
                    value={child.dateNaissance}
                    onChange={(e) => handleChildChange(index, e)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    required
                    sx={{ input: { backgroundColor: 'white' } }} 
                  />
                </Box>
              ))}
            </Box>
          )}

          <Box sx={{ mb: 2, textAlign: 'center' }}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Button variant="contained" color="primary" type="submit">
                {employeeId ? 'Mettre à Jour' : 'Enregistrer'}
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Container>
  );
}
