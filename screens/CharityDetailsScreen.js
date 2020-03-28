import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, Modal, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import { Heading, InputWithSubHeading, Icon, Cross, Button } from '../Components'
import { dimens, colors, customFonts, strings, screens } from '../constants'
import { commonStyling } from '../common'
import { PropTypes } from 'prop-types'
import firebase from '../config/firebase'
import { Utils } from '../utils';

class CharityDetailsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
      charityNameEntered: null,
      showImagePicker:false,
      charityDescriptionEntered: null,
      showLoadingDialog: false
    }
  }

  showImageModal = () => this.setState({
    showImagePicker: true
  })


  hideImageModal = () => this.setState({
    showImagePicker: false
  })

  // IMAGE MODAL 
  getImageModal = () => {
    const {
      modalContentContainerStyle,
      modalContainerStyle,
      crossStyle,
      textContainerModal,
      headingModalStyle,
      uploadButtonModal: deleteButtonModal,
      clickButtonModal: cancelButtonModal,
      modalButtonContainer
    } = styles

    return (
      <Modal visible={this.state.showImagePicker} transparent={true} animationType='slide' onBackButtonPress={() => { this.setState({ showImagePicker: false }) }}>
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => { this.setState({ showImagePicker: false }) }}
          style={modalContainerStyle}>
          <TouchableWithoutFeedback>
            <View style={modalContentContainerStyle}>
              <Cross style={crossStyle} onPress={() => { this.setState({ showImagePicker: false }) }} color={colors.grayBlue} size={38} />
              <View style={textContainerModal}>
                <Text style={headingModalStyle}>{strings.chooseUploadImageOption}</Text>
              </View>
              <View style={modalButtonContainer}>
                <Button
                  title='Upload from library'
                  textColor={colors.colorAccent}
                  onPress={null}
                  style={deleteButtonModal} />
                <Button
                  title='Click from camera'
                  textColor={colors.colorAccent}
                  onPress={null}
                  style={cancelButtonModal} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    )
  }

  setCharityNameEntered = (text) => {
    this.setState({
      charityNameEntered: text
    })
  }

  setDescription = (text) => {
    this.setState({
      charityDescriptionEntered: text
    })
  }

  submitButtonOnPress = async () => {
    const {
      charityNameEntered,
      charityDescriptionEntered
    } = this.state

    this.setState({
      showLoadingDialog: true
    })

    const user = firebase.auth().currentUser
    const uid = user.uid
    const charityRef = firebase.firestore().collection('charityOwners')

    await charityRef.doc(uid).update({
      charityName: charityNameEntered,
      charityDescription: charityDescriptionEntered,
      charityImageURL: 'https://screenshotlayer.com/images/assets/placeholder.png'
    })
    this.setState({
      showLoadingDialog: false
    })
    Utils.dispatchScreen(screens.ProfileScreen, 100, this.state.navigation)
  }

  render() {
    const {
      mainContainer,
      headingStyle,
      inputsContainer,
      subHeadingStyle,
      headingContainerStyle,
      allInputsContainer,
      categoryInputContainer,
      categoryContainer,
      categoryTextStyle,
      inputContainerStyle,
      addImageContainer,
      imageContainer,
      imageStyle,
      addButtonStyle,
      buttonContainer,
      errorStyle,
      subTextStyle,
      imageContainerStlye
    } = styles

    const {
      navigation
    } = this.props
    return (
      <View style={mainContainer}>
        <Heading title='Enter details of your charity' headingStyle={headingStyle} />
        <View style={inputsContainer}>
          <InputWithSubHeading
            secureTextEntry={false}
            placeholder="Healthcare Plus"
            autoCorrect={false}
            autoCompleteType='name'
            subHeadingTitle='NGO/Charity Name'
            autoCapitalize='words'
            errorTitle={this.state.nameErrorTitle}
            onChangeText={this.setCharityNameEntered}
            errorStatus={this.state.nameErrorStatus}
            editable={!this.state.submitButtonClicked}
            containerStyle={{ marginTop: 5, marginBottom: 5 }}
            subHeadingStyle={subHeadingStyle} />
          <InputWithSubHeading
            secureTextEntry={false}
            placeholder="We make a difference"
            autoCorrect={false}
            autoCompleteType='name'
            subHeadingTitle='Short Description'
            errorTitle={this.state.nameErrorTitle}
            onChangeText={this.setDescription}
            errorStatus={this.state.nameErrorStatus}
            editable={!this.state.submitButtonClicked}
            containerStyle={{ marginTop: 5, marginBottom: 5 }}
            subHeadingStyle={subHeadingStyle} />
        </View>
        <View style={addImageContainer}>
          <Text style={subHeadingStyle}>Add Image</Text>
          <View style={imageContainer}>
            {this.state.imageUri != null ? (
              <ImageBackground style={imageStyle} imageStyle={imageStyle} source={{ uri: this.state.imageUri }}>
                {this.state.imageHasBeenUploaded
                  ? <TouchableOpacity style={imageContainerStlye} onPress={this.showImageModal} />
                  : null}
                {!this.state.imageHasBeenUploaded
                  ? <Icon onPress={this.showImageModal} nameIOS='ios-add' nameAndroid='md-add' size={60} />
                  : null}
              </ImageBackground>
            ) : (
                <ImageBackground style={imageStyle} imageStyle={imageStyle}>
                  <Icon onPress={this.showImageModal} nameIOS='ios-add' nameAndroid='md-add' size={60} />
                </ImageBackground>
              )}
          </View>
        </View>

        <View style={buttonContainer}>
          <Button
            title={strings.submit}
            onPress={this.submitButtonOnPress}
            style={addButtonStyle}
            textColor={colors.colorAccent}
            isLoading={this.state.showLoadingDialog} />
        </View>

        {this.getImageModal()}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    paddingTop: 55,
    paddingHorizontal: dimens.screenHorizontalMargin
  },
  headingStyle: {
    fontSize: 23,
    color: colors.colorPrimary,
    marginTop: 20,
    fontFamily: customFonts.medium
  },
  inputsContainer: {
    marginTop: 20,
    marginHorizontal: 8,
  },
  subHeadingStyle: {
    marginTop: 16
  },
  uploadButtonStyle: {
    width: '50%',
    backgroundColor: colors.colorPrimary,
    marginTop: dimens.screenSafeUpperNotchDistance,
    marginLeft: dimens.screenHorizontalMargin

  },
  headingContainerStyle: {
    width: '100%',
    textAlign: 'left',
    marginTop: dimens.screenSafeUpperNotchDistance + 70,
    marginLeft: dimens.screenHorizontalMargin
  },
  categoryInputContainer: {
    height: dimens.textInputHeight,
    justifyContent: 'center'
  },
  allInputsContainer: {
    marginLeft: dimens.screenHorizontalMargin + 8,
    marginRight: dimens.screenHorizontalMargin + 8,
  },
  categoryContainer: {
    flexDirection: 'column',
    marginTop: 18,
    borderBottomColor: colors.blackTransluscent,
    borderBottomWidth: dimens.inputTextBorderWidth,
  },
  categoryTextStyle: {
    color: colors.grayTransluscent,
    fontFamily: customFonts.regular,
    fontSize: dimens.inputTextFontSize
  },
  modalContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.blackTransluscent,
    alignItems: 'center'
  },
  modalContentContainerStyle: {
    width: 320,
    height: 260,
    backgroundColor: colors.colorAccent,
    borderRadius: dimens.defaultBorderRadius
  },
  crossStyle: {
    position: 'absolute',
    top: 5,
    right: 20,
  },
  textContainerModal: {
    marginTop: 45,
    width: '100%'
  },
  headingModalStyle: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: customFonts.regular,
    color: colors.grayBlue
  },
  itemNameModal: {
    fontSize: 23,
    width: 290,
    textAlign: 'center',
    fontFamily: customFonts.semiBold,
    color: colors.colorPrimary,
    marginTop: 8
  },
  modalButtonContainer: {
    marginTop: 30,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center'
  },
  uploadButtonModal: {
    width: '80%',
    marginTop: 15,
    height: dimens.buttonHeight,
    backgroundColor: colors.submitGreen
  },
  clickButtonModal: {
    width: '80%',
    marginTop: 15,
    height: dimens.buttonHeight,
    backgroundColor: colors.darkBlue
  },
  inputContainerStyle: {
    marginTop: 18
  },
  imageContainer: {
    width: '100%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    width: 230,
    height: 230,
    borderWidth: 0.4,
    borderRadius: dimens.defaultBorderRadius,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subHeadingStyle: {
    fontSize: 13,
    color: colors.blackTransluscent,
    fontFamily: customFonts.semiBold
  },
  addImageContainer: {
    marginTop: 8,
    padding: 8
  },
  addButtonStyle: {
    backgroundColor: colors.submitGreen,
    width: '90%',
  },
  buttonContainer: {
    marginTop: 40,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorStyle: {
    marginTop: 8
  },
  subTextStyle: {
    fontSize: 13,
    fontFamily: customFonts.regular
  },
  imageContainerStlye: {
    width: '100%',
    height: '100%'
  }
})

CharityDetailsScreen.navigationOptions = {
  header: null
}

CharityDetailsScreen.propTypes = {
  navigation: PropTypes.object
}

export default CharityDetailsScreen