import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class HomeScreen extends Component {
    static navigationOptions = ({
      title: 'Welcome',
    });
  
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <View style={styles.container}>
          <Text>Welcome to your app, this is your welcome/home page</Text>
          <Button
            title="Go to Login"
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </View>
  
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
      fontSize: 20,
      margin: 10,
      fontWeight: "bold"
    },
    menuContent: {
      color: "#000",
      fontWeight: "bold",
      padding: 2,
      fontSize: 20
    }
  });