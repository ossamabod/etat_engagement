import { createSlice } from "@reduxjs/toolkit";
import { fetchGrade,fetchingGrades} from "../Grade/GradeAction";


const initialState ={
    Grade:{
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
   
    },
    Grades:[],
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalElements: 0,
      },
      isLoading: false,
      error: null,
      step:0,
}
const GradeSlice = createSlice({
    name:"Grade",
    initialState,
    reducers:{
        setGrade(state,action){
          state.Grade=action.payload;
        },
        updateGradeField(state, action) {
          const { name, value } = action.payload;
          const [section, field] = name.split('.');
    
          if (section === 'indemnites' || section === 'retenue') {
            state.Grade[section][field] = value;
          } else {
            state.Grade[name] = value;
          }
        },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchGrade.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchGrade.fulfilled, (state, action) => {
          state.isLoading = false;
          state.Grade = action.payload; // Assuming `action.payload` contains an array of grades
        })
        .addCase(fetchGrade.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload || 'Failed to fetch grades.';
        })
        .addCase(fetchingGrades.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchingGrades.fulfilled, (state, action) => {
          state.isLoading = false;
          state.Grades = action.payload;
        })
        .addCase(fetchingGrades.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        });
    },
})
export const { setGrade, updateGradeField } = GradeSlice.actions;
export default GradeSlice.reducer;