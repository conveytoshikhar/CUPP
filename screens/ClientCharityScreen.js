import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground} from 'react-native'
import { colors, customFonts, strings } from '../constants'
import { commonStyling } from '../common' 
import {PropTypes} from 'prop-types'
import {Utils} from '../utils'
import firebase from '../config/firebase'
import screens from '../constants/screens';
import appConfig from '../config/appConfig';

class ClientCharityScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      navigation: props.navigation,
      name: 'ClientCharityScreen'
    }
  }

  navigateToScreen = async (screen) => {
    const user = firebase.auth().currentUser
    const uid = user.uid
    const userRef = firebase.firestore().collection('users')
    const clientRef = firebase.firestore().collection('clients')
    const charityRef = firebase.firestore().collection('charityOwners')

    if(screen === screens.CreditCardEnterScreen) {
      let role = appConfig.userRoleClient
      await userRef.doc(uid).update({
        role: role,
        working: 'wprlog'
      })
      await clientRef.doc(uid).set({
        uid: uid,
        charitableAmount: 123.30,
        transactionsMade: 13,
        chartitiesHelped: 11,
        card: null,
        transactions: []
      })
    }else{
      let role = appConfig.userRoleCharityOwner
      await userRef.doc(uid).update({
        role: role
      })
      await charityRef.doc(uid).set({
        uid: uid,
        amountReceived: 123.30,
        transactionReceived: 13,
        helpers: 11,
        transactions: []
      })
    }
    Utils.dispatchScreen(screen, undefined, this.state.navigation);
  }

  render() {
    const {
      mainContainer,
      upperHalfContainer,
      lowerHalfContainer,
      subText,
      mainText,
      textContainer,
      containerSupplyBG,
      constainerRestaurantOwnerBG
    } = styles

    const screen = 
    <View style={mainContainer}>
      <ImageBackground style={upperHalfContainer} source={require('../assets/Onboarding/supplier.jpg')}>
        <TouchableOpacity 
          style={{...textContainer,...containerSupplyBG}} 
          onPress={() => this.navigateToScreen(screens.CreditCardEnterScreen)}>
          <Text style={subText}> {strings.iWantTo}</Text>
          <Text style={mainText}> {strings.help} </Text>
        </TouchableOpacity>
      </ImageBackground>
      <ImageBackground source={require('../assets/Onboarding/restaurantOwner.jpg')} style={lowerHalfContainer}>
        <TouchableOpacity 
          style={{...textContainer,...constainerRestaurantOwnerBG}}
          onPress={ ()=> this.navigateToScreen(null) }>
          <Text style={subText}> {strings.iRunA} </Text>
          <Text style={mainText}> {strings.ngo} </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
    return screen
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    flexDirection: 'column'
  },
  upperHalfContainer: {
    flex:1,
    backgroundColor: 'black'
  },
  lowerHalfContainer: {
    flex: 1
  },
  subText:{
    fontSize: 28,
    color: colors.colorAccent,
    fontFamily: customFonts.bold,
    position: 'absolute',
    left: 20,
    top: 40
  },
  mainText: {
    fontSize: 60,
    fontFamily: customFonts.extraBold,
    color: colors.colorAccent
  },
  textContainer: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerSupplyBG:{
    backgroundColor: colors.colorPrimaryTransluscent
  },
  constainerRestaurantOwnerBG:{
    backgroundColor: colors.blackTransluscent
  },
  crossStyle:{
    position: 'absolute',
    right: 20,
    top: 32
  }

})


ClientCharityScreen.navigationOptions = {
  header: null
}

ClientCharityScreen.propTypes = {
  navigation: PropTypes.object
}

export default ClientCharityScreen