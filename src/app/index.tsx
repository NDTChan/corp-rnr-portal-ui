import React from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { Provider } from 'react-redux';
import { registerLocale } from 'app/config/translation';
import getStore from 'app/config/store';
import { loadIcons } from 'app/config/icon-loader';
import App from 'app/app';
import setupAxiosInterceptors from 'app/config/axios-interceptor';

const store = getStore();
registerLocale(store);

setupAxiosInterceptors();
loadIcons();

const rootEl = document.getElementById('root');
const root = createRoot(rootEl);

const render = Component =>
  root.render(
    <ErrorBoundary>
      <Provider store={store}>
        <div>
          <Component />
        </div>
      </Provider>
    </ErrorBoundary>
  );

render(App);
