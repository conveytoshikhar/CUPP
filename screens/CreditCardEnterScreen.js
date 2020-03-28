import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native'
import { Card, Heading, Button } from '../Components'
import { dimens, colors, customFonts } from '../constants'
import { commonStyling } from '../common'
import { PropTypes } from 'prop-types'

class CreditCardEnterScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
      name: 'Credit Card Enter Screen'
    }
  }

  onSubmitButtonPressed = () => {

  }
  render() {
    const {
      mainContainer,
      headingStyle,
      creditCardContainer,
      buttonContainer,
      submitButton,
      cardNumberContainer,
      cardNumberInput,
      cardNumberOuterContainer,
      cardNumberHeading,
      cvvContainer,
      nameInput
    } = styles

    const {
      navigation
    } = this.props
    
    return (
      <View style={mainContainer}>
        <Heading headingStyle={headingStyle} title='Hi, Enter your card details: ' />
        <View style={creditCardContainer}>
          <Card
            width={350}
            height={250}
            elevation={4}>

            <View style={cardNumberOuterContainer}>
              <Text style={cardNumberHeading}>Name on Card</Text>
              <View style={cardNumberContainer}>
                <TextInput style={nameInput} secureTextEntry={false} placeholder='John Doe' />
              </View>
            </View>

            <View style={cardNumberOuterContainer}>
              <Text style={cardNumberHeading}>Card Number</Text>
              <View style={cardNumberContainer}>
                <TextInput style={cardNumberInput} maxLength={4} placeholder='1234' />
                <Text>/</Text>
                <TextInput style={cardNumberInput} maxLength={4} placeholder='1234' />
                <Text>/</Text>
                <TextInput style={cardNumberInput} maxLength={4} placeholder='1234' />
                <Text>/</Text>
                <TextInput style={cardNumberInput} maxLength={4} placeholder='1234' />
              </View>
            </View>

            <View style={cardNumberOuterContainer}>
              <View style={cvvContainer}>
                <View>
                  <Text style={cardNumberHeading}>Expiry</Text>
                  <View style={cardNumberContainer}>
                    <TextInput style={cardNumberInput} maxLength={2} placeholder='12' />
                    <Text>/</Text>
                    <TextInput style={cardNumberInput} maxLength={4} placeholder='2022' />
                  </View>
                </View>

                <View>
                  <Text style={cardNumberHeading}>CVV</Text>
                  <View style={cardNumberContainer}>
                    <TextInput style={cardNumberInput} maxLength={3} secureTextEntry={true} placeholder='888' />
                  </View>
                </View>

              </View>
            </View>
          </Card>
        </View>
        <View style={buttonContainer}>
          <Button style={submitButton} textColor={colors.colorAccent} title='Confirm' onPress={() => this.submitButtonPressed()}/>
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
  creditCardContainer: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  nameInput: {
    width: '90%',
    paddingBottom: 4,
    paddingTop: 4,
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 8,
    marginRight: 8,
    textAlign: 'left',
    fontSize: 20,
    borderBottomColor: colors.grayTransluscent,
    borderBottomWidth: 1,
    fontFamily: customFonts.regular
  },
  submitButton: {
    width: '90%',
    backgroundColor: colors.colorPrimary
  },
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardNumberInput: {
    width: 63,
    paddingBottom: 4,
    paddingTop: 4,
    marginLeft: 8,
    marginRight: 8,
    textAlign: 'center',
    fontSize: 20,
    borderBottomColor: colors.grayTransluscent,
    borderBottomWidth: 1,
    fontFamily: customFonts.regular
  },
  cvvContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'space-between'
  },
  cardNumberOuterContainer: {
    marginTop: 18,
    padding: 4
  },
  cardNumberHeading: {
    fontSize: 14,
    marginLeft: 12,
    fontFamily: customFonts.medium,
    color: colors.colorPrimary
  }
})

CreditCardEnterScreen.navigationOptions = {
  header: null
}

CreditCardEnterScreen.propTypes = {
  navigation: PropTypes.object
}

export default CreditCardEnterScreen