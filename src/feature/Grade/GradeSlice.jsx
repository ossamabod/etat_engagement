import { createSlice } from "@reduxjs/toolkit";

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
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalElements: 0,
      },
      isLoading: false,
      error: null,
    }
}