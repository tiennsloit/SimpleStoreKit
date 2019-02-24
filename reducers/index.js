import {combineReducers} from 'redux';
import countReducer from './countReducer.js';
import orderDetailReducer from './orderDetailReducer.js';

import { reducer as formReducer } from 'redux-form';
import { reducer as contactReducer } from 'redux-form';

const allReducers= combineReducers({
  count: countReducer,
  form: formReducer,
  orderDetailForm:orderDetailReducer,
  contactForm:contactReducer
});
export default allReducers;
