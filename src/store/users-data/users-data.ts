import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, createUser, updateUser, deleteUser } from '../api-actions';
import { UsersData } from '../../types/state';


const initialState: UsersData = {
  users: [],
  isUsersLoading: false,
  hasError: false,
};

export const usersData = createSlice({
  name: 'usersData',
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isUsersLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isUsersLoading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.hasError = true;
        state.isUsersLoading = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});





