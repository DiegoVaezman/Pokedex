import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { RootStackParams } from "./StackNavigationList";
import { SearchScreen } from '../screens/SearchScreen';
import { PokemonScreen } from '../screens/PokemonScreen';

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigationSearch = () => {
  return (
    <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: 'white'
          }
        }}
    >
      <Stack.Screen name="HomeScreen" component={SearchScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
    </Stack.Navigator>
  );
}