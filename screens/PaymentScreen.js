import React, { Component } from 'react';
import { View, StyleSheet, Text} from 'react-native'
import { Heading} from '../Components'
import { dimens, colors, customFonts } from '../constants'
import { commonStyling } from '../common' 
import {PropTypes} from 'prop-types'

class PaymentScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      navigation: props.navigation,
      item: props.navigation.getParam('course')
    }
  }
  render() {
    const {
      mainContainer,
      headingStyle,
      priceDetailsContainer,
      priceDetail,
      priceType,
      priceValue
    } = styles

    const {
      navigation
    } = this.props

    const {
      item
    } = this.state
    return (
      <View style={mainContainer}>
        <View>
        <Heading headingStyle={headingStyle} title= "Make Payment" />
        </View>
        <View style = {priceDetailsContainer}>
          <View style={priceDetail}>
          <Text style= {priceType}>Price</Text>
          <Text style={priceValue}>{item.price}</Text>
          </View>
          <View style={priceDetail}>
            <Text style={priceType}>Your Credit Score</Text>
            <Text style={priceValue}>{item.price}</Text>
          </View>
          <View style={priceDetail}>
            <Text style={priceType}>Service Charge</Text>
          </View>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headingStyle: {
    fontSize: 25,
    color: colors.colorPrimary,
  },
  priceDetailsContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection:'column',
    justifyContent: 'center'
  },
  priceDetail: {
    alignItems:'center'
    },
    priceType: {
      fontFamily:customFonts.semiBold, 
      fontSize:15
    },
    priceValue:{color:colors.colorPrimary, 
      fontFamily:customFonts.medium, 
      fontSize:20,
      padding: 8
    }
})

PaymentScreen.navigationOptions = {
  title: ''
}

PaymentScreen.propTypes = {
  navigation: PropTypes.object
}

export default PaymentScreen