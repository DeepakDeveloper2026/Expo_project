import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import EventCard from '../components/EventCard';
import { colors, globalStyles } from '../styles/globalStyles';

const RegisteredEventsScreen = ({ navigation, registeredEvents, onUnregister }) => {
  const handleUnregister = (eventId) => {
    Alert.alert('Unregister', 'Are you sure you want to unregister from this event?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Unregister', style: 'destructive', onPress: () => { onUnregister(eventId); Alert.alert('Success', 'You have been unregistered from this event.'); } }
    ]);
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>My Registrations</Text>
        <Text style={globalStyles.headerSubtitle}>{registeredEvents.length} event{registeredEvents.length !== 1 ? 's' : ''} registered</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {registeredEvents.length > 0 ? (
          registeredEvents.map(event => (
            <View key={event.id} style={styles.eventContainer}>
              <EventCard event={event} onPress={() => navigation.navigate('EventDetails', { event })} showRegistered={true} />
              <TouchableOpacity style={styles.unregisterButton} onPress={() => handleUnregister(event.id)}>
                <Text style={styles.unregisterButtonText}>Unregister</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={globalStyles.emptyState}>
            <Text style={globalStyles.emptyStateText}>No registrations yet</Text>
            <Text style={globalStyles.emptyStateSubtext}>Browse events and register to see them here</Text>
            <TouchableOpacity style={styles.browseButton} onPress={() => navigation.navigate('Events')}>
              <Text style={styles.browseButtonText}>Browse Events</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { padding: 16, paddingBottom: 30 },
  eventContainer: { marginBottom: 12 },
  unregisterButton: { backgroundColor: colors.danger, borderRadius: 8, padding: 12, alignItems: 'center', marginTop: -8, marginHorizontal: 16, marginBottom: 8 },
  unregisterButtonText: { color: colors.white, fontSize: 14, fontWeight: '600' },
  browseButton: { backgroundColor: colors.primary, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12, marginTop: 16 },
  browseButtonText: { color: colors.white, fontSize: 16, fontWeight: '600' },
});

export default RegisteredEventsScreen;
