import React from "react";
import Setup from "./src/boot/setup";

import allReducers from './reducers/index.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const store = createStore(allReducers);

export default class App extends React.Component {
  render() {
    return  <Provider store= {store}>
        <Setup />
      </Provider>
  }
}
