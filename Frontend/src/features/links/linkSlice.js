import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/links';

// Get all links
export const fetchLinks = createAsyncThunk(
  'links/fetchLinks',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(API_BASE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue('Failed to fetch links');
    }
  }
);

// Create a new short link
export const createLink = createAsyncThunk(
  'links/createLink',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(API_BASE, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue('Failed to create link');
    }
  }
);

const linkSlice = createSlice({
  name: 'links',
  initialState: {
    links: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLinks.fulfilled, (state, action) => {
        state.loading = false;
        state.links = action.payload;
      })
      .addCase(fetchLinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createLink.fulfilled, (state, action) => {
        state.links.unshift(action.payload);
      });
  },
});

export default linkSlice.reducer;
