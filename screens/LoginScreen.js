import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native'
import {
  Card,
  LogoPlaceholder,
  Button,
  SocialButton,
  InputWithSubHeading,
  Back
} from '../Components'
import { dimens, colors, customFonts, strings, screens } from '../constants'
import { commonStyling } from '../common'
import { PropTypes } from 'prop-types'
import firebase from '../config/firebase'
import appConfig from '../config/appConfig';
import { Utils } from '../utils';

class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
      emailEntered: null,
      passwordEntered: null,
      loginButtonLoading: false
    }
  }

  setEmailEntered = (text) => {
    this.setState({
      emailEntered: text
    })
  }

  setPasswordEntered = (text) => {
    this.setState({
      passwordEntered: text
    })
  }


  initiateLogin = () => {
    const {
      emailEntered,
      passwordEntered
    } = this.state

    this.setState({
      loginButtonLoading: true
    })
    this.performLogin(emailEntered, passwordEntered)
  }

  async performLogin(email, password) {
    await firebase.auth().signOut()
    await firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
      let errorCode = error.code
      let errorMessage = error.message
      if (error) {
        alert(errorMessage)
        this.setState({
          loginButtonLoading: false
        })
      }
    }).then((loginObject) => {
      if (loginObject && loginObject.user) {
        this.onSuccessfulLogin()
      }
    })
  }

  onSuccessfulLogin = async () => {
    //login has been enabled, check here for the missing props of user and redirect accordingly
    console.log('On successfulk lofin called')
    const user = firebase.auth().currentUser
    const firestore = firebase.firestore()
    const userRef = firestore.collection('users')
    const userID = user.uid
    let userFirestore = null
    let screenToNavigate = null
    await userRef.doc(userID).get().then((doc) => doc.exists ? userFirestore = doc.data() : null)
    if (userFirestore) {
      const role = userFirestore.role
      if (role === appConfig.userRoleClient) {
        screenToNavigate = screens.ClientHome
      }else{
        //change later
        screenToNavigate = screens.ProfileScreen 
      }
      this.setState({
        loginButtonLoading: false
      })
      Utils.dispatchScreen(screenToNavigate, undefined, this.state.navigation)
    } else {
      alert('User has been deleted from our database, please register again!')
      this.setState({
        loginButtonLoading: false
      })
    }
  }

  

  render() {
    const {
      mainContainer,
      logoContainer,
      contentContainer,
      logo,
      socialContainer,
      socialButton,
      orStyling,
      orContainer,
      thinLine,
      loginDetailsContainer,
      textInputContainer,
      subText,
      forgotPasswordText,
      submitButton,
      registerContainer,
      registerText,
      registerTextSubtext
    } = styles

    const {
      navigation
    } = this.props

    const screen =
      <KeyboardAvoidingView behavior="padding" enabled style={mainContainer} >
        <ScrollView style={mainContainer}>

          <View style={logoContainer}>
            <Back
              style={{ ...commonStyling.backButtonStyling }}
              onPress={() => navigation.goBack()} />

            <LogoPlaceholder accent={colors.colorPrimary} size={44} iconSize={32} iconMargin={12} />
          </View>

          <View style={contentContainer}>
            <View style={loginDetailsContainer}>
              <InputWithSubHeading
                subHeadingTitle={strings.emailSubHeading}
                placeholder={strings.emailPlaceholderText}
                secureTextEntry={false}
                errorStatus={this.state.emailErrorStatus}
                subHeadingStyle={subText}
                onChangeText={this.setEmailEntered}
                inputValue={this.state.emailEntered}
                errorTitle={this.state.emailErrorReason}
                textInputContainerStyle={textInputContainer}
                autoCompleteType='email'
              />

              <InputWithSubHeading
                subHeadingTitle={strings.passwordSubHeading}
                placeholder={strings.passwordPlaceholderText}
                secureTextEntry={true}
                subHeadingStyle={subText}
                errorStatus={this.state.passwordErrorStatus}
                onChangeText={this.setPasswordEntered}
                errorTitle={this.state.passwordErrorReason}
                inputValue={this.state.passwordEntered}
                autoCompleteType='password'
                textInputContainerStyle={textInputContainer} />


              <Button
                title={strings.login}
                textColor={colors.colorAccent}
                onPress={this.initiateLogin}
                isLoading={this.state.loginButtonLoading}
                style={submitButton} />

            </View>

            <View style={registerContainer}>
              <Text style={registerTextSubtext}>{strings.dontHaveAnAccount}</Text>
              <TouchableOpacity onPress={() => navigation.navigate(screens.RegistrationScreen)}>
                <Text style={registerText}> {strings.registerNow}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    return screen
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    flexDirection: 'column'
  },
  logoContainer: {
    flex: 1,
    paddingTop: dimens.screenSafeUpperNotchDistance + 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: dimens.logoWidthOnboarding,
    height: dimens.logoHeightOnboarding,
    borderColor: colors.colorPrimary,
    borderWidth: 1
  },
  contentContainer: {
    flex: 2,
    marginTop: 40
  },
  socialContainer: {
    width: '100%',
    height: dimens.buttonHeight,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  socialButton: {
    width: '100%',
  },
  orStyling: {
    color: colors.blackTransluscent,
    fontSize: 18,
    marginHorizontal: 10,
    fontFamily: customFonts.regular
  },
  orContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 40
  },
  thinLine: {
    height: dimens.thinLine,
    backgroundColor: colors.blackTransluscent,
    width: '40%'
  },
  loginDetailsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: '10%',
    paddingRight: '10%'
  },
  textInputContainer: {
    borderBottomColor: colors.blackTransluscent,
  },
  subText: {
    marginTop: 30
  },
  forgotPasswordText: {
    marginTop: 8,
    textAlign: 'right',
    fontSize: 16,
    fontFamily: customFonts.semiBold,
    color: colors.colorPrimary
  },
  submitButton: {
    backgroundColor: colors.colorPrimary,
    marginTop: 40,
    width: '100%'
  },
  loginText: {
    color: colors.colorAccent,
    fontSize: 18,
    fontFamily: customFonts.medium
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  registerText: {
    fontSize: 16,
    fontFamily: customFonts.semiBold,
    color: colors.colorPrimary
  },
  registerTextSubtext: {
    fontSize: 16,
    color: colors.blackTransluscent,
    fontFamily: customFonts.medium
  }

})


LoginScreen.navigationOptions = {
  header: null

}

LoginScreen.propTypes = {
  navigation: PropTypes.object
}

export default LoginScreen