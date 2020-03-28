import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from './screens/SplashScreen';
import { screens } from './constants';
import * as Font from 'expo-font';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ClientCharityScreen from './screens/ClientCharityScreen';
import CreditCardEnterScreen from './screens/CreditCardEnterScreen';
import TransactionDetailsScreen from './screens/TransactionDetailsScreen'
import ClientWelcomeScreen from './screens/ClientWelcomeScreen';
import ClientTransactionScreen from './screens/ClientTransactionScreen';
import ClientHome from './screens/ClientHome';
import CharityDescriptionPage from './screens/CharityDescriptionPage';
import { decode, encode } from 'base-64'
import ProfileScreen from './screens/ProfileScreen';
import CharityDetailsScreen from './screens/CharityDetailsScreen';

global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = byteArray => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } }

if (!global.btoa) { global.btoa = encode; }

if (!global.atob) { global.atob = decode; }


const AppNavigator = createStackNavigator({
  SplashScreen: SplashScreen,
  LoginScreen: LoginScreen,
  RegistrationScreen: RegistrationScreen, 
  WelcomeScreen: WelcomeScreen,
  ClientCharityScreen: ClientCharityScreen,
  CreditCardEnterScreen: CreditCardEnterScreen,
  TransactionDetailsScreen: TransactionDetailsScreen,
  ClientWelcomeScreen: ClientWelcomeScreen,
  ClientTransactionScreen: ClientTransactionScreen,
  ClientHome: ClientHome,
  CharityDescriptionPage: CharityDescriptionPage,
  ProfileScreen: ProfileScreen,
  CharityDetailsScreen: CharityDetailsScreen
},
  {
    initialRouteName: screens.CharityDetailsScreen
  })

const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false,
      isAppReady: false
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),
      'raleway-bold-italic': require('./assets/fonts/Raleway-BoldItalic.ttf'),
      'raleway-extra-bold': require('./assets/fonts/Raleway-ExtraBold.ttf'),
      'raleway-extra-bold-italic': require('./assets/fonts/Raleway-ExtraBoldItalic.ttf'),
      'raleway-italic': require('./assets/fonts/Raleway-Italic.ttf'),
      'raleway-light': require('./assets/fonts/Raleway-Light.ttf'),
      'raleway-light-italic': require('./assets/fonts/Raleway-LightItalic.ttf'),
      'raleway-medium': require('./assets/fonts/Raleway-Medium.ttf'),
      'raleway-medium-italic': require('./assets/fonts/Raleway-MediumItalic.ttf'),
      'raleway-regular': require('./assets/fonts/Raleway-Regular.ttf'),
      'raleway-semi-bold': require('./assets/fonts/Raleway-SemiBold.ttf'),
      'raleway-semi-bold-italic': require('./assets/fonts/Raleway-SemiBoldItalic.ttf'),
      'raleway-thin': require('./assets/fonts/Raleway-Thin.ttf'),
      'raleway-thin-italic': require('./assets/fonts/Raleway-ThinItalic.ttf'),
      'raleway-medium': require('./assets/fonts/Raleway-Medium.ttf')
    });

    this.setState({
      fontLoaded: true,
      isAppReady: true
    })
  }

  render() {
    return this.state.isAppReady
      ? <AppContainer />
      : null
  }
}


App.navigationOptions = {
  header: null
}

export default App
