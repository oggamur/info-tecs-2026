import { store } from '../store/store';


export type AppDispatch = typeof store.dispatch;
export type State = ReturnType<typeof store.getState>;

export type User = {
  id: number;
  name: string;
  createdAt: Date;
  avatar: string;
};

export type UsersData = {
  users: User[];
  isUsersLoading: boolean;
  hasError: boolean;
};
