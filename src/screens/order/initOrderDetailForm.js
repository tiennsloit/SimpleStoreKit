
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import React , { Component } from 'react';
import {load as loadOrderDetail} from '../../../reducers/orderDetailReducer';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Left,
  Body,
  Right,
  List,
  Form,
  Item,
  Label,
  Input,
  ListItem,
  IconNB,
  Picker,
  CheckBox,
  NumericInput,
  Spinner,
  Tabs,
  Tab,
  TabHeading

} from "native-base";


const data = {
  // used to populate "account" reducer when "Load" is clicked
  firstName: 'Jane',
  lastName: 'Doe',
  age: '42',
  sex: 'female',
  employed: true,
  favoriteColor: 'Blue',
  bio: 'Born to write amazing Redux code.'
}

const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet']

class InitOrderDetailForm extends Component {
 constructor(props){
   super(props);
   this.renderInput = this.renderInput.bind(this);
 }

  LoadOrderDetail = () =>{
    loadOrderDetail.load(data);
  }

  renderInput({ input, label, type, meta: { touched, error, warning } }){
    var hasError= false;
    if(error !== undefined){
      hasError= true;
    }
    return(
      <Item error= {hasError}>
        <Input {...input}/>
        {hasError ? <Text>{error}</Text> : <Text />}
      </Item>
    )
  }

  render() {
    return (
      <Content>
      <Form>
        <Item stackedLabel>
          <Label>Tên khách hàng</Label>
          <Field name="firstName" component={this.renderInput} />
        </Item>

        <Button onPress={()=>{this.LoadOrderDetail();}}>
          <Text>Load Customer</Text>
        </Button>
      </Form>
      </Content>

    );
  };


}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
InitOrderDetailForm = reduxForm({
  orderDetailForm: 'initializeFromState' // a unique identifier for this form
})(InitOrderDetailForm)

InitOrderDetailForm = connect(
  state => ({
    initialValues: state.orderDetailForm.data // pull initial values from account reducer
  }),
  {load: loadOrderDetail} // bind account loading action creator
)(InitOrderDetailForm)

export default InitOrderDetailForm
