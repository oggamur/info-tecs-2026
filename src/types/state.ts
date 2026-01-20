import { store } from '../store/store';


export type AppDispatch = typeof store.dispatch;
export type State = ReturnType<typeof store.getState>;

export type User = {
  id: number;
  name: string;
  createdAt: string;
  avatar: string;
};

export type UsersData = {
  users: User[];
  isUsersLoading: boolean;
  hasError: boolean;
};

export type EditUserData = {
  user: User;
  isEditModalOpen: boolean;
  modalIsLoading: boolean;
  modalHasError: boolean;
  isSuccess: boolean;
};

export type CreateUserData = {
  name: string;
  avatar: string;
  isCreateModalLoading: boolean;
  hasCreateModalError: boolean;
  isCreateModalOpen: boolean;
  isCreateSuccess: boolean;
};
