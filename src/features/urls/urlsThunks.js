import { createAsyncThunk } from '@reduxjs/toolkit';
import { createShortUrl, getUserUrls, deleteUrl } from '../../api/urls';

export const fetchUserUrls = createAsyncThunk(
  'urls/fetchUserUrls',
  async (_, { rejectWithValue }) => {
    try {
      return await getUserUrls();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewUrl = createAsyncThunk(
  'urls/addNewUrl',
  async (urlData, { rejectWithValue }) => {
    try {
      return await createShortUrl(urlData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeUrl = createAsyncThunk(
  'urls/removeUrl',
  async (urlId, { rejectWithValue }) => {
    try {
      await deleteUrl(urlId);
      return urlId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);