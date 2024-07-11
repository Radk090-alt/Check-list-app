import {setToken} from '@rcd/api/helpers';
import {APP_ENV} from '@rcd/environment';
import AsyncStorage from '@react-native-community/async-storage';
import {AnyAction, applyMiddleware, createStore, Middleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

// Store
import mainReducer from './reducer';
import mainSaga from './saga';

// Token middleware
const saveAuthToken = () => (next: any) => (action: AnyAction) => {
  if (action.type === 'accessToken/SET') {
    setToken(action.payload.token);
  } else if (action.type === 'persist/REHYDRATE') {
    if (action.payload?.accessToken) {
      setToken(action.payload.accessToken.token);
    }
  } else if (action.type === 'accessToken/PURGE') {
    setToken(undefined);
  }

  return next(action);
};

// Array of middlewares
const middlewares: Array<Middleware<any, any, any>> = [saveAuthToken];

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Push it to the current stack
middlewares.push(sagaMiddleware);

// Persist config
const rootPersistConfig = {
  key: 'persisted',
  storage: AsyncStorage,
  whitelist: ['accessToken', 'queue', 'app'],
};

const persistedReducer = persistReducer(rootPersistConfig, mainReducer);

// Initialize the store
const composed =
  APP_ENV === 'local' ? composeWithDevTools(applyMiddleware(...middlewares)) : applyMiddleware(...middlewares);

const store = createStore(persistedReducer, composed);
const persistor = persistStore(store);

// Then run the sagas
sagaMiddleware.run(mainSaga);

// Export store
export default {
  store,
  persistor,
};
