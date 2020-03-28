import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Back, Heading, InputWithSubHeading, Button } from '../Components'
import { dimens, colors, strings, screens } from '../constants'
import { commonStyling } from '../common'
import {PropTypes} from 'prop-types'
import firebase from '../config/firebase'
import appConfig from '../config/appConfig'
import { Utils } from '../utils';

class RegistrationScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      navigation: props.navigation,
      nameEntered: appConfig.DEBUG_MODE ? 'Shikhar Khandelwal' : '',
      emailEntered: appConfig.DEBUG_MODE ? 'conveytoshikhar@gmail.com' : '',
      passwordEntered: appConfig.DEBUG_MODE ? '1234567890' : '',
      confirmationPasswordEntered: appConfig.DEBUG_MODE ? '1234567890' : '',
      submitButtonClicked: false,
      showLoadingDialog: false,
      navigation: this.props.navigation,
      nameErrorTitle: '',
      nameErrorStatus: false,
      emailErrorTitle: '',
      emailErrorStatus: false,
      passwordErrorTitle: '',
      passwordErrorStatus: false,
      confirmationPasswordTitle: '',
      confirmationPasswordStatus: false
    }
  }

  setEmailEntered = (text) => {
    this.setState({
      emailEntered: text
    })
  }

  setNameEntered = (text) => {
    this.setState({
      nameEntered: text
    })
  }

  setPasswordEntered = (text) => {
    this.setState({
      passwordEntered: text
    })
  }

  setConfirmationPasswordEntered = (text) => {
    this.setState({
      confirmationPasswordEntered: text
    })
  }


  submitButtonOnClick = () => {
    const {
      nameEntered,
      emailEntered,
      passwordEntered,
      confirmationPasswordEntered
    } = this.state

    this.setState({
      showLoadingDialog: true,
      submitButtonClicked: true
    })

    this.performRegistration()

  }

  performRegistration() {

    const {
      emailEntered,
      passwordEntered,
    } = this.state

    console.log(this.state)

    firebase
      .auth()
      .createUserWithEmailAndPassword(emailEntered, passwordEntered)
      .then((user) => this.successfulRegistration(user))
      .catch((error) => this.registrationFailure(error))

  }

  successfulRegistration = async (_) => {

    await firebase.auth().currentUser.updateProfile({
      displayName: this.state.nameEntered
    })

    await this.writeUserToFireStore()

    this.setState({
      showLoadingDialog: false
    }, () => { Utils.dispatchScreen(screens.ClientCharityScreen, undefined, this.state.navigation) })

  }

  registrationFailure = (error) => {
    this.setState({
      showLoadingDialog: false,
      submitButtonClicked: false
    })
    alert(error)
  }

  writeUserToFireStore = async () => {

    const firestore = firebase.firestore()
    const ref = firestore.collection('users')
    const user = firebase.auth().currentUser

    await ref.doc(user.uid).set({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      role: null,
    })


  }





  render() {
    const {
      mainContainer,
      headingContainerStyle,
      buttonStyle,
      allInputsContainer,
      subHeadingStyle,
      termsStyle,
      tandcContainer,
      termsContainer,
      tandcText
    } = styles

    const {
      navigation
    } = this.props

    const screen =
      <View style={mainContainer}>
        <Back
          style={{ ...commonStyling.backButtonStyling }}
          onPress={() => navigation.goBack()} />

        <Heading
          title={strings.registerWithUs}
          containerStyle={headingContainerStyle} />

        <View style={allInputsContainer}>
          <InputWithSubHeading
            secureTextEntry={false}
            placeholder={strings.namePlaceholderText}
            autoCorrect={false}
            autoCompleteType='name'
            subHeadingTitle={strings.fullNameSubHeading}
            autoCapitalize='words'
            errorTitle={this.state.nameErrorTitle}
            onChangeText={this.setNameEntered}
            errorStatus={this.state.nameErrorStatus}
            editable={!this.state.submitButtonClicked}
            containerStyle={{ marginTop: 5, marginBottom: 5 }}
            subHeadingStyle={subHeadingStyle} />


          <InputWithSubHeading
            secureTextEntry={false}
            placeholder={strings.emailPlaceholderText}
            autoCompleteType='email'
            subHeadingTitle={strings.emailSubHeading}
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='email-address'
            errorTitle={this.state.emailErrorTitle}
            onChangeText={this.setEmailEntered}
            errorStatus={this.state.emailErrorStatus}
            editable={!this.state.submitButtonClicked}
            subHeadingStyle={subHeadingStyle} />

          <InputWithSubHeading
            secureTextEntry={true}
            autoCompleteType='password'
            placeholder={strings.passwordPlaceholderText}
            subHeadingTitle={strings.passwordSubHeading}
            autoCorrect={false}
            autoCapitalize='none'
            errorTitle={this.state.passwordErrorTitle}
            onChangeText={this.setPasswordEntered}
            errorStatus={this.state.passwordErrorStatus}
            editable={!this.state.submitButtonClicked}
            subHeadingStyle={subHeadingStyle} />


          <InputWithSubHeading
            secureTextEntry={true}
            autoCompleteType='password'
            placeholder={strings.confirmPasswordPlaceholderText}
            subHeadingTitle={strings.confirmPasswordSubHeading}
            autoCorrect={false}
            autoCapitalize='none'
            errorTitle={this.state.confirmPasswordErrorTitle}
            onChangeText={this.setConfirmationPasswordEntered}
            errorStatus={this.state.confirmPasswordErrorStatus}
            editable={!this.state.submitButtonClicked}
            subHeadingStyle={subHeadingStyle} />
        </View>


        <Button
          title={strings.register}
          textColor={colors.colorAccent}
          style={buttonStyle}
          isLoading={this.state.showLoadingDialog}
          onPress={this.submitButtonOnClick} />

        <View style={termsContainer}>
          <Text style={termsStyle}>
            {strings.registeringWithAppHeadline}
          </Text>
          <View style={tandcContainer}>
            <TouchableOpacity onPress={() => navigation.navigate(screens.SupplierRestaurantScreen)}>
              <Text style={tandcText}> {strings.termsAndConditions} </Text>
            </TouchableOpacity>
            <Text style={termsStyle}> {strings.and} </Text>
            <TouchableOpacity>
              <Text style={tandcText}> {strings.privacyPolicy} </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>

    return screen
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    alignItems: 'center',
    paddingLeft: dimens.screenHorizontalMargin,
    paddingRight: dimens.screenHorizontalMargin
  },
  backButtonStyle: {
    ...commonStyling.backButtonStyling
  },
  headingContainerStyle: {
    width: '100%',
    textAlign: 'left',
    marginTop: dimens.screenSafeUpperNotchDistance + 70
  },
  buttonStyle: {
    width: '90%',
    backgroundColor: colors.colorPrimary,
    marginTop: 35
  },
  subHeadingStyle: {
    marginTop: 16
  },
  termsStyle: {
    textAlign: 'center',
    fontSize: 15,
    color: colors.blackTransluscent
  },
  allInputsContainer: {
    width: '100%',
    padding: 8,
    marginTop: 20,
    marginBottom: 10
  },
  tandcContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 2,
    alignItems: 'center'
  },
  tandcText: {
    fontSize: 15,
    color: colors.colorPrimary
  },
  termsContainer: {
    marginTop: 8
  }
})

RegistrationScreen.navigationOptions = {
  header: null
}

RegistrationScreen.propTypes = {
  navigation: PropTypes.object
}

export default RegistrationScreen