import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';

import {Provider} from  'react-redux';
import {PersistGate} from 'redux-persist/integration/react'
import {store,persistor} from './redux/store';

ReactDOM.render(
  // provider is the parent of all the component used in app and it have access to the redux store
                  // provider will provide all the store things to app component as we know provider is parent
 <Provider store={store}>
  <BrowserRouter>
 < PersistGate persistor={persistor}>
    <App />
    </ PersistGate>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

  