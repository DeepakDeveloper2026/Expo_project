import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { globalStyles } from '../styles/globalStyles';
import { fetchEventsFromMock } from '../utils/api';

const HomeScreen = ({ navigation, registeredEvents }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchEventsFromMock();
      setEvents(data);
      setLoading(false);
    };
    load();
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <LoadingSpinner message="Loading events..." />;

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>Campus Events</Text>
        <Text style={globalStyles.headerSubtitle}>Discover what's happening on campus</Text>
      </View>

      <SearchBar value={searchQuery} onChangeText={setSearchQuery} placeholder="Search events by name or category..." />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() => navigation.navigate('EventDetails', { event })}
              showRegistered={registeredEvents.some(e => e.id === event.id)}
            />
          ))
        ) : (
          <View style={globalStyles.emptyState}>
            <Text style={globalStyles.emptyStateText}>No events found</Text>
            <Text style={globalStyles.emptyStateSubtext}>Try adjusting your search query</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { padding: 16, paddingBottom: 30 },
});

export default HomeScreen;
