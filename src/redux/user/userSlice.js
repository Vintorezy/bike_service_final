import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client, authClient } from '../../service/client';

export const fetchRegistration = createAsyncThunk(`auth/sign_up`, async (payload) => {
  const { data } = await client.post(`/auth/sign_up`, payload);
  return data;
});

export const fetchLogin = createAsyncThunk(`$auth/sign_in`, async (payload) => {
  const { data } = await client.post(`/auth/sign_in`, payload);
  return data;
});

export const fetchMe = createAsyncThunk(`auth`, async () => {
  const { data } = await authClient().get(`/auth`);
  return data;
});

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = null;
      state.error = null;
      localStorage.removeItem('auth-token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegistration.pending, (state) => {
      state.data = null;
      state.status = 'pending';
      state.error = null;
    });
    builder.addCase(fetchRegistration.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'fulfilled';
      state.error = null;
    });
    builder.addCase(fetchRegistration.rejected, (state, action) => {
      state.data = null;
      state.status = 'rejected';
      state.error = action.error.message;
    });
    builder.addCase(fetchLogin.pending, (state) => {
      state.data = null;
      state.status = 'pending';
      state.error = null;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'fulfilled';
      state.error = null;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.data = null;
      state.status = 'rejected';
      state.error = action.error.message;
    });
    builder.addCase(fetchMe.pending, (state) => {
      state.data = null;
      state.status = 'pending';
      state.error = null;
    });
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'fulfilled';
      state.error = null;
    });
    builder.addCase(fetchMe.rejected, (state, action) => {
      state.data = null;
      state.status = 'rejected';
      state.error = action.error.message;
    });
  },
});

export const userReducer = userSlice.reducer;

export const { logout } = userSlice.actions;
