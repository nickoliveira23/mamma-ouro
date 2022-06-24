import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Index from './pages/Index';
import Login from './pages/Login';
import Email from './pages/Email';
import Password from './pages/Password';
import Collaborator from './pages/Collaborator';
import Maternity from './pages/Maternity';
import EditDonor from './pages/EditDonor';
import Dependent from './pages/Dependent';
import EditDependent from './pages/EditDependent';
import Pending from './pages/Pending';
import UserProfile from './pages/UserProfile';
import Schedule from './pages/Schedule';
import HospitalDetails from './pages/HospitalDetails';
import ScheduleDetails from './pages/ScheduleDetails';

import { TabParamList } from './types';
import { StackParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

function Home() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Perfil') {
          iconName = focused
            ? 'ios-home'
            : 'ios-home-outline';
        } else if (route.name === 'Pendente') {
          iconName = focused
            ? 'ios-book'
            : 'ios-book-outline';
        } else if (route.name === 'Agenda') {
          iconName = focused
            ? 'ios-journal'
            : 'ios-journal-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#A1E1D8',
      tabBarInactiveTintColor: 'gray',
    })}
    >
      <Tab.Screen name="Perfil" component={UserProfile} />
      <Tab.Screen name="Pendente" component={Pending} />
      <Tab.Screen name="Agenda" component={Schedule} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator<StackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index" screenOptions={{ headerShown: false }
      }>
        <Stack.Screen name='Index' component={Index} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Email' component={Email} />
        <Stack.Screen name='Password' component={Password} />
        <Stack.Screen name='EditDonor' component={EditDonor} />
        <Stack.Screen name='Dependent' component={Dependent} />
        <Stack.Screen name='EditDependent' component={EditDependent} />
        <Stack.Screen name='Maternity' component={Maternity} />
        <Stack.Screen name='Collaborator' component={Collaborator} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='HospitalDetails' component={HospitalDetails} />
        <Stack.Screen name='ScheduleDetails' component={ScheduleDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
