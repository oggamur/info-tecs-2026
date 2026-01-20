import '../../App.css';
import Users from '../../pages/users/users-screen';
import browserHistory from '../../browser-history';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../history-router/history-router';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import Login from '../../pages/login/login-screen';
import { getHasError, getIsUsersLoading } from '../../store/users-data/selectors';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading/loading-screen';
import ErrorScreen from '../../pages/error/error-screen';
import { Button } from 'antd';
import PrivateRoute from '../private-route/private-route';
import PublicRoute from '../public-route/public-route';

function App(): JSX.Element {
  const isUsersLoading = useAppSelector(getIsUsersLoading);
  const hasError = useAppSelector(getHasError);
  if (hasError) {
    return (
      <ErrorScreen
        title="500"
        subTitle="Извините, что-то пошло не так."
        extra={
          <Button type="primary" onClick={() => window.location.reload()}>
            Обновить страницу
          </Button>
        }
      />
    );
  }
  if (isUsersLoading) {
    return <LoadingScreen />;
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <PrivateRoute>
                <Users/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Login}
            element={
              <PublicRoute>
                <Login/>
              </PublicRoute>
            }
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
