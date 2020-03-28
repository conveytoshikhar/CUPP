import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ImageBackground, Modal,   TouchableOpacity, TouchableWithoutFeedback,} from 'react-native'
import { Icon, Card, Button, Cross, InputWithSubHeading } from '../Components'
import { dimens, colors, iconNames, customFonts } from '../constants'
import { commonStyling } from '../common'
import { PropTypes } from 'prop-types'
import { ScrollView } from 'react-native-gesture-handler';

class CharityDescriptionPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
      item: props.navigation.getParam('charity'),
      donateModalVisible: false
    }
  }

  showDonateModal = () => {
    this.setState({
      donateModalVisible: true
    })
  }

  closeDonateModal = () => { 
    this.setState({  
    donateModalVisible: false 
    }) 
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
          <Button title='Donate' style={submitButton} style={submitButton} onPress = {this.showDonateModal} textColor={colors.colorAccent} />
        </View>
        {this.getDonateModal()}
      </View>
    );
  }


getDonateModal = () => {
  const {
    modalContentContainerStyle,
    modalContainerStyle,
    crossStyle,
    textContainerModal,
    headingModalStyle,
    itemNameModal,
    deleteButtonModal,
    cancelButtonModal,
    subHeadingStyle,
    submitButton
  } = styles

  return (
    <Modal visible={this.state.donateModalVisible} transparent={true} animationType='slide' onBackButtonPress={this.closeDonateModal}>
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={this.closeDonateModal}
        style={modalContainerStyle}>
        <TouchableWithoutFeedback>
          <View style={modalContentContainerStyle}>
            <Cross style={crossStyle} onPress={this.closeDonateModal} color={colors.grayBlue} size={42} />
            <View style={textContainerModal}>
              <Text style={headingModalStyle}>Donate to</Text>
              <Text numberOfLines={1} ellipsizeMode='tail' style={itemNameModal}>{this.state.item.name}</Text>
            </View>
            <InputWithSubHeading
            secureTextEntry={false}
            placeholder= "Amount"
            autoCorrect={false}
            autoCompleteType='name'
            subHeadingTitle= "Enter the amount (Minimum donation of $1)"
            autoCapitalize='words'
            onChangeText={() => {}}
            subHeadingStyle={subHeadingStyle} />
            <Button
              title='Pay for good!'
              textColor={colors.colorAccent}
              onPress={this.uploadTransaction}
              style={deleteButtonModal} />
      
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
  },
  modalContentContainerStyle: {
    width: 320,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  textContainerModal: {
    flexDirection: 'column',
    height: 100,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headingModalStyle: {
    fontSize: 23,
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
    marginTop: 8
  },
  deleteButtonModal: {
    width: 250,
    marginTop: 20,
    height: dimens.buttonHeight,
    backgroundColor: colors.colorPrimary
  },
  cancelButtonModal: {
    width: 250,
    marginTop: 10,
    height: dimens.buttonHeight,
    backgroundColor: colors.facebookBlue
  },
  subHeadingStyle: {
    marginTop: 16
  }
})

CharityDescriptionPage.navigationOptions = {
  header: null
}

CharityDescriptionPage.propTypes = {
  navigation: PropTypes.object
}

export default CharityDescriptionPage