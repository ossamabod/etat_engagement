import { configureStore } from "@reduxjs/toolkit"
import EmployeeReducer from "../feature/Employee/EmployeeSlice"
import GradeReducer from "../feature/Grade/GradeSlice"



export const store = configureStore({
    reducer: {
       Employee:EmployeeReducer,
       Grade:GradeReducer
    }
})

