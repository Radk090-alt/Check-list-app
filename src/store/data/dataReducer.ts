import {combineReducers} from 'redux';

// API reducers
import user from './reducers/userReducer';
import categories from './reducers/categoriesReducer';
import machines from './reducers/machinesReducer';
import checklists from './reducers/checklistsReducer';
import forms from './reducers/formsReducer';

// Combine reducers
export default combineReducers({
  user,
  categories,
  machines,
  checklists,
  forms,
});
