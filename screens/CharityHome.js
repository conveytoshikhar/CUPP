import React from 'react';
import { colors } from '../constants'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';
import ClientTransactionScreen from './ClientTransactionScreen';
import CharityWelcomeScreen from './CharityWelcomeScreen';


const CharityHome = createBottomTabNavigator(
    {
      Home: {
        screen: CharityWelcomeScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon name="home" size={25} color={tintColor} />
          )
        }
      },
      Transactions: {
        screen: ClientTransactionScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon name="person-outline" size={25} color={tintColor} />
          )
        }
      },
    },
    {
      initialRouteName: 'Home',
      tabBarOptions: {
        activeTintColor: colors.colorPrimary
      }
    }
  );

CharityHome.navigationOptions = {
  header: null
}
export default CharityHome