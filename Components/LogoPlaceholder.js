import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { dimens, colors, customFonts } from '../constants'
import { PropTypes } from 'prop-types'

const LogoPlaceholder = (props) => {
  const fontStyle = {
    color: props.accent,
    fontSize: props.size,
    fontFamily: customFonts.bold
  }

  const componenet = 
  <View style={props.containerStyle}>
    <Text style={fontStyle}>FS</Text>
  </View>

  return componenet
}

const styles = StyleSheet.create({

})

LogoPlaceholder.propTypes = {
  style: PropTypes.object
}

export default LogoPlaceholder

