import { createSlice } from '@reduxjs/toolkit';
import { EditUserData, User } from '../../types/state';
import { NameSpace } from '../../const';
import { updateUser, deleteUser } from '../api-actions';

const initialState: EditUserData = {
  user: {
    id: 0,
    name: '',
    createdAt: '',
    avatar: '',
  },
  isEditModalOpen: false,
  modalIsLoading: false,
  modalHasError: false,
  isSuccess: false,
};

export const editUserData = createSlice({
  name: NameSpace.EditUserData,
  initialState,
  reducers: {
    setUser: (state, action: { payload: User}) => {
      state.user.id = action.payload.id;
      state.user.name = action.payload.name;
      state.user.createdAt = action.payload.createdAt;
      state.user.avatar = action.payload.avatar;
    },
    setIsEditModalOpen: (state, action: { payload: boolean }) => {
      state.isEditModalOpen = action.payload;
    },
    clearUser: (state) => {
      state.user = initialState.user;
      state.isEditModalOpen = initialState.isEditModalOpen;
      state.modalIsLoading = false;
      state.modalHasError = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.modalIsLoading = true;
        state.modalHasError = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.modalIsLoading = false;
        state.modalHasError = false;
        state.user = action.payload;
        state.isEditModalOpen = true;
        state.isSuccess = true;
      })
      .addCase(updateUser.rejected, (state) => {
        state.modalIsLoading = false;
        state.modalHasError = true;
      })
      .addCase(deleteUser.pending, (state) => {
        state.modalIsLoading = true;
        state.modalHasError = false;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.modalIsLoading = false;
        state.modalHasError = false;
        state.isEditModalOpen = true;
        state.isSuccess = true;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.modalIsLoading = false;
        state.modalHasError = true;
      });
  },
});

export const { setUser, setIsEditModalOpen, clearUser } = editUserData.actions;
export default editUserData.reducer;
