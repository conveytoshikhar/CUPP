import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native'
import { LogoPlaceholder } from '../Components'
import { dimens, colors, screens } from '../constants'
import { commonStyling } from '../common'
import { NavigationActions, StackActions } from 'react-navigation'
import { PropTypes } from 'prop-types'
import firebase from '../config/firebase'
import appConfig from '../config/appConfig';

class SplashScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      navigation: props.navigation,
      name: 'Splash Screen'
    }
  }
  
  componentDidMount = () => {
    this.navigateToScreen() 
  }

  navigateToScreen = async () => {
    const user = firebase.auth().currentUser
    const userRef = firebase.firestore().collection('users')
    const clientRef = firebase.firestore().collection('clients')
    const charityRef = firebase.firestore().collection('charityOwners')
    if(user) {
      const uid = user.uid
      let role = null
      await userRef.doc(uid).get().then(function (doc) {
        if (doc.exists) {
          const data = doc.data()
          role = data.role
        } else {
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
        alert("Error connecting to database")
      });
  
      if (role === appConfig.userRoleClient) {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: screens.ClientHome })
          ]
        })
        const {
          navigation
        } = this.state
    
        setTimeout( () => {
          navigation.dispatch(resetAction)
        }, 2000)
      }else{
        //go here to charity page 
      }
    }else{
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: screens.WelcomeScreen })
        ]
      })
      const {
        navigation
      } = this.state
  
      setTimeout( () => {
        navigation.dispatch(resetAction)
      }, 2000)
    }
    
    
  }
  render() {
    const {
      mainContainer,
      overlayStyle,
      loadingStyle,
      loadingContainer
    } = styles

    const {
      navigation
    } = this.props

    return (
      <ImageBackground
        style={mainContainer}
        imageStyle={{ paddingLeft: 120 }}
        source={require('../assets/Splash/splashScreen.jpg')}>
        <View style={overlayStyle}>
          <LogoPlaceholder accent={colors.colorAccent} size={55} iconSize={35} iconMargin={18} />
          <View style={loadingContainer}>
            <ActivityIndicator style={loadingStyle} size='large' color={colors.colorAccent} />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer
  },
  overlayStyle: {
    backgroundColor: colors.colorPrimaryTransluscent,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyle: {
    width: dimens.logoWidthOnboarding,
    height: dimens.logoHeightOnboarding,
    borderColor: colors.colorAccent,
    borderWidth: 1,
  },
  loadingStyle: {
    fontSize: 50
  },
  loadingContainer: {
    marginTop: 40,
  }
})

SplashScreen.navigationOptions = {
  header: null
}

SplashScreen.propTypes = {
  navigation: PropTypes.object
}

export default SplashScreen