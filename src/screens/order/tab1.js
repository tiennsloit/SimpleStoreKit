import React, { Component } from "react";
import OrderDetail from './orderDetail';
import {Container} from 'react-native';
import { Content, Card, CardItem, Text, Body } from "native-base";

export default class Tab1 extends Component {
  render() {
    return (
      <Content>
        <OrderDetail/>
      </Content>

    );
  }
}
