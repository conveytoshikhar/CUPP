import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, Animated, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import { Loading, SearchIcon, Card } from '../Components'
import { dimens, colors, iconNames, customFonts, screens } from '../constants'
import firebase from '../config/firebase'
import { commonStyling } from '../common'
import { PropTypes } from 'prop-types'
import { LinearGradient } from 'expo-linear-gradient';
import { SearchBar } from 'react-native-elements';

const HEADER_EXPANDED_HEIGHT = 250;
const HEADER_COLLAPSED_HEIGHT = 100;

const { height: SCREEN_HEIGHT } = Dimensions.get("screen")

class ClientOrderScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
      isContentLoading: true,
      scrollY: new Animated.Value(0),
      orders: null,
      showSearch: false
    }
  }

  getMainHeaderView = () => {
    const {
      headingStyle,
      subHeadingStyle,
      expandedHeaderContainerStyle
    } = styles

    return (
      <View style={expandedHeaderContainerStyle}>
        <Text style={headingStyle}>Orders</Text>
        <Text style={subHeadingStyle}>Find your orders</Text>
      </View>
    )
  }

  getCollapsedHeaderView = () => {
    const {
      collpasedHeaderContainer,
      collpasedHeaderTitle,
    } = styles

    return (
      <View style={collpasedHeaderContainer}>
        <Text style={collpasedHeaderTitle}>Your orders</Text>
      </View>
    )
  }


  componentDidMount = () => {
    this.fetchOrdersForClient()
    this.awaitOrdersToRefresh()
  }

  fetchOrdersForClient = async () => {
    const userRef = firebase.firestore().collection('users')
    const currentUser = firebase.auth().currentUser
    let orders = []
    await userRef.doc(currentUser.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          orders = doc.data().orders
        } else {
          console.log('Some error with logic. The user is not in our db.')
        }
      })
    this.setState({
      orders: orders,
      isContentLoading: false
    })
  }

  awaitOrdersToRefresh = async () => {
    const currentUser = firebase.auth().currentUser
    const userRef = firebase.firestore().collection('users').doc(currentUser.uid)
    let orders = null
    await userRef.onSnapshot(doc => {
      orders = doc.data().orders
      this.setState({
        orders: orders
      })
    })
  }

  render() {

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
      extrapolate: 'clamp'
    }); 3
    const headerTitleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });
    const heroTitleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });

    const {
      mainContainer,
      headerSearchStyling,
      mainHeaderContainerStyle,
      gradientStyle
    } = styles

    const componentLoaded = (
      <View style={mainContainer}>
        <Animated.View style={[mainHeaderContainerStyle, { height: headerHeight }]}>
          <LinearGradient
            style={gradientStyle}
            colors={[colors.colorPrimary, colors.colorSecondary]}>
            <Animated.View
              style={{ flex: 1, opacity: heroTitleOpacity, zIndex: 1 }}>
              {this.getMainHeaderView()}
            </Animated.View>
            <Animated.View
              style={{ flex: 1, opacity: headerTitleOpacity, zIndex: 1 }}>
              {this.getCollapsedHeaderView()}
            </Animated.View>
          </LinearGradient>
        </Animated.View>

        <FlatList
          contentContainerStyle={{ minHeight: SCREEN_HEIGHT + HEADER_COLLAPSED_HEIGHT }}
          data={this.state.orders}
          renderItem={({ item }) => OrderItem(item, this.props)}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{
              nativeEvent: {
                contentOffset: {
                  y: this.state.scrollY
                }
              }
            }])
          }
          scrollEventThrottle={16} />
      </View>
    );

    const componentLoading = <Loading />

    return this.state.isContentLoading ? componentLoading : componentLoaded

  }
}

const OrderItem = (item, props) => {
  const styles = {
    imageBackgroundStyle: {
      width: '100%',
      height: '100%',
      borderRadius: dimens.defaultBorderRadius
    },
    mainContainer: {
      paddingLeft: dimens.screenHorizontalMargin,
      paddingRight: dimens.screenHorizontalMargin,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    outerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 8,
      marginBottom: 8
    },
    itemHeading: {
      fontSize: 16,
      width: 220,
      color: colors.colorPrimary,
      fontFamily: customFonts.bold
    },
    textContainer: {
      marginLeft: 12,
    },
    itemDes: {
      fontFamily: customFonts.medium,
      fontSize: 14,
      color: colors.blackTransluscent,
      marginTop: 4,
      width: 220
    },
    status: {
      position: 'absolute',
      top: 12,
      right: 18,
      color: colors.facebookBlue,
      fontFamily: customFonts.bold
    }
  }

  const {
    imageBackgroundStyle,
    mainContainer,
    outerContainer,
    itemHeading,
    textContainer,
    itemDes,
    status
  } = styles

  return (
    <View style={outerContainer}>
      <Card height={140} width='95%' elevation={4}>
        <View style={mainContainer}>
          <Card
            width={80}
            height={80}
            elevation={4}>
            <ImageBackground
              style={imageBackgroundStyle}
              imageStyle={imageBackgroundStyle}
              source={{ uri: item.imageURL }} />
          </Card>

          <View style={textContainer}>
            <Text style={itemHeading}>{item.courseItem}</Text>
            <Text style={itemDes} numberOfLines={2} ellipsizeMode='tail'>{item.itemDescription}</Text>
          </View>

          <Text style={status}>{item.status}</Text>
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
  },
  headingStyle: {
    fontSize: 40,
    fontFamily: customFonts.semiBold,
    color: colors.colorAccent,
    marginTop: dimens.screenSafeUpperNotchDistance + 60,
    width: '100%',
    textAlign: 'left',
    paddingLeft: dimens.screenHorizontalMargin
  },
  subHeadingStyle: {
    fontSize: 19,
    fontFamily: customFonts.regular,
    marginTop: 10,
    width: '100%',
    textAlign: 'left',
    color: colors.colorAccent,
    paddingLeft: dimens.screenHorizontalMargin
  },
  expandedHeaderContainerStyle: {
    width: '100%',
    height: HEADER_EXPANDED_HEIGHT,
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'absolute'
  },
  collpasedHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  collpasedHeaderTitle: {
    fontSize: 24,
    textAlign: "center",
    color: colors.colorAccent,
    fontFamily: customFonts.semiBold
  },
  headerSearchStyling: {
    position: 'absolute',
    right: dimens.screenHorizontalMargin,
    marginTop: dimens.screenSafeUpperNotchDistance + 18
  },
  mainHeaderContainerStyle: {
    width: '100%',
  },
  gradientStyle: {
    height: '100%',
    width: '100%',
    zIndex: -2
  },
})

ClientOrderScreen.navigationOptions = {
  header: null
}

ClientOrderScreen.propTypes = {
  navigation: PropTypes.object
}

export default ClientOrderScreen