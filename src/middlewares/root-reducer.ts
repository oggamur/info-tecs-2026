import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { usersData } from '../store/users-data/users-data';
import { editUserData } from '../store/edit-user-data/edit-user-data';
import { createUserData } from '../store/create-user-data/create-user-data';
import { authData } from '../store/auth-data/auth-data';

export const rootReducer = combineReducers({
  [NameSpace.UsersData]: usersData.reducer,
  [NameSpace.EditUserData]: editUserData.reducer,
  [NameSpace.CreateUserData]: createUserData.reducer,
  [NameSpace.AuthData]: authData.reducer,
});
