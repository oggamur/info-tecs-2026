import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const getUsers = (state: State) => state[NameSpace.UsersData].users;
export const getIsUsersLoading = (state: State) => state[NameSpace.UsersData].isUsersLoading;
export const getHasError = (state: State) => state[NameSpace.UsersData].hasError;
