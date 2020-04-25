import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView} from 'react-native'
import { Back, Button, Heading} from '../Components'
import { dimens, colors, customFonts, strings } from '../constants'
import { commonStyling } from '../common' 
import {PropTypes} from 'prop-types'
import firebase from '../config/firebase'


class PaymentScreen extends Component {

  constructor(props){
    super(props)
    this.getUserCreditScore()
    this.state = {
      navigation: props.navigation,
      item: props.navigation.getParam('course'),
      userCreditScore: null
    }
  }

  getUserCreditScore = async () => {
    const firestore = firebase.firestore()
    const ref = firestore.collection('users')
    const user =firebase.auth().currentUser
    let creditScore = null
    await ref.doc(user.uid)
          .get()
          .then(function(doc){
            if(doc.exists) {
              creditScore = doc.data().credit_score
            }
          }).catch(function(error){
            console.log(error)
          })

    this.setState({
      userCreditScore: creditScore
    })

  }


  render() {
    const {
      mainContainer,
      headingStyle,
      priceDetailsContainer,
      priceDetail,
      priceType,
      priceValue,
      headingContainer,
      headingContainerStyle,
      buttonContainerModal,
      deleteButtonModal,
      totalAmount
    } = styles

    const {
      navigation
    } = this.props

    const {
      item,
      userCreditScore
    } = this.state

    

    return (
      <View style={mainContainer}>
      <ScrollView contentContainerStyle={{ height: 500 }}>

      <Back
          style={{ ...commonStyling.backButtonStyling }}
          onPress={() => navigation.goBack()} />
      <Heading
        title= "Payment Screen"
        containerStyle={headingContainerStyle} />
      

        <View style = {priceDetailsContainer}>
          <View style={priceDetail}>
          <Text style= {priceType}>Loan Amount</Text>
          <Text style={priceValue}>$ {item.price}</Text>
          </View>
          <View style={priceDetail}>
            <Text style={priceType}>Your Credit Score</Text>
            <Text style={priceValue}>{userCreditScore}</Text>
          </View>
          <View style={priceDetail}>
            <Text style={priceType}>Service Charge</Text>
            <Text style={priceValue}>$ 2.00</Text>
          </View>
          <View style = {totalAmount}>
            <Text style={priceType}>Total Amount Payable</Text>
            <Text style={priceValue}>$ 2.00</Text>
          </View>
        </View>
        <View style={buttonContainerModal}>
                <Button
                  title='Make Payment'
                  textColor={colors.colorAccent}
                  onPress={() => {}}
                  style={deleteButtonModal} />
        </View>
        <View> 
        </View>
        
    </ScrollView>
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
  },
  headingContainerStyle: {
    width: '100%',
    textAlign: 'left',
    marginTop: dimens.screenSafeUpperNotchDistance + 70
  },
  priceDetailsContainer: {
    width: '100%',
    padding: 60,
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  priceDetail: {
    alignItems:'center',
    padding:25
  },

  totalAmount: {
    alignItems:'center',
    padding:25,
    borderColor: colors.grayTransluscent,
    borderBottomWidth:1,
    borderTopWidth:1
  },

  priceType: {
      fontFamily:customFonts.semiBold, 
      fontSize:20
    },

  priceValue:{
    color:colors.colorPrimary, 
    fontFamily:customFonts.medium, 
    fontSize:40,
    padding: 8
  },

  headingContainer:{
    flexDirection: 'row',

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

PaymentScreen.navigationOptions = {
  header: null
}

PaymentScreen.propTypes = {
  navigation: PropTypes.object
}

export default PaymentScreen