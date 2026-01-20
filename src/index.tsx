import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/app';
import { fetchUsers, checkAuthAction } from './store/api-actions';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const rootElement = createRoot(document.getElementById('root') as HTMLElement);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

store.dispatch(checkAuthAction());
store.dispatch(fetchUsers());

rootElement.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <React.StrictMode>
        <App/>
      </React.StrictMode>
    </Provider>
  </QueryClientProvider>,
);
