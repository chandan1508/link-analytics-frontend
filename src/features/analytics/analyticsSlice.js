import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  status: 'idle',
  error: null,
  lastFetched: null
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    resetAnalytics: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
      state.lastFetched = null;
    },
    clearAnalyticsError: (state) => {
      state.error = null;
    }
  }
});

export const { resetAnalytics, clearAnalyticsError } = analyticsSlice.actions;
export default analyticsSlice.reducer;

export const selectAnalyticsData = (state) => state.analytics.data;
export const selectAnalyticsStatus = (state) => state.analytics.status;
export const selectAnalyticsError = (state) => state.analytics.error;
export const selectLastFetched = (state) => state.analytics.lastFetched;