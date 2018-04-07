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
  IconNB,
  Picker,
  CheckBox,
  NumericInput
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
      productPrice:"0",
      price:"0",
      paid:"0",
      weight:"0",
      totalPrice:"0",
      contactName:'',
      productTypeId:undefined,
      productTypes:[],


      isWeightValid: true,
      isPriceValid: true,
      isPaidValid: true,
      isProductTypeValid:true,
      isReceived: true
    }
  }

  componentDidMount(){
    console.log('component did mount!!');
    var orderId = this.props.navigation.state.params.orderId;
    fetch('https://simplestorekitws.azurewebsites.net/getorderbyid/' + orderId)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          weight:responseJson.weight,
          productTypeId: responseJson.productType.id,
          price:responseJson.price,
          paid:responseJson.paid,
          contactName: responseJson.contact.name,
          isReceived: responseJson.receivedreceived > 0,


          isWeightValid: responseJson.weight > 0,
          isPriceValid: responseJson.productType.price > 0,
          isPaidValid: responseJson.productType.paid > 0,
          isProductTypeValid:responseJson.productType.id > 0


        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });

      fetch('https://simplestorekitws.azurewebsites.net/api/producttypes')
      .then((response)=> response.json())
      .then((responseJson)=>{
        this.setState({
          productTypes:responseJson
        });
      })
      .catch((error)=>{
        console.console.error(error);
      });


  }

  weightChanged = ()=>{


    console.log('weight: '+ this.state.weight + ' valid: ' +this.state.isWeightValid);
  }

  render() {
    let productTypeItems = this.state.productTypes.map( (s, i) => {
            console.log('product type item: ' + s.id);
            return <Picker.Item key={s.id} value={s.id} label={s.name} />
        });
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
            <Input value={this.state.weight.toString()} onChangeText={(text)=>
              {
                this.setState({
                  isWeightValid:text > 0 ? true : false,
                  weight:text,
                  paid:text*this.state.price,
                  isPaidValid:this.state.paid>0
                });


              }} keyboardType = 'numeric' />
            <IconNB name={this.state.isWeightValid ? "ios-checkmark-circle" : "ios-close-circle"} />
          </Item>

          <Item success={this.state.isPriceValid} error={!this.state.isPriceValid}>
            <Icon active name="logo-usd" />
            <Label>Đơn Giá:</Label>
            <Input value={this.state.price.toString()} onChangeText={(text)=>{
              this.setState({
                isPriceValid:text > 0 ? true:false,
                price:text,
                paid:text*this.state.weight,
                isPaidValid:this.state.paid>0
              });

            }} />
            <IconNB name={this.state.isPriceValid ? "ios-checkmark-circle" : "ios-close-circle"} />
          </Item>

          <Item success={this.state.isPriceValid} error={!this.state.isPriceValid}>
            <Icon active name="logo-usd" />
            <Label>Giá:</Label>
            <Input disabled value={(this.state.price*this.state.weight).toString()} onChangeText={(text)=>{
              this.setState({isPriceValid:text > 0 ? true:false});
            }} />
            <IconNB name={this.state.isPriceValid ? "ios-checkmark-circle" : "ios-close-circle"} />
          </Item>

          <Item success={this.state.isPaidValid} error={!this.state.isPaidValid}>
            <Icon active name="calculator" />
            <Label>Tiền Nhận:</Label>
            <Input value={this.state.paid.toString()} onChangeText={(text)=>{
              this.setState({
                isPaidValid:text > 0 ? true:false,
                paid:text
              });
            }} />
            <IconNB name={this.state.isPaidValid ? "ios-checkmark-circle" : "ios-close-circle"} />
          </Item>

          <Item success={this.state.isProductTypeValid} error={!this.state.isProductTypeValid}>
          <Icon active name="archive" />
          <Label>Loại hàng hoá:</Label>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="ios-arrow-down-outline" />}
            style={{ width: undefined }}
            placeholder="Chọn mặt hàng"
            placeholderStyle={{ color: "#bfc6ea" }}
            selectedValue={this.state.productTypeId}
            onValueChange={(value)=>{
              this.setState({productTypeId:value});
            }}
          >
            {productTypeItems}

          </Picker>
          </Item>
          <Item success={this.state.isReceived} error={!(this.state.isReceived)}>
            <Icon active name="cart" />
            <Label>Đã giao hàng:</Label>
            <CheckBox
              color={this.state.isReceived? "green" : "red"}
              checked={this.state.isReceived}
              onPress={() => {
                this.setState({isReceived:!this.state.isReceived});
              }
            }
            />

          </Item>

        </Form>
        <Button block style={{ margin: 15, marginTop: 50 }} onPress={()=>{alert(this.state.weight);}}>
          <Text>Lưu</Text>
        </Button>
        </Content>
      </Container>
    );
  }
}

export default OrderEdit;
