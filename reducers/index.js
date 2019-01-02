import {combineReducers} from 'redux';
import countReducer from './countReducer.js';

import { reducer as formReducer } from 'redux-form';

const allReducers= combineReducers({
  count: countReducer,
  form: formReducer
});
export default allReducers;
