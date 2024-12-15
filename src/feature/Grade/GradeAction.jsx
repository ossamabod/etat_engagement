import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify'; // Import toast library

export const fetchingGrades = createAsyncThunk('employee/fetchGrades', async (_, { rejectWithValue }) => {
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
export const fetchGrade = createAsyncThunk(
  "employee/fetchGrade",
  async ({ gradeId }, { rejectWithValue }) => {
    console.log("Action gradeId:"+gradeId);
    try {
      if (!gradeId) {
        throw new Error("Grade ID is required");
      }
      
      const response = await axios.get(`http://localhost:8080/api/grades/getGrade/${gradeId}`);

      if (response.data.success && response.data.data.length > 0) {
        const fetchedData = response.data.data[0];

        return {
          code: fetchedData.code,
          libelle: fetchedData.libelle,
          niveau: fetchedData.niveau,
          traitementBase: fetchedData.traitementBase,
          indemnites: {
            indemniteSujection: fetchedData.indemnites?.indemniteSujection || '',
            indemniteFonction: fetchedData.indemnites?.indemniteFonction || '',
            indemniteTournee: fetchedData.indemnites?.indemniteTournee || '',
            indemniteRepresentation: fetchedData.indemnites?.indemniteRepresentation || '',
          },
          retenue: {
            rcar: fetchedData.retenue?.rcar || '',
            igr: fetchedData.retenue?.igr || '',
            amo: fetchedData.retenue?.amo || '',
            sm: fetchedData.retenue?.sm || '',
          },
        };
      } else {
        throw new Error("No grade data found for the provided ID");
      }
    } catch (error) {
      toast.error(`Erreur: ${error.message}`);
      return rejectWithValue(error.message);
    }
  }
);
  export const addGrade =createAsyncThunk('employee/addGrade',async({gradeId,Grade},{rejectWithValue})=>{
   
    try {
      if (gradeId) {
        await axios.put(`http://localhost:8080/api/grades/${gradeId}`, Grade);
        toast.success('Le grade a été mis à jour avec succès.');
      } else {
        await axios.post('http://localhost:8080/api/grades', Grade);
        toast.success('Le grade a été ajouté avec succès.');
      }
    } catch (error) {
      toast.error(`Erreur lors de la soumission: ${error.message}`);
    }

  });