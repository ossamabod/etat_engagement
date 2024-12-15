import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { format } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify'; // Import toast library




export const getEmployee = createAsyncThunk("employee/getEmployee",async ()=>{
    try{
   const response= await axios.get("http://localhost:8080/Employee/searchbycriteria")
   return response;
    }
   catch(error){
    return(error)
   }
})
export const searchbycriteria= createAsyncThunk("employee/SearchEmployee",async({searchTerm,pageNumber})=>{
        const response = await axios.post("http://localhost:8080/Employee/searchbycriteria",{
            cin:searchTerm,
            page:pageNumber,
            limit:5,
            isDeleted:false,
            withPagination:true
        })
        return response.data
})
export const deleteEmployee= createAsyncThunk("employee/DeleteEmployee",async(employeeId,{rejectWithValue})=>{
    try{
            await axios.delete(`http://localhost:8080/Employee/${employeeId}`)
            return employeeId
    }
    catch(error){
            return rejectWithValue(error.response.data|| error.message)
    }
        
})

// Async actions for fetching data
export const fetchEmployee = createAsyncThunk('employee/fetchEmployee', async (employeeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8080/Employee/${employeeId}`);
      const { data, success } = response.data;
      if (success && data) {
        const employeeData = data.content[0];


        return {
          ...employeeData,
          dateNaissance: employeeData.dateNaissance ? format(new Date(employeeData.dateNaissance), 'yyyy-MM-dd') : '',
          dateEntree: employeeData.dateEntree ? format(new Date(employeeData.dateEntree), 'yyyy-MM-dd') : '',
          region: employeeData.region || '',
          province: employeeData.province || '',
          conjoint: employeeData.conjoint || { nom: '', prenom: '', profession: '' },
          grade: employeeData.grade || { id: '', libelle: '' },
        };
        
      } else {
        throw new Error('Employee not found or unexpected response structure');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });
  export const saveEmployee = createAsyncThunk(
    'employees/saveEmployee',
    async ({ employeeData, employeeId }, { rejectWithValue }) => {
      try {
        let response;
        if (employeeId) {
          // Update employee
          response = await axios.put(`http://localhost:8080/Employee/${employeeId}`, employeeData);
          toast.success('Employé mis à jour avec succès !');
        } else {
          // Create new employee
          response = await axios.post('http://localhost:8080/Employee', employeeData);
          toast.success('Employé créé avec succès !');
        }
        return response.data;
      } catch (error) {
        toast.error('Erreur: Impossible de sauvegarder l\'employé.');
        return rejectWithValue(error.response?.data || 'Erreur réseau');
      }
    }
  );

export const fetchGrades = createAsyncThunk('employee/fetchGrades', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:8080/api/grades/getGrade');
    if (response.data && response.data.success) {
      return response.data.data;
    } else {
      throw new Error('Unexpected response structure');
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});