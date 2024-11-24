import { configureStore } from "@reduxjs/toolkit"
import EmployeeReducer from "../feature/Employee/EmployeeSlice"


export const store = configureStore({
    reducer: {
       Employee:EmployeeReducer
    }
})

