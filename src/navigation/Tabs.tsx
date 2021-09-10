import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParams, StackNavigationList } from './StackNavigationList';
import { SearchScreen } from '../screens/SearchScreen';
import { ActivityIndicator, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { PokemonScreen } from '../screens/PokemonScreen';
import { StackNavigationSearch } from './StackNavigationSearch';

const Tab = createBottomTabNavigator();


export const TabScreen = () => {
  return (
    <Tab.Navigator
        sceneContainerStyle={{
            backgroundColor: 'white'
        }}
        screenOptions={{
            tabBarActiveTintColor: '#5856D6',
            tabBarLabelStyle: {
                marginBottom: (Platform.OS === 'ios') ? 0 : 10
            },
            tabBarStyle: {
                position: 'absolute',
                backgroundColor: 'rgba(255,255,255, 0.92)',
                borderWidth: 0,
                elevation: 0,
                height: (Platform.OS === 'ios') ? 80 : 60
            }
        }}
    >
        <Tab.Screen 
        name="PrincipalScreen" 
        component={StackNavigationList}
        options= {{
            headerShown: false,
            tabBarLabel: "List",
            tabBarLabelStyle: {fontSize:15, top: -5},
            tabBarIcon: ({color}) => <Icon color={color} size={25} name="list-outline" />
        }}
        />
        <Tab.Screen 
            name="Search" 
            component={StackNavigationSearch} 
            options= {{
                headerShown: false,
                tabBarLabel: "Search",
                tabBarLabelStyle: {fontSize:15, top: -5},
                tabBarIcon: ({color}) => <Icon color={color} size={25} name="search-outline" />
            }}
        />
    </Tab.Navigator>
  );
}
