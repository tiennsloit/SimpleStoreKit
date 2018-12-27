import React, { Component } from "react";
import { ListView } from "react-native";
import { Platform } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Switch,
  Body,
  Spinner
} from "native-base";
import styles from "./styles";

const datas = [

];

class Orders extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      isLoading: true,
      listViewData: datas
    };
  }

  componentDidMount(){
    return fetch('https://simplestorekitws.azurewebsites.net/getlatestorders/10')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson[0].contactId);
        this.setState({
          isLoading: false,
          listViewData: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }
  render() {

    var contentData =
    <Content>
      <List
        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
        renderRow={data =>

          <ListItem icon style={{ paddingLeft: 20 }}>
          <Left>
            <Button style={{ backgroundColor: (data.paid > 0 ? "green" : "red") }}>
              <Icon active name="logo-usd" />
            </Button>
          </Left>
          <Body>
            <Text>
              {data.productType.name}
            </Text>
          </Body>
          <Right>
          {Platform.OS === "ios" && <Icon active name="car" style={{fontSize: 30, color: (data.received > 0 ? 'green' : 'red')}}/>}
          {Platform.OS === "android" && <Icon active name="car" style={{fontSize: 30, color: (data.received > 0 ? 'green' : 'red')}}/>}
          </Right>
          </ListItem>}
        renderLeftHiddenRow={data =>
          <Button
            full
            onPress={() => this.props.navigation.navigate('OrderEdit', { orderId:data.id })}
            style={{
              backgroundColor: "#CCC",
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon active name="create" style={{color:'green'}} />
          </Button>}
        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
          <Button
            full
            danger
            onPress={_ => this.deleteRow(secId, rowId, rowMap)}
            style={{
              backgroundColor: "#CCC",
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon active name="trash"  style={{color:'red'}}/>
          </Button>}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
    </Content>

    var spinner = <Content>
      <Spinner color="green" />
    </Content>;

    var content = this.state.isLoading? spinner: contentData;

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title>Đơn hàng mới nhất</Title>
          </Body>
          <Right>
          <Button transparent onPress={() => this.props.navigation.navigate('OrderEdit', { orderId:0 })}>
            <Icon name="add" />
          </Button>
          </Right>
        </Header>

        {content}

      </Container>
    );
  }
}

export default Orders;
