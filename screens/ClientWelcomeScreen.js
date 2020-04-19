import React, { Component } from 'react';
import { View, StyleSheet, Text, SectionList, Animated, ImageBackground, Dimensions, TouchableOpacity } from 'react-native'
import { SearchIcon, Card, Icon, Loading } from '../Components'
import { dimens, colors, iconNames, customFonts, screens } from '../constants'
import { commonStyling } from '../common'
import { PropTypes } from 'prop-types'
import firebase from '../config/firebase'
import collectionNames from '../config/collectionNames';
import { LinearGradient } from 'expo-linear-gradient';
import { SearchBar } from 'react-native-elements';

const HEADER_EXPANDED_HEIGHT = 250;
const HEADER_COLLAPSED_HEIGHT = 100;

const { height: SCREEN_HEIGHT } = Dimensions.get("screen")

class ClientWelcomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
      isContenLoading: true,
      coursesList: [],
      scrollY: new Animated.Value(0),
      search: false,
      showSearch: false,
      searchCourseList: []
    }
  }

  componentDidMount = () => {
    this.fetchCoursesFromDB()
  }

  showSearchPanel = () => this.setState({ showSearch: true })

  getMainHeaderView = () => {
    const {
      headingStyle,
      subHeadingStyle,
      expandedHeaderContainerStyle
    } = styles

    return (
      <View style={expandedHeaderContainerStyle}>
        <Text style={headingStyle}>Courses</Text>
        <Text style={subHeadingStyle}>Find the course of your choice</Text>
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
        <Text style={collpasedHeaderTitle}>Courses</Text>
      </View>
    )
  }


  updateSearch = search => {
    this.setState({ search: true })
    if (search === '') {
      this.setState({
        searchCourseList: this.state.coursesList
      })
    }
    const searchEntered = search.toUpperCase()
    const newListToShow = []
    for (let index in this.state.coursesList) {
      const title = this.state.coursesList[index].name
      let itemObject = this.state.coursesList[index]
      const coursesToShow = []
      for (let index in itemObject.data) {
        let item = itemObject.data[index]
        if (item.name.toUpperCase().includes(searchEntered)) {
          coursesToShow.push(item)
        }
      }
      let objectToShow = {}
      objectToShow.title = title
      objectToShow.data = coursesToShow
      newListToShow.push(objectToShow)
    }

    this.setState({
      searchCourseList: newListToShow
    })
  }

  fetchCoursesFromDB = async () => {
    const coursesRef = firebase.firestore().collection(collectionNames.courses)
    let coursesList = []
    await coursesRef
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          coursesList.push(doc.data())
        });
      })
    this.formulateSectionListOfCourse(coursesList)
  }

  formulateSectionListOfCourse = (coursesList) => {
    let coursesDictionary = {}
    for (let index in coursesList) {
      const course = coursesList[index]
      const category = course.offeringEntity
      if (Array.isArray(coursesDictionary[category])) {
        const courses = coursesDictionary[category]
        courses.push(course)
        coursesDictionary[category] = courses
      } else {
        coursesDictionary[category] = [course]
      }
    }
    this.constructFinalSectionList(coursesDictionary)
  }

  constructFinalSectionList = (dictionary) => {
    let listToReturn = []
    if (dictionary) {
      for (let key in dictionary) {
        listToReturn.push({ title: key, data: dictionary[key] })
      }
    }
    this.setState({
      coursesList: listToReturn,
      isContenLoading: false
    })
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
      personContainer,
      mainHeaderContainerStyle,
      gradientStyle
    } = styles

    const {
      navigation
    } = this.props
    const componenetWhenLoaded =
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


        <SearchIcon
          style={headerSearchStyling}
          size={34}
          onPress={this.showSearchPanel}
          color={colors.colorAccent} />

        {this.state.showSearch ? <SearchBar
          placeholder="Search Item"
          onChangeText={this.updateSearch}
          platform={(Platform.OS === 'ios') ? 'ios' : 'android'}
          showCancel={true}
          round={true}
          contentContainerStyle={colors.colorAccent}
          value={this.state.search}
        /> : null}

        {/* SECTION LIST */}
        <SectionList
          scrollEnabled={this.state.coursesList.length ? true : false}
          contentContainerStyle={{ minHeight: SCREEN_HEIGHT + HEADER_COLLAPSED_HEIGHT }}
          sections={this.state.search ? this.state.searchCourseList : this.state.coursesList}
          renderItem={({ item }) => CourseItem(item, this.props)}
          renderSectionHeader={({ section }) => CourseHeader(section, this.props)}
          keyExtractor={(item, index) => index + item.price}
          onScroll={Animated.event(
            [{
              nativeEvent: {
                contentOffset: {
                  y: this.state.scrollY
                }
              }
            }])
          }
          scrollEventThrottle={16}
        />
      </View>

    const componentLoading = <Loading />

    return this.state.isContenLoading ? componentLoading : componenetWhenLoaded
  }
}


const CourseHeader = (section) => {

  const {
    sectionHeaderContainer,
    sectionHeaderTitle
  } = styles

  const sectionHeader = <View style={sectionHeaderContainer}>
    <Text style={sectionHeaderTitle}>{section.title}</Text>
  </View>

  return sectionHeader

}

const CourseItem = (item, props) => {
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
      marginHorizontal: 10,
      padding: 12,
      width: 230,
      justifyContent: 'center',
      alignItems: 'space-evenly'
    },
    courseHeading: {
      fontSize: 18,
      fontFamily: customFonts.medium,
      color: colors.colorPrimary
    },
    courseDescription: {
      fontSize: 12,
      color: colors.black,
      marginTop: 8,
      fontFamily: customFonts.mediumItalic
    },
  }


  const {
    charityItemOuterContainer,
    imageStyle,
    cardItemContainer,
    textContainer,
    courseHeading,
    courseDescription
  } = styles

  const component =
    <View style={charityItemOuterContainer}>
      <Card width='95%' height={180} elevation={4}>
        <View style={cardItemContainer}>
          <Card width={90} height={90} elevation={dimens.defaultBorderRadius}>
            <ImageBackground
              style={imageStyle}
              imageStyle={{ borderRadius: dimens.defaultBorderRadius }}
              source={{ uri: item.imageURL }} />
          </Card>
          <TouchableOpacity onPress={() => {
            props.navigation.navigate(screens.CourseDescriptionScreen, {
              course: item
            })
          }}>
            <View style={textContainer}>
              <Text style={courseHeading}>{item.name}</Text>
        <Text style={courseDescription} numberOfLines={3} ellipsizeMode='tail'>{item.courseDescription}</Text>
              <Text style={courseDescription}>{item.price + ' ' + item.currency}</Text>
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
  },
  sectionHeaderContainer: {
    width: '100%',
    height: 44,
    backgroundColor: colors.colorSecondary,
    justifyContent: 'center',
    paddingLeft: dimens.screenHorizontalMargin
  },
  sectionHeaderTitle: {
    color: colors.colorAccent,
    fontSize: 17,
    fontFamily: customFonts.semiBold
  },
  gradientStyle: {
    height: '100%',
    width: '100%',
    zIndex: -2
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
  mainHeaderContainerStyle: {
    width: '100%',
    backgroundColor: colors.colorPrimary
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

})

ClientWelcomeScreen.navigationOptions = {
  header: null
}

ClientWelcomeScreen.propTypes = {
  navigation: PropTypes.object
}

export default ClientWelcomeScreen