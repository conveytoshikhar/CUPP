import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native'
import { Card, Heading, Button } from '../Components'
import { dimens, colors, customFonts } from '../constants'
import { commonStyling } from '../common'
import { PropTypes } from 'prop-types'

class TransactionDetailsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
      name: 'Credit Card Enter Screen'
    }
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
      cardHeading,
      cardSubHeading
    } = styles

    const {
      navigation
    } = this.props
    return (
      <View style={mainContainer}>
        <Heading headingStyle={headingStyle} title='Transaction' />
        <View style={creditCardContainer}>
        <Text style={cardHeading}>Starbucks</Text>
        <Text style={cardSubHeading}>FOOD</Text>
          <Card
            width={350}
            height={220}
            elevation={4}>
            <View>

              <View style={cardNumberContainer}>
                <TextInput style={cardNumberInput} />

              </View>
            </View>
          </Card>
        </View>
        <View style={buttonContainer}>
          <Button style={submitButton} textColor={colors.colorAccent} title='Confirm' />
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
    paddingTop: 5
  },
  cardSubHeading: {
    paddingBottom: 5,
    paddingTop: 5,
    fontFamily: customFonts.light,
    textAlign: 'center'
  }
})

TransactionDetailsScreen.navigationOptions = {
  header: null
}

TransactionDetailsScreen.propTypes = {
  navigation: PropTypes.object
}

export default TransactionDetailsScreen