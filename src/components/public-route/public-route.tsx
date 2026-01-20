import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/auth-data/selectors';
import LoadingScreen from '../../pages/loading/loading-screen';

type PublicRouteProps = {
  children: JSX.Element;
};

function PublicRoute({ children }: PublicRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingScreen />;
  }

  return authorizationStatus === AuthorizationStatus.NoAuth ? children : <Navigate to={AppRoute.Main} />;
}

export default PublicRoute;
