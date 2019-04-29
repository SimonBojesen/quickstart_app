import React, { Component } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import Facade from './UserFetch';

export default class ProfileScreen extends Component {
    static navigationOptions = ({
        title: 'Profile',
    });

    constructor(props) {
        super(props);
        this.state = {
            userInfo: ""
        }
    }
    componentDidMount(){
        Facade.fetchData().then(e =>{
            this.setState({ userInfo: e.msg });
        }) 
    }
    logout() {
        Facade.logout();
        this.props.navigation.navigate('Profile').then(alert("You have succesfully been logged out"));
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>{ this.state.userInfo }</Text>
                <Button title="logout" onPress={this.logout}></Button>
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