import { createAsyncThunk } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { User } from '../types/state';
import { loginUser } from '../services/auth-api';
import { saveToken, dropToken, getToken } from '../services/token';

const api = createAPI();

type LoginCredentials = {
  login: string;
  password: string;
};

export const loginAction = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials) => {
    const token = await loginUser(credentials);
    saveToken(token);
    return token;
  }
);

export const logoutAction = createAsyncThunk(
  'auth/logout',
  async () => {
    dropToken();
  }
);

export const checkAuthAction = createAsyncThunk(
  'auth/checkAuth',
  async () => {
    const token = getToken();
    if (!token) {
      throw new Error('No token');
    }
    return { token };
  }
);

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
