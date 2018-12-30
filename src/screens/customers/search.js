import React, { Component } from "react";
import { ListView } from "react-native";
import { Contacts, Permissions } from 'expo';
import {
  Container,
  Header,
  Button,
  Icon,
  Item,
  Input,
  Content,
  List,
  ListItem,
  Text,
  Spinner
} from "native-base";
import styles from "./styles";

const data = [

];

class CustomerSearch extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      contactsList: [],
      isLoading: true,
      listViewData: [],
      hasContactPermission:null
    };

  }

  _requestContactPermission =  async () => {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    this.setState({
      hasContactPermission: status === 'granted',
    });
  };

  LoadContacts = ()=>{

    this._requestContactPermission();

    if(this.state.hasContactPermission == true)
    {
      const { data } = Contacts.getContactsAsync({
        fields: [Contacts.Fields],
      });

      if (data.length > 0) {

        this.setState({
          listViewData: data,
        });

      }
    }
  }

  componentDidMount(){

    this.LoadContacts();
  }

  render() {

    var contentData =
    <Content>
      <List
        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
        renderRow={data =>

          <ListItem icon style={{ paddingLeft: 20 }}>
          <Left>
            <Button>
              <Icon active name="logo-usd" />
            </Button>
          </Left>
          <Body>
            <Text>
              {data.PhoneNumbers}
            </Text>
            <Text numberOfLines={1} note>
              {data.Name}
            </Text>
          </Body>
          <Right>
          {Platform.OS === "ios" && <Icon active name="car" style={{fontSize: 30}}/>}
          {Platform.OS === "android" && <Icon active name="car" style={{fontSize: 30}}/>}
          </Right>
          </ListItem>}
        renderLeftHiddenRow={data =>
          <Button
            full
            onPress={() => this.props.navigation.navigate('OrderEdit', { orderId:data.Name })}
            style={{
              backgroundColor: "#CCC",
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon active name="create" style={{color:"#f7931e"}} />
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
      <Spinner color="#f7931e" />
    </Content>;

    var content = this.state.isLoading? spinner: contentData;

    return (
      <Container style={styles.container}>
        <Header searchBar rounded>
          <Item>
            <Icon active name="search" />
            <Input placeholder="Search" />
            <Icon active name="people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>

        {content}

      </Container>

    );
  }
}

export default CustomerSearch;
