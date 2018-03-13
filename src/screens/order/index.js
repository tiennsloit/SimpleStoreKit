import React, { Component } from "react";
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
  IconNB
} from "native-base";
import styles from "./styles";

const datas = [
  {
    route: "FixedLabel",
    text: "Fixed Label"
  },
  {
    route: "InlineLabel",
    text: "Inline Label"
  },
  {
    route: "FloatingLabel",
    text: "Floating Label"
  },
  {
    route: "PlaceholderLabel",
    text: "Placeholder Label"
  },
  {
    route: "StackedLabel",
    text: "Stacked Label"
  },
  {
    route: "RegularInput",
    text: "Regular Textbox"
  },
  {
    route: "UnderlineInput",
    text: "Underlined Textbox"
  },
  {
    route: "RoundedInput",
    text: "Rounded Textbox"
  },
  {
    route: "IconInput",
    text: "Icon Textbox"
  },
  {
    route: "SuccessInput",
    text: "Success Input Textbox"
  },
  {
    route: "ErrorInput",
    text: "Error Input Textbox"
  },
  {
    route: "DisabledInput",
    text: "Disabled Textbox"
  },
  {
    route: "TextArea",
    text: "TextArea"
  }
];

class OrderEdit extends Component {
 constructor(props){
    super(props);
    this.state =
    {
      isLoading: true,
      productTypeId: 1,
      productPrice:0,
      price:0,
      paid:0,
      weight:0,
      totalPrice:0,
      contactName:'',


      isWeightValid: true
    }
  }

  componentDidMount(){
    console.log('component did mount!!');
    var orderId = this.props.navigation.state.params.orderId;
    return fetch('https://simplestorekitws.azurewebsites.net/getorderbyid/' + orderId)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          weight:responseJson.weight,
          productTypeId: responseJson.productType.id,
          price:responseJson.productType.price,
          contactName: responseJson.contact.name
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });

  }

  weightChanged = ()=>{


    console.log('weight: '+ this.state.weight + ' valid: ' +this.state.isWeightValid);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Sửa đơn hàng</Title>
          </Body>
          <Right />
        </Header>

        <Content>
        <Form>
          <Item stackedLabel>
            <Label>Tên khách hàng</Label>
            <Input value={this.state.contactName}/>
          </Item>
          <Item success={this.state.isWeightValid} error={!this.state.isWeightValid}>
            <Icon active name="logo-dropbox" />
            <Label>Số lượng</Label>
            <Input value={this.state.weight} onChangeText={(text)=>
              {
                this.setState({isWeightValid:text > 0 ? true : false});

              }} keyboardType = 'numeric' />
            <IconNB name={this.state.isWeightValid ? "ios-checkmark-circle" : "ios-close-circle"} />
          </Item>
          <Item success>
            <Icon active name="logo-usd" />
            <Label>Giá</Label>
            <Input value={this.state.price*this.state.weight}/>
            <IconNB name="ios-checkmark-circle" />
          </Item>
        </Form>
        <Button block style={{ margin: 15, marginTop: 50 }}>
          <Text>Lưu</Text>
        </Button>
        </Content>
      </Container>
    );
  }
}

export default OrderEdit;
