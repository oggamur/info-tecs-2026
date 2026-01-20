import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/app';
import { fetchUsers } from './store/api-actions';
import { store } from './store/store';
import { Provider } from 'react-redux';
const rootElement = createRoot(document.getElementById('root') as HTMLElement);

store.dispatch(fetchUsers());

rootElement.render(
  <Provider store={store}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </Provider>,
);
