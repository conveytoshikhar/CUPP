import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, ImageBackground } from 'react-native'
import { Card, Heading, Button, Icon } from '../Components'
import { dimens, colors, iconNames, customFonts} from '../constants'
import { commonStyling } from '../common'
import { PropTypes } from 'prop-types'

class TransactionDetailsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
      name: 'Transaction',
      item: props.navigation.getParam('transaction')
    }
  }
  render() {
    const {
      mainContainer,
      headingStyle,
      itemDetailsContainer,
      buttonContainer,
      submitButton,
      cardNumberContainer,
      cardNumberInput,
      cardHeading,
      cardSubHeading,
      imageStyling,
      priceDetailsContainer,
      priceDetail,
      priceValue,
      priceType,
      charityDetailsContainer,
      charityDetail,
      charityName,
      charityPrice,
      backButton
    } = styles

    const {
      navigation
    } = this.props

    const {
      name,
      item
    } = this.state

    return (
      <View style={mainContainer}>
      <View>
      <Heading headingStyle={headingStyle} title= {name} />
      </View>
        <View style={itemDetailsContainer}>
        <Text style={cardHeading}>{item.name}</Text>
        <Text style={cardSubHeading}>{item.category}</Text>
          <Card
            width= {350}
            height={200}
            elevation={4}>
            <View>
             <ImageBackground source={{ uri : item.transactionScreenImageURL}} 
             imageStyle={imageStyling}
             style={imageStyling}  
              >
             </ImageBackground>
            </View>
          </Card>
        </View>
        <View style = {priceDetailsContainer}>
          <View style={priceDetail}>
            <Text style={priceValue}>{item.price}</Text>
            <Text style= {priceType}>Price</Text>
          </View>
          <View style={priceDetail}>
            <Text style={priceValue}>{item.amountPaid}</Text>
            <Text style={priceType}>Paid</Text>
          </View>
          <View style={priceDetail}>
            <Text style={priceValue}>{item.change}</Text>
            <Text style={priceType}>Change</Text>
          </View>
        </View>
        <View style = {charityDetailsContainer}>
          {/* {() => {
            return item.charities.map(charity => {
              (
                <View style={charityDetail}>
            <Text style={charityName}>{charity.name}</Text>
            <Text style={charityPrice}>{charity.amount}</Text>
          </View>
              )
            })
          }}() */}
          <View style={charityDetail}>
            <Text style={charityName}>Team Trees</Text>
            <Text style={charityPrice}>$ 0.30</Text>
          </View>
          <View style={charityDetail}>
            <Text style={charityName}>Direct Relief</Text>
            <Text style={charityPrice}>$ 0.50</Text>
          </View>
          <View style={charityDetail}>
            <Text style={charityName}>Red Cross</Text>
            <Text style={charityPrice}>$ 0.24</Text>
          </View>
        </View>
        <View style={buttonContainer}>
          <Button style={submitButton} textColor={colors.colorAccent} title='Back' onPress={()  => { navigation.goBack()}} isLoading={this.state.buttonLoading}/>
        </View>
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
    marginTop:30
  },
  itemDetailsContainer: {
    marginTop: 35,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  priceDetailsContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection:'row',
    justifyContent: 'center'
  },
  charityDetailsContainer: {
    marginTop: 50,
    width: '100%'
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  submitButton: {
    width: '90%',
    backgroundColor: colors.colorPrimary
  },
  cardNumberContainer: {
    flexDirection: 'row'
  },
  cardNumberInput: {
    width: 120,
    fontFamily: customFonts.regular
  },
  cardHeading: {
    fontFamily: customFonts.semiBold,
    textAlign: 'center',
    fontSize: 25,
    paddingTop:8,
    paddingBottom:8,
    color: colors.colorPrimary
  },
  cardSubHeading: {
    paddingBottom: 15,
    paddingTop: 8,
    fontFamily: customFonts.medium,
    textAlign: 'center',
    fontSize: 15
  },
  imageStyling: {
    width: 350,
    height: 200,
    padding:8,
    borderRadius: dimens.defaultBorderRadius,
  },
  priceValue:{color:colors.colorPrimary, 
    fontFamily:customFonts.medium, 
    fontSize:20,
    padding: 8
  },
  priceDetail: {
  flex:1, 
  alignItems:'center'
  },
  priceType: {
    fontFamily:customFonts.semiBold, 
    fontSize:15
  },
  charityDetail:{
    flexDirection:'row', 
    justifyContent:'space-between',
    padding:15    
  },
  charityName:{
    fontFamily:customFonts.semiBold, 
    color:colors.colorPrimary, 
    fontSize:15
  },
  charityPrice:{
    fontFamily:customFonts.semiBold, 
    fontSize:15
  },
  backButton: {
    top: 40,

    left: dimens.screenHorizontalMargin
  }
})


TransactionDetailsScreen.navigationOptions = {
  header: null
}

TransactionDetailsScreen.propTypes = {
  navigation: PropTypes.object
}

export default TransactionDetailsScreen