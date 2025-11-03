import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import RegisteredEventsScreen from '../screens/RegisteredEventsScreen';
import { colors } from '../styles/globalStyles';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const STORAGE_KEY = '@registered_events';

const HomeStack = ({ registeredEvents, registerForEvent, isRegistered }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="EventList">
      {(props) => <HomeScreen {...props} registeredEvents={registeredEvents} />}
    </Stack.Screen>
    <Stack.Screen name="EventDetails" options={{ headerShown: true, title: 'Event Details' }}>
      {(props) => (
        <EventDetailsScreen
          {...props}
          onRegister={registerForEvent}
          isRegistered={isRegistered}
        />
      )}
    </Stack.Screen>
  </Stack.Navigator>
);

const RegisteredStack = ({ registeredEvents, unregisterFromEvent, registerForEvent, isRegistered }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="RegisteredList">
      {(props) => (
        <RegisteredEventsScreen
          {...props}
          registeredEvents={registeredEvents}
          onUnregister={unregisterFromEvent}
        />
      )}
    </Stack.Screen>
    <Stack.Screen name="EventDetails" options={{ headerShown: true, title: 'Event Details' }}>
      {(props) => (
        <EventDetailsScreen
          {...props}
          onRegister={registerForEvent}
          isRegistered={isRegistered}
        />
      )}
    </Stack.Screen>
  </Stack.Navigator>
);

export default function AppNavigator() {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => { loadRegisteredEvents(); }, []);
  useEffect(() => { saveRegisteredEvents(); }, [registeredEvents]);

  const loadRegisteredEvents = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) setRegisteredEvents(JSON.parse(jsonValue));
    } catch (e) {
      console.error('Load error', e);
    }
  };

  const saveRegisteredEvents = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(registeredEvents));
    } catch (e) {
      console.error('Save error', e);
    }
  };

  const registerForEvent = (event) => {
    if (!registeredEvents.some(e => e.id === event.id)) {
      setRegisteredEvents(prev => [...prev, event]);
    }
  };

  const unregisterFromEvent = (eventId) => {
    setRegisteredEvents(prev => prev.filter(e => e.id !== eventId));
  };

  const isRegistered = (eventId) => registeredEvents.some(e => e.id === eventId);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
      }}
    >
      <Tab.Screen
        name="Events"
        children={() => <HomeStack registeredEvents={registeredEvents} registerForEvent={registerForEvent} isRegistered={isRegistered} />}
        options={{ tabBarIcon: () => <Text style={{ fontSize: 18 }}>📅</Text> }}
      />
      <Tab.Screen
        name="Registered"
        children={() => <RegisteredStack registeredEvents={registeredEvents} unregisterFromEvent={unregisterFromEvent} registerForEvent={registerForEvent} isRegistered={isRegistered} />}
        options={{
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>✓</Text>,
          tabBarBadge: registeredEvents.length > 0 ? registeredEvents.length : null,
        }}
      />
    </Tab.Navigator>
  );
}
