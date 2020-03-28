import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native'
import { Card, Heading, Button } from '../Components'
import { dimens, colors, customFonts, screens } from '../constants'
import { commonStyling } from '../common'
import { PropTypes } from 'prop-types'
import firebase from '../config/firebase'
import { Utils } from '../utils';

class CreditCardEnterScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
      nameEntered: '',
      cvvEntered: '',
      monthOfExpiryEntered: '',
      yearOfExpiryEntered: '',
      card1: '',
      card2: '',
      card3: '',
      card4: '',
      buttonLoading: false
    }

    const user = firebase.auth().currentUser
    const uid = user.uid
  }


  onSubmitButtonPressed = async () => {
    this.setState({buttonLoading: true})
    const {
      card1,
      card2,
      card3,
      card4,
      cvvEntered,
      monthOfExpiryEntered,
      yearOfExpiryEntered,
      nameEntered
    } = this.state

    const expiryDate = monthOfExpiryEntered+'/'+yearOfExpiryEntered
    const cardNumber = card1+'/'+card2+'/'+card3+'/'+card4

    const user = firebase.auth().currentUser
    const uid = user.uid
    const clientRef = firebase.firestore().collection('clients')

    await clientRef.doc(uid).update({
      card: {
        cardNumber: cardNumber,
        nameOnCard: nameEntered,
        expiryDate: expiryDate,
        cvv: cvvEntered
      }
    })

   Utils.dispatchScreen(screens.ClientHome, 100, this.state.navigation)
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
        <Heading headingStyle={headingStyle} title='Add your Credit Card:' />
        <View style={creditCardContainer}>
          <Card
            width={350}
            height={250}
            elevation={4}>

            <View style={cardNumberOuterContainer}>
              <Text style={cardNumberHeading}>Name on Card</Text>
              <View style={cardNumberContainer}>
                <TextInput style={nameInput} secureTextEntry={false} placeholder='John Doe' onChangeText={ (text) => {this.setState({nameEntered: text})} } />
              </View>
            </View>

            <View style={cardNumberOuterContainer}>
              <Text style={cardNumberHeading}>Card Number</Text>
              <View style={cardNumberContainer}>
                <TextInput style={cardNumberInput} maxLength={4} placeholder='1234' onChangeText={ (text) => {this.setState({card1: text})} }/>
                <Text>/</Text>
                <TextInput style={cardNumberInput} maxLength={4} placeholder='1234' onChangeText={ (text) => {this.setState({card2: text})} } />
                <Text>/</Text>
                <TextInput style={cardNumberInput} maxLength={4} placeholder='1234' onChangeText={ (text) => {this.setState({card3: text})} } />
                <Text>/</Text>
                <TextInput style={cardNumberInput} maxLength={4} placeholder='1234' onChangeText={ (text) => {this.setState({card4: text})} }/>
              </View>
            </View>

            <View style={cardNumberOuterContainer}>
              <View style={cvvContainer}>
                <View>
                  <Text style={cardNumberHeading}>Expiry</Text>
                  <View style={cardNumberContainer}>
                    <TextInput style={cardNumberInput} maxLength={2} placeholder='12' onChangeText={ (text) => {this.setState({monthOfExpiryEntered: text})} }/>
                    <Text>/</Text>
                    <TextInput style={cardNumberInput} maxLength={4} placeholder='2022' onChangeText={ (text) => {this.setState({yearOfExpiryEntered: text})} }/>
                  </View>
                </View>

                <View>
                  <Text style={cardNumberHeading}>CVV</Text>
                  <View style={cardNumberContainer}>
                    <TextInput style={cardNumberInput} maxLength={3} secureTextEntry={true} placeholder='888' onChangeText={ (text) => {this.setState({cvvEntered:text})} } />
                  </View>
                </View>

              </View>
            </View>
          </Card>
        </View>
        <View style={buttonContainer}>
          <Button style={submitButton} textColor={colors.colorAccent} title='Confirm' onPress={this.onSubmitButtonPressed} isLoading={this.state.buttonLoading}/>
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