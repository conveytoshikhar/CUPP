import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView} from 'react-native'
import { Back, Button, Heading} from '../Components'
import { dimens, colors, customFonts, strings, screens } from '../constants'
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
      userCreditScore: null,
      paymentButtonLoading: false
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

  proceedWithOrderProcessing = async () => {
    this.setState({
      paymentButtonLoading: true
    })
    const firestore = firebase.firestore()
    const ref = firestore.collection('users')
    const user = firebase.auth().currentUser
    const { item } = this.state

    const orderObject = {
      courseItem: item.name,
      coursePrice: item.price,
      imageURL: item.imageURL,
      itemDescription: item.courseDescription,
      status: "Pending"
    }

    await ref.doc(user.uid).update({
      orders: firebase.firestore.FieldValue.arrayUnion(orderObject)
    }).then( () => {
      this.setState({
        paymentButtonLoading: false
      })
      this.navigateToOrderSuccessScreen()
    }).catch( (error) => {
      alert('Some probem with our servers: ',error)
    })
  }

  navigateToOrderSuccessScreen = () => {
    const {
      navigation
    } = this.state
    navigation.navigate(screens.OrderSuccessScreen, {
      course: this.state.item
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
      totalAmount,
      logoContainer
    } = styles

    const {
      navigation
    } = this.props

    const {
      item,
      userCreditScore
    } = this.state

    

    return (
     
      <ScrollView contentContainerStyle={{ height: 500 }} style={mainContainer}>

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
                  onPress={this.proceedWithOrderProcessing}
                  style={deleteButtonModal} 
                  isLoading= {this.state.paymentButtonLoading} />
        </View>
        <View> 
        </View>
        
    </ScrollView>


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
    padding: 20,
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
    flexDirection: 'column',
    

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

  logoContainer: {
    flex: 1,
    paddingTop: dimens.screenSafeUpperNotchDistance + 80,
    alignItems: 'center',
    justifyContent: 'center'
  }

})

PaymentScreen.navigationOptions = {
  header: null
}

PaymentScreen.propTypes = {
  navigation: PropTypes.object
}

export default PaymentScreen