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
import { dimens, colors, customFonts, strings } from '../constants'
import { commonStyling } from '../common' 
import {PropTypes} from 'prop-types'

class LoginScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      navigation: props.navigation,
      name: 'LoginScreen'
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

            <LogoPlaceholder accent={colors.colorPrimary} size={44} />
          </View>

          <View style={contentContainer}>

            <View style={socialContainer}>
              <Card
                width={dimens.logoWidthOnboarding}
                height={dimens.buttonHeight}
                elevation={10}>
                <SocialButton
                  title={strings.facebook}
                  icon='logo-facebook'
                  iconColor={colors.facebookBlue}
                  style={socialButton}
                  onPress={this.loginWithFacebook} />
              </Card>
            </View>

            <View style={orContainer}>
              <View style={thinLine} />
              <Text style={orStyling}> {strings.or} </Text>
              <View style={thinLine} />
            </View>

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


              <TouchableOpacity onPress={() => navigation.navigate(screens.ForgotPasswordScreen)}>
                <Text style={forgotPasswordText}> {strings.forgotPassword} </Text>
              </TouchableOpacity>

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
    paddingTop: dimens.screenSafeUpperNotchDistance + 40,
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