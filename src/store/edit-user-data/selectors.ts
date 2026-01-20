import { State } from '../../types/state';
import { NameSpace } from '../../const';

export const getEditUserData = (state: State) => state[NameSpace.EditUserData].user;
export const getIsEditModalOpen = (state: State) => state[NameSpace.EditUserData].isEditModalOpen;
export const getModalIsLoading = (state: State) => state[NameSpace.EditUserData].modalIsLoading;
export const getModalHasError = (state: State) => state[NameSpace.EditUserData].modalHasError;
export const getIsSuccess = (state: State) => state[NameSpace.EditUserData].isSuccess;
