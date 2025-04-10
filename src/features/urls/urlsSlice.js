import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  links: [],
  status: 'idle',
  error: null,
  creatingStatus: 'idle',
  deletingStatus: 'idle'
};

const urlsSlice = createSlice({
  name: 'urls',
  initialState,
  reducers: {
    resetUrlStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
    clearUrls: (state) => {
      state.links = [];
      state.status = 'idle';
      state.error = null;
    }
  }
});

export const { resetUrlStatus, clearUrls } = urlsSlice.actions;
export default urlsSlice.reducer;

export const selectAllUrls = (state) => state.urls.links;
export const selectUrlsStatus = (state) => state.urls.status;
export const selectCreatingStatus = (state) => state.urls.creatingStatus;
export const selectDeletingStatus = (state) => state.urls.deletingStatus;
export const selectUrlsError = (state) => state.urls.error;