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

export const createUser = createAsyncThunk(
  'users/createUser',
  async (user: User) => {
    const { data } = await api.post<User>('/users', user);
    return data;
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (user: User) => {
    const { data } = await api.put<User>(`/users/${user.id}`, user);
    return data;
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: number) => {
    await api.delete(`/users/${userId}`);
    return userId;
  }
);
