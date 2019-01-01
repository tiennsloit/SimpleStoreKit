import React, { Component} from "react";
import {Alert,ScrollView, Dimensions} from "react-native";
import { BarCodeScanner, Permissions } from 'expo';
import { Col, Row, Grid } from 'react-native-easy-grid';

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
  Spinner

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
      hasCameraPermission:null,
      useBarCode:true,
      scannedData:null,
      orderJson:undefined,
      isLoading: true,
      isSaving:false,
      orderId:undefined,
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
  };

  _requestCameraPermission =  async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };



  _handleBarCodeRead = (data) => {

    if(data != null)
    {
      var barc = data.data;
      //var realcode = barc.substring(0,barc.length-1);
      this.setState({
        scannedData:barc
      });
      //Alert.alert('data: ' + data.data);
      this.LoadOrder(barc);
    }
  };

  LoadOrder =(barcode)=>{
    var orderId = this.props.navigation.state.params.orderId;
    if(orderId <= 0 && this.state.useBarCode)
    {
      this._requestCameraPermission();
    }

    var url = 'https://simplestorekitws.azurewebsites.net/api/order/user/1';

    if(orderId > 0)
    {
      url = 'https://simplestorekitws.azurewebsites.net/api/order/' + orderId;
    }

    //Alert.alert('use bar code:' + this.state.useBarCode + ' - scannedData: ' +  this.state.scannedData);
    if(barcode != null)
    {

      url = 'https://simplestorekitws.azurewebsites.net/api/order/user/1/productType/' + barcode;
      //Alert.alert('url1:' + url);
    }
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          orderJson:responseJson,
          orderId:responseJson.id,
          isLoading: false,
          weight:responseJson.weight,
          productTypeId: responseJson.productTypeId,
          price:responseJson.price,
          paid:responseJson.paid,
          contactName: responseJson.contact.name,
          isReceived: responseJson.received > 0,


          isWeightValid: responseJson.weight > 0,
          isPriceValid: responseJson.price > 0,
          isPaidValid: responseJson.paid > 0,
          isProductTypeValid:responseJson.productTypeId > 0


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
        console.error(error);
      });

  }

  componentDidMount(){
      this.LoadOrder(null);
  }

  weightChanged = ()=>{

    console.log('weight: '+ this.state.weight + ' valid: ' +this.state.isWeightValid);
  }

  save = ()=>{
    this.setState({
      isSaving:true
    })
    var updatedOrderJson = this.state.orderJson;
    updatedOrderJson.weight = this.state.weight;
    updatedOrderJson.productTypeId = this.state.productTypeId;
    updatedOrderJson.price = this.state.price;
    updatedOrderJson.paid = this.state.paid;
    updatedOrderJson.received = this.state.isReceived ? 1 : 0;
    updatedOrderJson.contact.name = this.state.contactName;
    fetch('https://simplestorekitws.azurewebsites.net/api/order', {
      method: this.state.orderId > 0 ? 'PUT' : 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedOrderJson),
    })
    .then((json)=>{
      console.log('Success ' + json);
      this.setState({
        isSaving:false
      })
      this.props.navigation.navigate("Orders");

    })
    .catch((error)=>{
      console.error(error);
    });

    console.log('Navigate to Orders');

  }

  render() {
    const { height, width } = Dimensions.get('window');
    let productTypeItems = this.state.productTypes.map( (s, i) => {
            console.log('product type item: ' + s.id);
            return <Picker.Item key={s.id} value={s.id} label={s.name} />
        });

    var barCodeView =  this.state.hasCameraPermission === null ?
              <Text>Requesting for camera permission</Text> :
              this.state.hasCameraPermission === false ?
                <Text>Camera permission is not granted</Text> :
                <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                      style={{height:height,width:width}}
                />
    var barCodeViewContent =

    <ScrollView>
      <Row style={{backgroundColor:'red'}}>
        {barCodeView}
      </Row>
    </ScrollView>



    var contentData =
    <Content>
    <Form>
      <Item stackedLabel>
        <Label>Tên khách hàng</Label>
        <Input value={this.state.contactName} onChangeText={(text)=>{
          this.setState({
            contactName:text
          })
        }}/>
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
        <Icon active name="cart" style={{margin:0}}/>
        <Label>Đã giao hàng:</Label>
        <CheckBox style={{margin:10 }}
          color={this.state.isReceived? "#370e63" : "red"}
          checked={this.state.isReceived}
          onPress={() => {
            this.setState({isReceived:!this.state.isReceived});
          }
        }

        />

      </Item>

    </Form>
    <Button disabled={this.state.isSaving} block style={{ margin: 15, marginTop: 50, backgroundColor: (this.state.isSaving ? 'grey' : '#e3b21b')}} onPress={()=>{this.save();}}>
      <Text>Lưu</Text>
    </Button>
    </Content>

    var spin = <Content>
      <Spinner color="#370e63" />
    </Content>

if(this.state.useBarCode && this.state.orderId <=0 && this.state.scannedData == null)
{
    content = barCodeViewContent;
}
else {

  if(this.state.isLoading)
  {
      content = spin;
  }
  else
  {
      content = contentData;
  }
};

    return (
      <Container style={styles.container}>
        <Header androidStatusBarColor='#8b4cce'>
        <Left>
          <Button transparent onPress={() => this.props.navigation.navigate("Orders")}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
          <Body>
            <Title>{this.props.navigation.state.params.orderId > 0 ? 'Sửa đơn hàng' : 'Tạo đơn hàng'}</Title>
          </Body>
          <Right />
        </Header>

        {content}

      </Container>
    );
  }
}

export default OrderEdit;
