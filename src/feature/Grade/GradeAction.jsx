import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


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