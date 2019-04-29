import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";


import HomeScreen from './home';
import LoginScreen from './login';
import ProfileScreen from './profile';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Profile: ProfileScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
