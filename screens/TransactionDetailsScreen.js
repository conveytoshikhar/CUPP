import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, ImageBackground } from 'react-native'
import { Card, Heading, Button } from '../Components'
import { dimens, colors, customFonts } from '../constants'
import { commonStyling } from '../common'
import { PropTypes } from 'prop-types'

class TransactionDetailsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
      name: 'Transaction Details Screen'
    }
  }
  render() {
    const {
      mainContainer,
      headingStyle,
      itemDetailsContainer,
      buttonContainer,
      submitButton,
      cardNumberContainer,
      cardNumberInput,
      cardHeading,
      cardSubHeading,
      imageStyling,
      priceDetailsContainer,
      priceDetail,
      priceValue,
      priceType,
      charityDetailsContainer
    } = styles

    const {
      navigation
    } = this.props
    return (
      <View style={mainContainer}>
        <Heading headingStyle={headingStyle} title='Transaction' />
        <View style={itemDetailsContainer}>
        <Text style={cardHeading}>Starbucks</Text>
        <Text style={cardSubHeading}>FOOD</Text>
          <Card
            width= {350}
            height={200}
            elevation={4}>
            <View>
             <ImageBackground source={require('../assets/User/starbucks.jpg')} 
             imageStyle={imageStyling}
             style={imageStyling}  
              >
             </ImageBackground>
            </View>
          </Card>
        </View>
        <View style = {priceDetailsContainer}>
          <View style={priceDetail}>
            <Text style={priceValue}>$ 3.26</Text>
            <Text style= {priceType}>Price</Text>
          </View>
          <View style={priceDetail}>
            <Text style={priceValue}>$ 4.00</Text>
            <Text style={priceType}>Paid</Text>
          </View>
          <View style={priceDetail}>
            <Text style={priceValue}>$ 0.74</Text>
            <Text style={priceType}>Change</Text>
          </View>
        </View>
        <View style = {charityDetailsContainer}>
          
        </View>

        <View style={buttonContainer}>
          <Button style={submitButton} textColor={colors.colorAccent} title='Back' />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    paddingTop: 40,
    paddingLeft: dimens.screenDefaultMargin,
    paddingRight: dimens.screenDefaultMargin,
  },
  headingStyle: {
    fontSize: 25,
    color: colors.colorPrimary,
    marginTop: 20,
  },
  itemDetailsContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  priceDetailsContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection:'row',
    justifyContent: 'center'
  },
  charityDetailsContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection:'row',
    justifyContent: 'center'
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  submitButton: {
    width: '90%',
    backgroundColor: colors.colorPrimary
  },
  cardNumberContainer: {
    flexDirection: 'row'
  },
  cardNumberInput: {
    width: 120,
    fontFamily: customFonts.regular
  },
  cardHeading: {
    fontFamily: customFonts.semiBold,
    textAlign: 'center',
    fontSize: 20,
    color: colors.colorPrimary
  },
  cardSubHeading: {
    paddingBottom: 8,
    paddingTop: 8,
    fontFamily: customFonts.regular,
    textAlign: 'center'
  },
  imageStyling: {
    width: 350,
    height: 200,
    borderRadius: dimens.defaultBorderRadius,
  },
  priceValue:{color:colors.colorPrimary, 
    fontFamily:customFonts.medium, 
    fontSize:20,
    padding: 8
  },
  priceDetail: {
  flex:1, 
  alignItems:'center'
  },
  priceType: {
    fontFamily:customFonts.semiBold, 
    fontSize:15
  }
})

TransactionDetailsScreen.navigationOptions = {
  header: null
}

TransactionDetailsScreen.propTypes = {
  navigation: PropTypes.object
}

export default TransactionDetailsScreen