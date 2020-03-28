import React, { Component } from 'react';
import { View, StyleSheet, Text} from 'react-native'
import { } from '../Components'
import { dimens, colors } from '../constants'
import { commonStyling } from '../common' 
import {PropTypes} from 'prop-types'
import firebase from '../config/firebase'



class ClientTransactionScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      navigation: props.navigation,
      transactions: null
    }
  }

  componentDidMount(){
    this.getTransactionsFromFirebase()
  }

  getTransactionsFromFirebase =  async () => {
    let transactionList = []
    const db = firebase.firestore()
    await db.collection('transactions')
    .get()
    .then(
      function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          transactionList.push(doc.data())
        })
      }
    )

    this.setState({
      transactions: transactionList
    })

  }

  render() {
    const {
      mainContainer
    } = styles

    const {
      navigation
    } = this.props
    return (
      <View style={mainContainer}>
        <Text>Hello from transaction</Text>
        <Text>{JSON.stringify(this.state.transactions)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

ClientTransactionScreen.navigationOptions = {
  header: null
}

ClientTransactionScreen.propTypes = {
  navigation: PropTypes.object
}

export default ClientTransactionScreen