import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const getCreateModalIsLoading = (state: State) => state[NameSpace.CreateUserData].isCreateModalLoading;
export const getCreateModalHasError = (state: State) => state[NameSpace.CreateUserData].hasCreateModalError;
export const getCreateModalIsOpen = (state: State) => state[NameSpace.CreateUserData].isCreateModalOpen;
export const getCreateIsSuccess = (state: State) => state[NameSpace.CreateUserData].isCreateSuccess;
