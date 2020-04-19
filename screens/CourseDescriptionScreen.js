import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ImageBackground, Modal, TouchableOpacity, ScrollView, TouchableWithoutFeedback, } from 'react-native'
import { Icon, Card, Button, Cross, InputWithSubHeading } from '../Components'
import { dimens, colors, iconNames, customFonts, screens } from '../constants'
import { commonStyling } from '../common'
import { PropTypes } from 'prop-types'
import firebase from '../config/firebase'
import { Utils } from '../utils';

class CourseDescriptionScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
      item: props.navigation.getParam('course'),
      tncModalVisible: false,
      donationAmount: null,
      tncAccepted: false,
      confirmationName: null,
      inputNameErrorStatus: false,
      inputNameErrorTitle: null
    }
  }

  showTNCModal = () => {
    this.setState({
      tncModalVisible: true
    })
  }

  closeTNCModal = () => {
    this.setState({
      tncModalVisible: false
    })
  }

  render() {
    const {
      mainContainer,
      headerContainer,
      backButton,
      charityName,
      descriptionHeading,
      priceHeading,
      descriptionPara,
      buttonContainer,
      submitButton,
      imageStyle
    } = styles

    const {
      navigation
    } = this.props

    const {
      item
    } = this.state

    return (
      <View style={mainContainer}>
        <Icon nameAndroid={iconNames.backAndroid} nameIOS={iconNames.backIOS} style={backButton} color={colors.colorAccent} size={40} onPress={() => navigation.goBack()} />
        <View style={headerContainer}>
          <Text style={charityName}>{item.name}</Text>
          <Card width={220} height={220} elevation={4}>
            <ImageBackground
              style={imageStyle}
              imageStyle={{ borderRadius: dimens.defaultBorderRadius }}
              source={{ uri: item.imageURL }} />
          </Card>
        </View>

        <Text style={descriptionHeading}>About: </Text>
        <Text numberOfLines={4} ellipsizeMode='tail' style={descriptionPara}>
          {item.courseDescription}
        </Text>
        <Text style={priceHeading}>Price: </Text>
        <Text style={descriptionPara}>{item.price + ' '+ item.currency}</Text>
        <View style={buttonContainer}>
          <Button title='Confirm' style={submitButton} style={submitButton} onPress={this.showTNCModal} textColor={colors.colorAccent} />
        </View>
        {this.getTNCModal()}
      </View>
    );
  }

  checkSignatureAndProceed = () => {
    const {
      confirmationName
    } = this.state
    if(!confirmationName) {
      this.setState({
        inputNameErrorStatus: true,
        inputNameErrorTitle: 'Enter a name to proceed'
      })
      return
    }
    const currentUsersName = firebase.auth().currentUser.displayName
    if (currentUsersName !== confirmationName ){
      this.setState({
        inputNameErrorStatus: true,
        inputNameErrorTitle: 'Names dont match.'
      })
    }else{
      this.setState({
        inputNameErrorStatus: false,
        inputNameErrorTitle: null,
        tncAccepted: true
      })
      this.proceedWithCourseEnrollment()
    }
  }

  proceedWithCourseEnrollment = () => {

  }
  
  setConfirmatioName = (text) => {
    this.setState({
      confirmationName: text
    })
  }

  getTNCModal = () => {
    const {
      modalContentContainerStyle,
      modalContainerStyle,
      crossStyle,
      textContainerModal,
      headingModalStyle,
      itemNameModal,
      deleteButtonModal,
      termsAndConditionHeading,
      subHeadingStyle,
      termsAndConditions,
      enterNameContainerStyle,
      buttonContainerModal,
      termsAndConditionsContainerStyle
    } = styles

    return (
      <Modal visible={this.state.tncModalVisible} transparent={true} animationType='slide' onBackButtonPress={this.closeTNCModal}>
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={this.closeTNCModal}
          style={modalContainerStyle}>
          <TouchableWithoutFeedback>
            <View style={modalContentContainerStyle}>
              <Cross style={crossStyle} onPress={this.closeTNCModal} color={colors.grayBlue} size={42} onPress={this.closeTNCModal} />
              <View style={textContainerModal}>
                <Text style={headingModalStyle}>Confirm Course</Text>
                <Text numberOfLines={1} ellipsizeMode='tail' style={itemNameModal}>{this.state.item.name}</Text>
              </View>
              <Text numberOfLines={1} ellipsizeMode='tail' style={termsAndConditionHeading}>Terms and Conditions: </Text>
              <ScrollView contentContainerStyle={termsAndConditionsContainerStyle}>
                <Text style={termsAndConditions}>
                  Dispatched entreaties boisterous say why stimulated. Certain forbade picture now prevent carried she get see sitting. Up twenty limits as months. Inhabit so perhaps of in to certain. Sex excuse chatty was seemed warmth. Nay add far few immediate sweetness earnestly dejection.
                  Meant balls it if up doubt small purse. Required his you put the outlived answered position. An pleasure exertion if believed provided to. All led out world these music while asked. Paid mind even sons does he door no. Attended overcame repeated it is perceive marianne in. In am think on style child of. Servants moreover in sensible he it ye possible.
                  Post no so what deal evil rent by real in. But her ready least set lived spite solid. September how men saw tolerably two behaviour arranging. She offices for highest and replied one venture pasture. Applauded no discovery in newspaper allowance am northward. Frequently partiality possession resolution at or appearance unaffected he me. Engaged its was evident pleased husband. Ye goodness felicity do disposal dwelling no. First am plate jokes to began of cause an scale. Subjects he prospect elegance followed no overcame possible it on.
                  Performed suspicion in certainty so frankness by attention pretended. Newspaper or in tolerably education enjoyment. Extremity excellent certainty discourse sincerity no he so resembled. Joy house worse arise total boy but. Elderly up chicken do at feeling is. Like seen drew no make fond at on rent. Behaviour extremely her explained situation yet september gentleman are who. Is thought or pointed hearing he.
                  Affronting everything discretion men now own did. Still round match we to. Frankness pronounce daughters remainder extensive has but. Happiness cordially one determine concluded fat. Plenty season beyond by hardly giving of. Consulted or acuteness dejection an smallness if. Outward general passage another as it. Very his are come man walk one next. Delighted prevailed supported too not remainder perpetual who furnished. Nay affronting bed projection compliment instrument.
                  Bringing so sociable felicity supplied mr. September suspicion far him two acuteness perfectly. Covered as an examine so regular of. Ye astonished friendship remarkably no. Window admire matter praise you bed whence. Delivered ye sportsmen zealously arranging frankness estimable as. Nay any article enabled musical shyness yet sixteen yet blushes. Entire its the did figure wonder off.
                  Mr oh winding it enjoyed by between. The servants securing material goodness her. Saw principles themselves ten are possession. So endeavor to continue cheerful doubtful we to. Turned advice the set vanity why mutual. Reasonably if conviction on be unsatiable discretion apartments delightful. Are melancholy appearance stimulated occasional entreaties end. Shy ham had esteem happen active county. Winding morning am shyness evident to. Garrets because elderly new manners however one village she.
                  Received shutters expenses ye he pleasant. Drift as blind above at up. No up simple county stairs do should praise as. Drawings sir gay together landlord had law smallest. Formerly welcomed attended declared met say unlocked. Jennings outlived no dwelling denoting in peculiar as he believed. Behaviour excellent middleton be as it curiosity departure ourselves.
                  </Text>
              </ScrollView>
              <InputWithSubHeading
                secureTextEntry={false}
                placeholder="John Doe"
                autoCorrect={false}
                errorStatus={this.state.inputNameErrorStatus}
                errorTitle={this.state.inputNameErrorTitle}
                subHeadingTitle="Enter your name to confirm"
                autoCapitalize='words'
                containerStyle={enterNameContainerStyle}
                onChangeText={this.setConfirmatioName}
                subHeadingStyle={subHeadingStyle} />
              <View style={buttonContainerModal}>
                <Button
                  title='Confirm'
                  textColor={colors.colorAccent}
                  onPress={this.checkSignatureAndProceed}
                  style={deleteButtonModal} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    )
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
  termsAndConditionHeading: {
    fontSize: 14,
    marginTop: 22,
    marginHorizontal: dimens.screenHorizontalMargin,
    fontFamily: customFonts.medium
  },
  charityName: {
    fontSize: 24,
    fontFamily: customFonts.bold,
    color: colors.colorAccent,
    textAlign: "center",
    marginBottom: 20
  },
  termsAndConditionsContainerStyle: {
    marginTop: 18,
  },
  termsAndConditions: {
    marginHorizontal: dimens.screenHorizontalMargin
  },
  descriptionHeading: {
    fontSize: 20,
    fontFamily: customFonts.regular,
    color: colors.colorPrimary,
    marginHorizontal: dimens.screenHorizontalMargin,
    marginTop: 120
  },
  priceHeading: {
    fontSize: 20,
    fontFamily: customFonts.regular,
    color: colors.colorPrimary,
    marginHorizontal: dimens.screenHorizontalMargin,
    marginTop: 18
  },
  descriptionPara: {
    fontSize: 16,
    fontFamily: customFonts.regular,
    color: colors.black,
    margin: dimens.screenHorizontalMargin
  },
  enterNameContainerStyle: {
    marginTop: 18,
    marginHorizontal: dimens.screenHorizontalMargin
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  submitButton: {
    width: '90%',
    backgroundColor: colors.colorPrimary
  },
  modalContentContainerStyle: {
    width: '100%',
    height: '100%',
    marginTop: 120,
    paddingBottom: 80,
    backgroundColor: colors.colorAccent,
    borderRadius: dimens.defaultBorderRadius
  },
  modalContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.blackTransluscent,
    alignItems: 'center'
  },
  crossStyle: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 999
  },
  textContainerModal: {
    flexDirection: 'column',
    height: 100,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headingModalStyle: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: customFonts.semiBold,
    color: colors.grayBlue
  },
  itemNameModal: {
    fontSize: 23,
    width: 290,
    textAlign: 'center',
    fontFamily: customFonts.semiBold,
    color: colors.colorPrimary,
    marginTop: 18
  },
  deleteButtonModal: {
    width: '90%',
    marginTop: 18,
    height: dimens.buttonHeight,
    backgroundColor: colors.colorPrimary
  },
  buttonContainerModal: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancelButtonModal: {
    width: 250,
    marginTop: 10,
    height: dimens.buttonHeight,
    backgroundColor: colors.facebookBlue
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  }
})

CourseDescriptionScreen.navigationOptions = {
  header: null
}

CourseDescriptionScreen.propTypes = {
  navigation: PropTypes.object
}

export default CourseDescriptionScreen