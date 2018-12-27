import React, { Component } from "react";
import { ImageBackground, View, StatusBar } from "react-native";
import { Container, Button, H3, Text } from "native-base";

import styles from "./styles";

const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../../assets/logo-simple-ordering.png");

class Home extends Component {
  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
          <View style={styles.logoContainer}>

          </View>
          <View
            style={{
              alignItems: "center",
              marginBottom: 50,
              backgroundColor: "transparent"
            }}
          >
            <H3 style={styles.text}>Ứng dụng nhập đơn hàng</H3>
            <View style={{ marginTop: 8 }} />
            <H3 style={styles.text}></H3>
            <View style={{ marginTop: 8 }} />
          </View>
          <View style={{ marginBottom: 80, flexDirection:"row", alignSelf:"center" }}>
            <Button
              style={{ backgroundColor: "#6FAF98", margin:5}}
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Text>Danh mục</Text>
            </Button>

            <Button style={{ backgroundColor: "#6FAF98", margin:5 }}
              onPress={()=> this.props.navigation.navigate("OrderEdit", {orderId:0})}
            >
                <Text>Thêm đơn hàng</Text>
            </Button>
          </View>

        </ImageBackground>
      </Container>
    );
  }
}

export default Home;
