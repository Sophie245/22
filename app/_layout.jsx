import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '../components/TabBar'

const _layout = () => {
  return (
    <Tabs
        tabBar={props=> <TabBar {...props} />}
    >
        <Tabs.Screen
            name="profile"
            options={{
                title: "Profile"
            }}
        />
        <Tabs.Screen
            name="tracker"
            options={{
                title: "Tracker"
            }}
        />
    </Tabs>
  )
}

export default _layout