import React, { Component } from "react";
import InitOrderDetailForm from './initOrderDetailForm';
import ContactForm from './initContactDetail';
import { Container} from 'react-native';
import { Content, Card, CardItem, Text, Body } from "native-base";

export default class Tab1 extends Component {
  render() {
    return (
      <Content>
        <ContactForm />
      </Content>

    );
  }
}
