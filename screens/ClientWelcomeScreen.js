import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import { Heading, Card, Icon } from '../Components'
import { dimens, colors, iconNames, customFonts } from '../constants'
import { commonStyling } from '../common' 
import {PropTypes} from 'prop-types'

class ClientWelcomeScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      navigation: props.navigation
    }
  }
  render() {
    const {
      mainContainer,
      headingStyle,
      personContainer,
      upperCardContainer,
      innerProfileCardContainer,
      denominationContainer,
      denomination,
      denominationSubHeading,
      transactionsMadeContainer,
      innerProfileLowerCardContainer,
      chairitesHelpedContainer
    } = styles

    const {
      navigation
    } = this.props
    return (
      <View style={mainContainer}>
        <Heading headingStyle={headingStyle} title='Welcome' heading/>
        <View style={personContainer}>  
          <Icon nameAndroid={iconNames.personAndroid} nameIOS={iconNames.personIOS} onPress={null} color={colors.colorPrimary}/>
        </View>

        <View style={upperCardContainer}>
          <Card width='90%' height={180} elevation={5}>
            <View style={innerProfileCardContainer}>

                <View style={denominationContainer}>
                  <Text style={denomination}>HKD 123.30</Text>
                  <Text style={denominationSubHeading}>Total Avaiable Charitable Amount</Text>
                </View>

                <View style={innerProfileLowerCardContainer}>
                  <View style={transactionsMadeContainer}>
                    <Text style={denomination}>13</Text>
                    <Text style={denominationSubHeading}>Monthy Transactions</Text>
                  </View>
                  <View style={chairitesHelpedContainer}>
                    <Text style={denomination}>13</Text>
                    <Text style={denominationSubHeading}>Charities Helped</Text>
                  </View>
                </View>
            </View>

          </Card>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
  },
  personContainer: {
    position: 'absolute',
    top: 50,
    right: dimens.screenHorizontalMargin,
    height: 50,
    width: 50,
    borderRadius: 40,
    borderColor: colors.colorPrimary,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headingStyle: {
    color: colors.colorPrimary,
    marginTop: 55,
    marginHorizontal: dimens.screenHorizontalMargin
  },
  upperCardContainer: {
    width: '100%',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerProfileCardContainer: {
    padding: dimens.screenHorizontalMargin,
    justifyContent: 'center',
    alignItems: 'center'
  },
  denominationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: colors.grayTransluscent,
    borderBottomWidth: 0.5,
    paddingBottom: 12,
    width: '100%'
  },
  innerProfileLowerCardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  denomination: {
    color: colors.submitGreen,
    fontSize: 20,
    fontFamily: customFonts.bold
  },
  denominationSubHeading: {
    marginTop: 4,
    fontSize: 13,
    fontFamily: customFonts.regular,
    color: colors.black
  },
  transactionsMadeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: colors.grayTransluscent,
    borderRightWidth: 0.5,
    padding: 20,
    width: '50%'
  },
  chairitesHelpedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '50%'
  }

})

ClientWelcomeScreen.navigationOptions = {
  header: null
}

ClientWelcomeScreen.propTypes = {
  navigation: PropTypes.object
}

export default ClientWelcomeScreen