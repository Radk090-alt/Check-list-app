import store from '@rcd/store';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';

const AppContainer = () => {
  return (
    <React.Fragment>
      <Provider store={store.store}>
        <PersistGate persistor={store.persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.Fragment>
  );
};

export default AppContainer;
