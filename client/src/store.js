import { configureStore } from '@reduxjs/toolkit';
import jobSlice from './features/job/jobSlice';
import userSlice from './features/user/userSlice';
import allJobsSlice from './features/allJobs/allJobsSlice';
import companySlice from './features/company/companySlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: allJobsSlice,
    companies: companySlice,
  },
});
