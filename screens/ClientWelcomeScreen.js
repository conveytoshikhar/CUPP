import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, ImageBackground, TouchableOpacity } from 'react-native'
import { Heading, Card, Icon, Loading } from '../Components'
import { dimens, colors, iconNames, customFonts, screens } from '../constants'
import { commonStyling } from '../common'
import { PropTypes } from 'prop-types'
import firebase from '../config/firebase'

class ClientWelcomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
      isContenLoading: true,
      charityList: [{ id: '0', name: 'Healthcare U', shortDescription: 'Lorem Ipsum do rem mi fnewf aje fsfs.', imageURL: '' },
      { id: '1', name: 'Healthcare U', shortDescription: 'Lorem Ipsum do rem mi fnewf aje fsfs.', imageURL: '' },
      { id: '2', name: 'Healthcare U', shortDescription: 'Lorem Ipsum do rem mi fnewf aje fsfs.', imageURL: '' }]
    }
  }

  componentDidMount = () => {
    this.fetchUserDetailsFromDB()
  }

  fetchUserDetailsFromDB = async () => {
    const user = firebase.auth().currentUser
    const uid = user.uid
    const clientRef = firebase.firestore().collection('clients').doc(uid)
    let charitableAmount = null 
    let charitiesHelped = null
    let transactionsMade = null

    await clientRef.get().then(function (doc) {
      if (doc.exists) {
        const data = doc.data()
        charitableAmount = data.charitableAmount
        charitiesHelped = data.charitiesHelped
        transactionsMade = data.transactionsMade
      } else {
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
      alert("Error connecting to database")
    });

    this.setState({
      charitableAmount: charitableAmount,
      charitiesHelped: charitiesHelped,
      transactionsMade: transactionsMade,
      isContenLoading: false
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
    const componenetWhenLoaded =
      <View style={mainContainer}>
        <Heading headingStyle={headingStyle} title='Welcome' heading />
        <View style={personContainer}>
          <Icon nameAndroid={iconNames.personAndroid} nameIOS={iconNames.personIOS} onPress={null} color={colors.colorPrimary} />
        </View>

        <View style={upperCardContainer}>
          <Card width='90%' height={180} elevation={5}>
            <View style={innerProfileCardContainer}>

              <View style={denominationContainer}>
                <Text style={denomination}>{this.state.charitableAmount}</Text>
                <Text style={denominationSubHeading}>Total Avaiable Charitable Amount</Text>
              </View>

              <View style={innerProfileLowerCardContainer}>
                <View style={transactionsMadeContainer}>
                  <Text style={denomination}>{this.state.transactionsMade}</Text>
                  <Text style={denominationSubHeading}>Monthy Transactions</Text>
                </View>
                <View style={chairitesHelpedContainer}>
                  <Text style={denomination}>{this.state.charitiesHelped}</Text>
                  <Text style={denominationSubHeading}>Charities Helped</Text>
                </View>
              </View>
            </View>

          </Card>
        </View>


        {/* FLAT LIST */}
        <Heading title='Charities that need help: ' headingStyle={charitiesHeading} />

        <FlatList
          contentContainerStyle={{ paddingTop: 20 }}
          data={this.state.charityList}
          renderItem={({ item }) => CharityItem(item, this.props)}
          keyExtractor={(item) => item.id} />
      </View>

    const componentLoading = <Loading />

    return this.state.isContenLoading ? componentLoading : componenetWhenLoaded
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
      justifyContent: 'space-evenly',
      height: '100%',
      padding: 20,
      flexDirection: 'row'
    },
    textContainer: {
      marginHorizontal: 20,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start'
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
    charityDescription
  } = styles

  const component =
    <View style={charityItemOuterContainer}>
      <Card width='90%' height={120} elevation={4}>
        <View style={cardItemContainer}>
          <Card width={70} height={70} elevation={dimens.defaultBorderRadius}>
            <ImageBackground
              style={imageStyle}
              imageStyle={{ borderRadius: dimens.defaultBorderRadius }}
              source={{ uri: 'sectionContent.imageURL' }} />
          </Card>

          <TouchableOpacity onPress={() => {
            props.navigation.navigate(screens.CharityDescriptionPage, {
              charity: item
            })
          }}>
            <View style={textContainer}>
              <Text style={charityHeading}>{item.name}</Text>
              <Text style={charityDescription}>{item.shortDescription}</Text>
            </View>
          </TouchableOpacity>
          <Icon nameAndroid={iconNames.forwardAndroid} nameIOS={iconNames.forwardIOS} onPress={() => {
            props.navigation
              .navigate(screens.CharityDescriptionPage, {
                charity: item
              })
          }} />
        </View>
      </Card>
    </View>

  return component
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
  charitiesHeading: {
    fontSize: 28,
    color: colors.colorPrimary,
    marginTop: 24,
    marginHorizontal: dimens.screenHorizontalMargin
  }

})

ClientWelcomeScreen.navigationOptions = {
  header: null
}

ClientWelcomeScreen.propTypes = {
  navigation: PropTypes.object
}

export default ClientWelcomeScreen