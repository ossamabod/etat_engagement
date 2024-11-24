import { createSlice } from "@reduxjs/toolkit";
import { searchbycriteria,deleteEmployee ,fetchEmployee ,saveEmployee} from "./EmployeeAction";
import { fetchGrades } from "../Grade/GradeAction";
import { format } from 'date-fns';


const initialState = {
  Employee: {
    cin: '',
    nom: '',
    prenom: '',
    dateNaissance: '',
    lieuNaissance: '',
    sexe: '',
    adresse: '',
    ville: '',
    dateEntree: '',
    avancement: '',
    grade: '',
    region: '',
    diplome: '',
    affectation: '',
    nivInst: '',
    situationFam: 'Célibataire',
    nbEnfants: 0,
    codeService: '',
    adresseFam: '',
    tel: '',
    observations: '',
    age: '',
    banque: '',
    numeroCompte: '',
    budget: '',
    dp: '',
    conjoint: { nom: '', prenom: '', profession: '' },
    province: '',
  },
  nbEnfants: 0,
  grades: [],
  children: [],
  isSpouseFormVisible: false,
  searchResult: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalElements: 0,
  },
  isLoading: false,
  error: null,
};

const EmployeeSlice = createSlice({
  name: "Employee",
  initialState,
  reducers: {
    resetSearchState: (state) => {
      state.searchResult = [];
      state.pagination = { currentPage: 1, totalPages: 1, totalElements: 0 };
    },
    updateEmployeeField: (state, action) => {
      const { field, value } = action.payload;
      state.Employee[field] = value;
      if (field === 'situationFam') {
        state.isSpouseFormVisible = value !== 'Célibataire';
      }
      if (field === 'nbEnfants') {
            const newNbEnfants = parseInt(value) || 0;
            // Adjust the children array based on the number of children
            if (newNbEnfants !== state.children.length) {
              state.children= (Array(newNbEnfants).fill().map(() => ({
                nom: '',
                prenom: '',
                sexe: '',
                dateNaissance: '',
                aCharge: false
              })));
            }
          }
    },
    updateChildren: (state, action) => {
      state.children = action.payload;
    },
    setEmployee: (state, action) => {
      state.Employee = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchbycriteria.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchbycriteria.fulfilled, (state, action) => {
        const { content, page } = action.payload.data;
        state.searchResult = content;
        state.pagination = {
          currentPage: page.number + 1,
          totalPages: page.totalPages,
          totalElements: page.totalElements,
        };
        state.isLoading = false;
      })
      .addCase(searchbycriteria.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
       .addCase(deleteEmployee.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResult = state.searchResult.filter(
          (result) => result.employeeId !== action.payload
        );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchEmployee.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.Employee = action.payload;
        state.isSpouseFormVisible = action.payload.situationFam !== 'Célibataire';
        // state.children = action.payload.nbEnfants > 0 ? action.payload.enfants : [];
  
                  if (action.payload.nbEnfants && action.payload.nbEnfants > 0) {
                    const formattedEnfants = (action.payload.enfants || []).map(enfant => ({
                      ...enfant,
                      dateNaissance: enfant.dateNaissance ? format(new Date(enfant.dateNaissance), 'yyyy-MM-dd') : ''
                    }));
                    state.children= formattedEnfants
                  } else {
                    state.children=[]
                  }
        
        state.isLoading = false;
      })
      .addCase(fetchEmployee.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchGrades.fulfilled, (state, action) => {
        state.grades = action.payload;
      })
      .addCase(fetchGrades.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(saveEmployee.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update employees or add to the list
        state.employees = state.employees.map((emp) =>
          emp.id === action.payload.id ? action.payload : emp
        );
      })
      .addCase(saveEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export const { resetSearchState ,updateEmployeeField, updateChildren,setEmployee} = EmployeeSlice.actions;
export default EmployeeSlice.reducer;
