import React, { Component } from "react";
import { ListView } from "react-native";
import { Contacts } from 'expo';
import { Permissions } from 'expo';
import { Platform } from 'react-native';
import { StatusBar} from 'react-native';
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
  Spinner,
  Left,
  Right,
  Body
} from "native-base";
import styles from "./styles";
import Counter from "./counter"

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

  LoadContacts = async ()=>
  {

    const { status } = await Permissions.askAsync(Permissions.CONTACTS);

    if (status !== 'granted') {
        console.log('permission:' + status);
        return;
    }

    const contacts = await Contacts.getContactsAsync({
        fields: [
          Contacts.PHONE_NUMBERS,
          Contacts.EMAILS,
        ],
        pageSize: 100,
        pageOffset: 0,
      });

    var filterData = contacts.data.filter(function(item)
    {
      return item.phoneNumbers.length > 0;
    });

    var simpleData = filterData.map(function(item){
      var phoneNumbersAll = item.phoneNumbers.map(function(phone){
      if(phone.label == 'mobile')
      return 'mobile: ' + phone.number;
      else {
        return phone.number;
      }
      });

      var filterPhoneNumbers = phoneNumbersAll.join(", ");

      return {name:item.name, id:item.id, phone:filterPhoneNumbers};});

    this.setState({
      listViewData:simpleData,
      isLoading:false
    });

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
            <Button style={{backgroundColor:'#370e63'}}>
              <Icon style={{backgroundColor:'#370e63', color:'white'}} name="person" />
            </Button>
          </Left>
          <Body>
            <Text>
              {data.name}
            </Text>
            <Text numberOfLines={1} note>
              {data.phone}
            </Text>
          </Body>

          </ListItem>}

        renderLeftHiddenRow={data =>
          <Button
            full
            onPress={() => this.props.navigation.navigate('OrderEdit', { contactId:data.id })}
            style={{
              backgroundColor: "#CCC",
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon active name="create" style={{color:"#f7931e"}} />
          </Button>}

        leftOpenValue={75}

      />
    </Content>

    var spinner = <Content>
      <Spinner color="#f7931e" />
    </Content>;

    var counter = <Counter/>

    var content = this.state.isLoading? spinner: counter;

    return (
      <Container style={styles.container}>
        <Header searchBar rounded>
        <StatusBar
                            backgroundColor="#3b1069"
                            barStyle="light-content" />
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
