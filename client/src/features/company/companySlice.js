import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { createCompanyThunk, getAllCompniesThunk, getCompanyByIdThunk, updateCompanyByIdThunk } from "./companyThunk";

// Initial State
const initialState = {
  isLoading: false,
  companies: [],
  company: {},
  status: 'pending',
  isEditing: false,
  editCompany: '',
  companyLocation: getUserFromLocalStorage()?.location || ''
};

// Thunks (Async Actions)
export const createCompany = createAsyncThunk("company/createCompany", createCompanyThunk);
export const getAllCompanies = createAsyncThunk("company/getAll", getAllCompniesThunk);
export const getCompanyById = createAsyncThunk("company/Id", getCompanyByIdThunk);
export const updateCompanyById = createAsyncThunk("update/Id", updateCompanyByIdThunk);

// Company Slice
const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    clearValues: (state) => {
      return { 
        ...initialState, 
        companyLocation: getUserFromLocalStorage()?.location || '' 
      };
    },
    setEditCompany: (state, { payload }) => {
      return { 
        ...state, 
        isEditing: true, 
        ...payload // Set company data for editing
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Company
      .addCase(createCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCompany.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Company Created');
      })
      .addCase(createCompany.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })

      // Fetch All Companies
      .addCase(getAllCompanies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCompanies.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.companies = payload.companies || [];
      })
      .addCase(getAllCompanies.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })

       // Fetch All Companies
      .addCase(getCompanyById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanyById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.company = payload.company;
      })
      .addCase(getCompanyById.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updateCompanyById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCompanyById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.company = payload.company;
      })
      .addCase(updateCompanyById.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  }
});

export const { handleChange, clearValues, setEditCompany } = companySlice.actions;
export default companySlice.reducer;
