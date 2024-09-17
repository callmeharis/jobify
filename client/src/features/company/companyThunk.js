import { logoutUser } from "../user/userSlice";
import { clearValues } from "./companySlice";
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const createCompanyThunk = async (company, thunkAPI) => {
    try {
        const resp = await customFetch.post('/company/create', company);
        thunkAPI.dispatch(clearValues());
        return resp.data;
    } catch (error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(logoutUser());
            return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
};

export const getAllCompniesThunk = async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get("/company/All");
      console.log(resp)
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  };

  export const getCompanyByIdThunk = async (id, thunkAPI) => {
    try {
      const resp = await customFetch.get(`/company/${id}`);
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  };

  export const updateCompanyByIdThunk = async ({id, formData}, thunkAPI) => {
    console.log(formData)
    try {
      const resp = await customFetch.put(`/company/update/${id}`, formData);
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  };
