import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { Heading, Button } from '../Components'
import { dimens, colors, customFonts, screens } from '../constants'
import { commonStyling } from '../common'
import { PropTypes } from 'prop-types'
import LottieView from 'lottie-react-native';
import { Utils } from '../utils';

class OrderSuccessScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
      name: 'OrderSuccessScreen'
    }
  }

  componentDidMount() {
    this.animation.play();
  }

  navigateToCourseScreen = () => {
    Utils.dispatchScreen(screens.ClientHome, 100, this.state.navigation)
  }


  render() {
    const {
      mainContainer,
      processingText,
      successContainer,
      headingContainerStyle,
      buttonContainerModal,
      deleteButtonModal,
      textContainer
    } = styles

    const {
      navigation
    } = this.props

    return (
      <View style={mainContainer}>
        <View style={successContainer}>
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            onAnimationFinish={null}
            loop={false}
            source={require('../assets/animations/success.json')}
            width={300}
            height={300}
          />


        </View>
        <View style={textContainer}>
          <Text style={processingText}>Order has been submitted for processing!</Text>
        </View>
        <View style={buttonContainerModal}>
          <Button
            title='Return to Home'
            textColor={colors.colorAccent}
            onPress={this.navigateToCourseScreen}
            style={deleteButtonModal}
            isLoading={this.state.paymentButtonLoading} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    paddingTop: 10,
    paddingLeft: dimens.screenDefaultMargin,
    paddingRight: dimens.screenDefaultMargin,
  },
  processingText: {
    color: colors.colorPrimary,
    fontFamily: customFonts.bold,
    fontSize: 20,
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'

  },
  successContainer: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 40,
    marginTop: 200,
    justifyContent: 'center',
    paddingBottom: 30
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 250,
    justifyContent: 'center',
    padding: 40

  },
  headingContainerStyle: {
    width: '100%',
    textAlign: 'center',
    marginTop: dimens.screenSafeUpperNotchDistance + 70
  },
  buttonContainerModal: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  deleteButtonModal: {
    width: '90%',
    marginTop: 18,
    height: dimens.buttonHeight,
    backgroundColor: colors.colorPrimary
  },
})

OrderSuccessScreen.navigationOptions = {
  header: null
}

OrderSuccessScreen.propTypes = {
  navigation: PropTypes.object
}

export default OrderSuccessScreen