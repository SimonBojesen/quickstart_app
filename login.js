import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Facade from './UserFetch';

export default class LoginScreen extends Component {
    static navigationOptions = ({
        title: 'Login',
    });

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    login = evt => {
        evt.preventDefault();
        Facade.login(this.state.username, this.state.password);
        this.props.navigation.navigate('Profile');
        //console.log(this.state.username, this.state.password)
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Login Screen</Text>
                <TextInput
                    value="user"
                    placeholder="Enter Username"
                    style={{ width: 200, margin: 10 }}
                    onChangeText={username => this.setState({ username })}
                />

                <TextInput
                    value="userpw"
                    placeholder="Enter Password"
                    style={{ width: 200, margin: 10 }}
                    onChangeText={password => this.setState({ password })}
                />

                <Button
                    title="Submit"
                    onPress={this.login}
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