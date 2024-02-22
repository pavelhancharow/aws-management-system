import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import store from './shared/redux/store';
import GlobalStyle from './styles';
import App from './App/App';
import routes from './shared/routes'
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter basename={routes.basename}>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </Provider>
);
