type LoginCredentials = {
  login: string;
  password: string;
};

export const loginUser = (credentials: LoginCredentials): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.login === 'admin' && credentials.password === 'admin') {
        const token = `token_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        resolve(token);
      } else {
        reject(new Error('Неверный логин или пароль'));
      }
    }, 2000);
  });
};
