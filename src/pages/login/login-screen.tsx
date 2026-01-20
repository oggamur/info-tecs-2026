import './login.scss';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { notification } from 'antd';
import { getIsAuthenticated } from '../../store/auth-data/selectors';
import { useAppSelector } from '../../hooks';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(getIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(AppRoute.Main);
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (login.trim() && password.trim() && !isLoading) {
      setIsLoading(true);
      try {
        await dispatch(loginAction({ login, password })).unwrap();
        navigate(AppRoute.Main);
      } catch (error) {
        notification.error({
          message: 'Ошибка авторизации',
          description: error instanceof Error ? error.message : 'Неверный логин или пароль',
          placement: 'top',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-title">Авторизация</h1>
        
        <input
          type="text"
          className="login-input"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          disabled={isLoading}
        />
        
        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            className="login-input password-input"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="button"
            className="password-toggle"
            aria-label="Показать пароль"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
        
        <button 
          type="submit" 
          className="login-button"
          disabled={isLoading || !login.trim() || !password.trim()}
        >
          {isLoading ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </div>
  );
}

export default Login;
