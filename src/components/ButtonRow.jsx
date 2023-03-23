import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function ButtonRow({ children }) {
  return (
    <View style={styles.container}>
      { children }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1
  }
})