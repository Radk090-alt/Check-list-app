import {combineReducers} from 'redux';

import data from './data/dataReducer';
import accessToken from './reducers/accessTokenReducer';
import queue from './reducers/queueReducer';
import app from './reducers/appReducer';
import loginScreen from './reducers/loginScreenReducer';
import profileScreen from './reducers/profileScreenReducer';
import searchByCategoryScreen from './reducers/searchByCategoryScreenReducer';
import searchByKeywordScreen from './reducers/searchByKeywordScreenReducer';
import searchByTextRecognitionScreen from './reducers/searchByTextRecognitionScreenReducer';
import machineScreen from './reducers/machineScreenReducer';
import checkScreen from './reducers/checkScreenReducer';
import photosFlow from './reducers/photosFlowReducer';
import createFormScreen from './reducers/createFormScreenReducer';

export default combineReducers({
  data,
  app,
  accessToken,
  queue,
  loginScreen,
  profileScreen,
  searchByCategoryScreen,
  searchByKeywordScreen,
  searchByTextRecognitionScreen,
  machineScreen,
  checkScreen,
  photosFlow,
  createFormScreen,
});
