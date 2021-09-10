import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { TabScreen } from './src/navigation/Tabs';
import { KeyboardAvoidingView, Platform } from 'react-native';

const App = () => {
  return (
    <NavigationContainer>
      <KeyboardAvoidingView  //hace que le teclado no estorbe la visualicación
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex: 1}}
      >
        {/* <StackNavigation /> */}
        <TabScreen />
      </KeyboardAvoidingView>
    </NavigationContainer>
  )
}

export default App;
