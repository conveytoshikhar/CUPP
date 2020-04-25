import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { dimens, colors, customFonts } from '../constants'
import Icon from './Icon'
import { PropTypes } from 'prop-types'

const LogoPlaceholder = (props) => {
  const{
    iconSize,
    iconMargin,
    accent,
    size
  } = props

  const fontStyle = {
    color: accent,
    fontSize: size,
    fontFamily: customFonts.bold,
    marginRight: 4,
    marginLeft: 4
  }

  const componenet =
    <View style={props.containerStyle}>
      <View style={styles.logoContainer}>
        <Text style={fontStyle}>IdentifEye</Text>
        {/* <Icon style={{marginTop: iconMargin}} nameAndroid='md-leaf' nameIOS='ios-leaf' color={accent} size={iconSize} /> */}
      </View>

    </View>

  return componenet
}

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row'
  }
})

LogoPlaceholder.propTypes = {
  style: PropTypes.object
}

export default LogoPlaceholder

