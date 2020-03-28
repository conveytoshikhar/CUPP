import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, ImageBackground, TouchableOpacity} from 'react-native'
import { Heading, Card, Icon } from '../Components'
import { dimens, colors, iconNames, customFonts, screens } from '../constants'
import { commonStyling } from '../common'
import { PropTypes } from 'prop-types'
import firebase from '../config/firebase'


class ClientTransactionScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      navigation: props.navigation,
      transactions: null,
      transactionList: [{id:0 , name: 'Starbucks', category: 'Food', amountPaid:'$ 4.00', change: '$ 0.74', price: '$ 3.26', imageURL:'https://illuminatisymbols.info/wp-content/uploads/illuminati-symbols-Starbucks-Coffee-Logo.gif' , 
      transactionScreenImageURL: 'https://images.pexels.com/photos/597933/pexels-photo-597933.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
      {id:1 , name: 'Park N Shop', category: 'Shopping', amountPaid:'$ 100.00', change: '$ 0.34', price: '$ 99.66' ,imageURL:'https://media.glassdoor.com/sqll/974481/parknshop-squarelogo-1507201008337.png', transactionScreenImageURL: 'https://cms.qz.com/wp-content/uploads/2013/10/park1.jpg?quality=75&strip=all&w=1600&h=900&crop=1'},
      {id:2 , name: 'McDonalds', category: 'Food', amountPaid:'$ 35.00', change: '$ 0.56', price: '$ 34.44' ,imageURL:'https://i.pinimg.com/originals/85/0b/d3/850bd3e6e82be4f4208b0ba99edeb96b.jpg', transactionScreenImageURL: 'https://cms.qz.com/wp-content/uploads/2017/07/mcdonalds.jpg?quality=75&strip=all&w=1600&h=900&crop=1'},
      {id:3 , name: 'Sasa', category: 'Shopping', amountPaid:'$ 102.00', change: '$ 0.99', price: '$ 101.01' ,imageURL:'https://wba-wpengine.netdna-ssl.com/wp-content/uploads/2017/12/Sa-Sa-Logo.jpg', transactionScreenImageURL: 'https://wba-wpengine.netdna-ssl.com/wp-content/uploads/2017/12/Sa-Sa-Logo.jpg'}]
    }
  }

  componentDidMount(){
    //this.getTransactionsFromFirebase()
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
      mainContainer,
      charitiesHeading,
      headingStyle
    } = styles

    const {
      navigation
    } = this.props
    return (
      <View style={mainContainer}>
      <Heading headingStyle={headingStyle} title='Your Transactions:' heading />
      <FlatList
          contentContainerStyle={{ paddingTop: 20 }}
          data={this.state.transactionList}
          renderItem={({ item }) => CharityItem(item, this.props)}
          keyExtractor={(item) => item.id} />

      </View>
    );
  }
}


const CharityItem = (item, props) => {

  const styles = {
    charityItemOuterContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 8,
      marginBottom: 8
    },
    imageStyle: {
      width: '100%',
      height: '100%',
      borderRadius: dimens.defaultBorderRadius
    },
    cardItemContainer: {
      alignItems: 'center',
      justifyContent: 'space-around',
      height: '100%',
      padding: 18,
      flexDirection: 'row'
    },
    textContainer: {
      marginHorizontal: 18,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-around',
    },
    charityHeading: {
      fontSize: 20,
      fontFamily: customFonts.medium,
      color: colors.colorPrimary
    },
    charityDescription: {
      fontSize: 14,
      color: colors.black,
      marginTop: 8,
      fontFamily: customFonts.mediumItalic
    }
  }
  
  const {
    charityItemOuterContainer,
    imageStyle,
    cardItemContainer,
    textContainer,
    charityHeading,
    charityDescription,
    transactionAmount
  } = styles
  const component =
    <View style={charityItemOuterContainer}>
      <Card width='90%' height={120} elevation={4} style={{flex:1}}>
        <View style={cardItemContainer}>
          <View style = {{flex:2}}>
          <Card width={70} height={70} elevation={dimens.defaultBorderRadius} >
            <ImageBackground
              style={imageStyle}
              imageStyle={{ borderRadius: dimens.defaultBorderRadius }}
              source={{uri : item.imageURL}}
             />
          </Card>
          </View>
          <TouchableOpacity style={{flex:5}}
          onPress={() => {
            props.navigation.navigate(screens.TransactionDetailsScreen, {
              transaction: item
            })
          }}
          >
            <View style={textContainer}>
              <Text style={charityHeading}>{item.name}</Text>
              <Text style={charityDescription}>{item.category}</Text>
            </View>
          </TouchableOpacity>
          <View style={{flex:3}}>
            <Text style={charityHeading}>{item.amountPaid}</Text>
            <Text style={charityDescription}>{item.change}</Text>
          </View>
          <View style={{flex:1}}>
          <Icon nameAndroid={iconNames.forwardAndroid} nameIOS={iconNames.forwardIOS} onPress={() => {
            props.navigation
              .navigate(screens.TransactionDetailsScreen, {
                transaction: item
              })
            }}/>
            </View>

        </View>
      </Card>
    </View>

  return component
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,

  },
  charitiesHeading: {
    fontSize: 28,
    color: colors.colorPrimary,
    marginHorizontal: dimens.screenHorizontalMargin
  },
  headingStyle: {
    color: colors.colorPrimary,
    marginTop: 55,
    fontSize: 28,
    marginHorizontal: dimens.screenHorizontalMargin
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
    marginTop: 30,
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
    fontSize: 13,
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
  transactionAmount:{
    fontSize: 30,
    color: colors.colorPrimary,
    marginHorizontal: dimens.screenHorizontalMargin,
    fontFamily: customFonts.semiBold
  },


})

ClientTransactionScreen.navigationOptions = {
  header: null
}

ClientTransactionScreen.propTypes = {
  navigation: PropTypes.object
}

export default ClientTransactionScreen