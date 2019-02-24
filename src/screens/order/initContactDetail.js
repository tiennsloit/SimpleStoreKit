import React, {Component} from 'react';
import Expo from 'expo';
import {View} from 'react-native';
import {Container, Item, Input, Header, Body, Content, Title, Button, Text} from 'native-base';
import {Field, reduxForm} from 'redux-form';

const validate = values => {
  const error = {};
  error.email = '';
  error.name = '';
  
  var ema = values.email;
  var nm = values.name;
  if(values.email === undefined)
  {
    ema = '';

  }
  if(values.name === undefined)
  {
    nm = '';
  }
  if(ema.length < 8 && ema !== '')
  {
    error.email = 'too short!';
  }

  if(!ema.includes('@') && ema!== '')
  {
    error.email = '@ not include';
  }
  if(nm.length > 8){
    error.name= 'max 8 characters';
  }
  return error;
}

class ContactForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      isReady: false
    };
    this.renderInput = this.renderInput.bind(this);
    
  }

  renderInput({input, label, type, meta:{touched, error, warning}})
    {
      var hasError = false;
      if(error !== undefined)
      {
        hasError = true;
      }
      return (<Item error={hasError}>
        <Input {...input}/>
        {hasError ? <Text>{error}</Text> : <Text></Text>}
      </Item>
      )
    }

    render()
    {
      const { reset} = this.props;
      return (
        <Container>
          <Header>
            <Body>
                <Title>Contact Form</Title>
            </Body>
          </Header>
          <Content>
              <Field name="email" component={this.renderInput}></Field>
              <Field name="name" component={this.renderInput}></Field>
              <Button block primary onPress={reset}>
                <Text>Submit</Text>
              </Button>        
          </Content>
        </Container>
      )
    }
}

export default reduxForm({
  form: 'test1',
  validate
})(ContactForm);
