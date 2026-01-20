import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../api-actions';
import { UsersData } from '../../types/state';


const initialState: UsersData = {
  users: [],
  isUsersLoading: false,
  error: null,
};

export const usersData = createSlice({
  name: 'usersData',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isUsersLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isUsersLoading = false;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.error.message ?? 'Failed to fetch users';
      state.isUsersLoading = false;
    });
  },
});





