import { createSlice } from '@reduxjs/toolkit';
import { CreateUserData, User } from '../../types/state';
import { NameSpace } from '../../const';
import { createUser } from '../api-actions';

const initialState: CreateUserData = {
  name: '',
  avatar: '',
  isCreateModalLoading: false,
  hasCreateModalError: false,
  isCreateModalOpen: false,
  isCreateSuccess: false,
};

export const createUserData = createSlice({
  name: NameSpace.CreateUserData,
  initialState,
  reducers: {
    setCreateModalOpen: (state, action: { payload: boolean }) => {
      state.isCreateModalOpen = action.payload;
    },
    clearCreateUserData: (state) => {
      state.name = '';
      state.avatar = '';
      state.isCreateModalOpen = false;
      state.isCreateModalLoading = false;
      state.hasCreateModalError = false;
      state.isCreateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.isCreateModalLoading = true;
    });
    builder.addCase(createUser.fulfilled, (state) => {
      state.isCreateModalLoading = false;
      state.hasCreateModalError = false;
      state.isCreateModalOpen = true;
      state.isCreateSuccess = true;
      state.name = '';
      state.avatar = '';
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isCreateModalLoading = false;
      state.hasCreateModalError = true;
      state.isCreateModalOpen = true;
    });
  },
});

export const { setCreateModalOpen, clearCreateUserData } = createUserData.actions;
export default createUserData.reducer;
