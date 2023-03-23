import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function CalculatorButton({ label, onPress = () => {}, cols = 1, textColor = "#ffffff" }) {
  return (
    <View style={[ styles.container, { flex: cols, aspectRatio: cols } ]}>
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={[ styles.text, { color: textColor } ]}>{label}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Need an inner container. Having padding in outer container breaks grid for some reason
  innerContainer: {
    padding: 10,
    width: "100%",
    height: "100%"
  },

  button: {
    backgroundColor: '#272b33',
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },

  text: {
    fontWeight: "bold",
    fontSize: 18
  }
});