import { State } from '../../types/state';
import { NameSpace, AuthorizationStatus } from '../../const';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => 
  state[NameSpace.AuthData].authorizationStatus;

export const getIsAuthenticated = (state: State): boolean => 
  state[NameSpace.AuthData].authorizationStatus === AuthorizationStatus.Auth;
