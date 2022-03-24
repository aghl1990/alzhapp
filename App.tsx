import 'react-native-gesture-handler';
import React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { LogBox } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';


// const AppState = ({children}:any)=>{
  const AppState = ({children}:{children:JSX.Element | JSX.Element[]})=>{
    return (
      <AuthProvider>
        {children}
      </AuthProvider>
    )
}
export const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator/>
      </AppState>
    </NavigationContainer>
  )
}
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);