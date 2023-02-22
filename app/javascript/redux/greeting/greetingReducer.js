/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const URL = 'api/v1/greetings';

export const fetchingGreeting = createAsyncThunk(
  'greeting/fetchingGreeting',
  async () => {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  },
);

const greetingReducer = createSlice({
  name: 'greeting',
  initialState: {
    greetings: [],
    status: null,
  },
  reducers: {
    pushedGreeting(state, action) {
      return { ...state, greetings: [...state.greetings, action.payload] };
    },
  },
  extraReducers: {
    [fetchingGreeting.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.greetings.push(action.payload.message);
    },
    [fetchingGreeting.pending]: (state) => {
      state.loading = true;
    },
    [fetchingGreeting.rejected]: (state, action) => {
      state.loading = false;
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const { pushedGreeting } = greetingReducer.actions;
export default greetingReducer.reducer;
