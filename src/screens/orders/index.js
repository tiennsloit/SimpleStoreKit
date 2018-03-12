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
  Body
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
          <Right />
        </Header>

        <Content>
          <List
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>

              <ListItem icon style={{ paddingLeft: 20 }}>
              <Left>
                <Button style={{ backgroundColor: "red" }}>
                  <Icon active name="logo-usd" />
                </Button>
              </Left>
              <Body>
                <Text>
                  {data.productType.name}
                </Text>
              </Body>
              <Right>
              {Platform.OS === "ios" && <Icon active name="car" style={{fontSize: 30, color: 'red'}}/>}
              {Platform.OS === "android" && <Icon active name="car" style={{fontSize: 30, color: 'red'}}/>}
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
                <Icon active name="information-circle" />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button
                full
                danger
                onPress={_ => this.deleteRow(secId, rowId, rowMap)}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon active name="trash" />
              </Button>}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
        </Content>
      </Container>
    );
  }
}

export default Orders;
