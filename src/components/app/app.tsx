import '../../App.css';
import Users from '../../pages/users/users-screen';
import browserHistory from '../../browser-history';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../history-router/history-router';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import Login from '../../pages/login/login-screen';
import { getIsUsersLoading } from '../../store/users-data/selectors';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading/loading-screen';

function App(): JSX.Element {
  const isUsersLoading = useAppSelector(getIsUsersLoading);

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
           <Users/>
          }>
          </Route>
          <Route
          path={AppRoute.Login}
          element={
           <Login/>
          }>
          </Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
