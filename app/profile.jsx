import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ColorList from '../components/ColorList'

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.help}>what do you need help with?</Text>
      <ColorList color="#4f46e5" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  help: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20
  }
})

export default Profile;
