import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { Heading, Card, Icon, Loading } from '../Components'
import { dimens, colors, iconNames, customFonts, screens } from '../constants'
import { commonStyling } from '../common'
import { PropTypes } from 'prop-types'
import firebase from '../config/firebase'

class CharityWelcomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
      isContenLoading: true,
      previousTransactionsArrayLength: 0,
      lastTransaction: null
    }
  }

  componentDidMount = async () => {
    await this.fetchUserDetailsFromDB()
    this.listenForDeposits()
  }

  listenForDeposits = async () => {
    const user = firebase.auth().currentUser
    const uid = user.uid
    const charityOwnersRef = firebase.firestore().collection('charityOwners').doc(uid)
    let flag = true
    await charityOwnersRef.onSnapshot(doc => {
      const newData = doc.data()
      const {
        previousTransactionsArrayLength
      } = this.state
      if (newData.transactions.length > previousTransactionsArrayLength && flag){
        flag = false
        const newLength = newData.transactions.length
        const newTransaction = newData.transactions[newLength - 1]
        const alertMessage = 'New deposit of '+newTransaction.name+' of amount '+newTransaction.amount+"!"
        alert(alertMessage)
        this.setState({
          previousTransactionsArrayLength: newData.transactions.length,
          lastTransaction: newTransaction
        }, () => {
          flag = true
          this.onSuccessfulDeposit()
        })
      }
    })
  }

  onSuccessfulDeposit = () => {
    const {
      lastTransaction,
      amountReceived
    } = this.state
    
    this.setState({
      amountReceived: parseInt(amountReceived) + parseInt(lastTransaction.amount)
    })
  }

  fetchUserDetailsFromDB = async () => {
    const user = firebase.auth().currentUser
    const uid = user.uid
    const charityRef = firebase.firestore().collection('charityOwners').doc(uid)
    let amountReceived = null
    let helpers = null
    let transactionReceived = null
    let previousTransactionsArrayLength = 0
    let lastTransaction = null

    await charityRef.get().then(function (doc) {
      if (doc.exists) {
        const data = doc.data()
        amountReceived = data.amountReceived
        helpers = data.helpers
        transactionReceived = data.transactionReceived
        previousTransactionsArrayLength = data.transactions.length
        if (data.transactions.length) {
          lastTransaction = data.transactions[data.transactions.length - 1]
        }
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
      alert("Error connecting to database")
    });

    this.setState({
      amountReceived: amountReceived,
      helpers: helpers,
      transactionReceived: transactionReceived,
      isContenLoading: false,
      previousTransactionsArrayLength: previousTransactionsArrayLength
    })
  }

  render() {
    const {
      mainContainer,
      headingStyle,
      personContainer,
      upperCardContainer,
      innerProfileCardContainer,
      denominationContainer,
      denomination,
      denominationSubHeading,
      transactionsMadeContainer,
      innerProfileLowerCardContainer,
      chairitesHelpedContainer,
      charitiesHeading
    } = styles

    const {
      navigation
    } = this.props
    const componentLoaded =
      <View style={mainContainer}>
        <Heading headingStyle={headingStyle} title='Welcome' headingStyle={headingStyle} />
        <View style={personContainer}>
          <Icon nameAndroid={iconNames.personAndroid} nameIOS={iconNames.personIOS} onPress={null} color={colors.colorPrimary} onPress={() => navigation.navigate(screens.ProfileScreen)} />
        </View>

        <View style={upperCardContainer}>
          <Card width='90%' height={180} elevation={5}>
            <View style={innerProfileCardContainer}>

              <View style={denominationContainer}>
                <Text style={denomination}>{this.state.amountReceived}</Text>
                <Text style={denominationSubHeading}>Total Amount Received</Text>
              </View>

              <View style={innerProfileLowerCardContainer}>
                <View style={transactionsMadeContainer}>
                  <Text style={denomination}>{this.state.transactionReceived}</Text>
                  <Text style={denominationSubHeading}>Monthly Transactions</Text>
                </View>
                <View style={chairitesHelpedContainer}>
                  <Text style={denomination}>{this.state.helpers}</Text>
                  <Text style={denominationSubHeading}>Helpers</Text>
                </View>
              </View>
            </View>

          </Card>
        </View>
      </View>

    const componentLoading = <Loading />

    return this.state.isContenLoading ? componentLoading : componentLoaded
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
  },
  personContainer: {
    position: 'absolute',
    top: 50,
    right: dimens.screenHorizontalMargin,
    height: 50,
    width: 50,
    borderRadius: 40,
    borderColor: colors.colorPrimary,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headingStyle: {
    color: colors.colorPrimary,
    marginTop: 55,
    fontSize: 28,
    marginHorizontal: dimens.screenHorizontalMargin
  },
  upperCardContainer: {
    width: '100%',
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerProfileCardContainer: {
    padding: dimens.screenHorizontalMargin,
    justifyContent: 'center',
    alignItems: 'center'
  },
  denominationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: colors.grayTransluscent,
    borderBottomWidth: 0.5,
    paddingBottom: 12,
    width: '100%'
  },
  innerProfileLowerCardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  denomination: {
    color: colors.submitGreen,
    fontSize: 20,
    fontFamily: customFonts.bold
  },
  denominationSubHeading: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: customFonts.regular,
    color: colors.black
  },
  transactionsMadeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: colors.grayTransluscent,
    borderRightWidth: 0.5,
    padding: 20,
    width: '50%'
  },
  chairitesHelpedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '50%'
  },
  charitiesHeading: {
    fontSize: 28,
    color: colors.colorPrimary,
    marginTop: 24,
    marginHorizontal: dimens.screenHorizontalMargin
  }
})

CharityWelcomeScreen.navigationOptions = {
  header: null
}

CharityWelcomeScreen.propTypes = {
  navigation: PropTypes.object
}

export default CharityWelcomeScreen