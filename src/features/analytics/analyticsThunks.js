

import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUrlAnalytics } from '../../api/analytics'

export const fetchUrlAnalytics = createAsyncThunk(
  'analytics/fetchUrlAnalytics',
  async ({ id, days }, { rejectWithValue }) => {
    try {
      return await getUrlAnalytics(id, days)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)