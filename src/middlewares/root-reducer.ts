import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { usersData } from '../store/users-data/users-data';

export const rootReducer = combineReducers({
  [NameSpace.UsersData]: usersData.reducer,
});
