import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ImageBackground } from 'react-native'
import { Icon, Card, Button } from '../Components'
import { dimens, colors, iconNames, customFonts } from '../constants'
import { commonStyling } from '../common'
import { PropTypes } from 'prop-types'
import { ScrollView } from 'react-native-gesture-handler';

class CharityDescriptionPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
      item: props.navigation.getParam('charity')
    }
  }
  render() {
    const {
      mainContainer,
      headerContainer,
      backButton,
      charityName,
      descriptionHeading,
      descriptionPara,
      buttonContainer,
      submitButton
    } = styles

    const {
      navigation
    } = this.props

    const {
      item
    } = this.state

    return (
      <View style={mainContainer}>
        <Icon nameAndroid={iconNames.backAndroid} nameIOS={iconNames.backIOS} style={backButton} color={colors.colorAccent} size={40} onPress={ () => navigation.goBack()} />
        <View style={headerContainer}>
          <Text style={charityName}>{item.name}</Text>
          <Card width={220} height={220} elevation={4}>

          </Card>
        </View>

        <Text style={descriptionHeading}>About: </Text>
        <ScrollView contentContainerStyle={{ height: 350 }}>
          <Text style={descriptionPara}>
            {item.shortDescription}
          </Text>
        </ScrollView>
        <View style={buttonContainer}>
          <Button title='Donate' style={submitButton} style={submitButton} textColor={colors.colorAccent} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
  },
  headerContainer: {
    backgroundColor: colors.colorPrimary,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 170
  },
  backButton: {
    position: 'absolute',
    top: 40,
    zIndex: 20,
    left: dimens.screenHorizontalMargin
  },
  charityName: {
    fontSize: 24,
    fontFamily: customFonts.bold,
    color: colors.colorAccent,
    textAlign: "center",
    marginBottom: 20
  },
  descriptionHeading: {
    fontSize: 20,
    fontFamily: customFonts.bold,
    color: colors.colorPrimary,
    marginHorizontal: dimens.screenHorizontalMargin,
    marginTop: 110
  },
  descriptionPara: {
    fontSize: 16,
    fontFamily: customFonts.regular,
    color: colors.black,
    margin: dimens.screenHorizontalMargin
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40
  },
  submitButton: {
    width: '90%',
    backgroundColor: colors.colorPrimary
  }

})

CharityDescriptionPage.navigationOptions = {
  header: null
}

CharityDescriptionPage.propTypes = {
  navigation: PropTypes.object
}

export default CharityDescriptionPage