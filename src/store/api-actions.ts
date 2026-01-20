import { createAsyncThunk } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { User } from '../types/state';

const api = createAPI();

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const { data } = await api.get<User[]>('/users');
    return data;
  }
);
