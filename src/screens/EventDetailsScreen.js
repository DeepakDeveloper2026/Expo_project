import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { colors, globalStyles } from '../styles/globalStyles';
import { formatDate } from '../utils/dateFormatter';

const EventDetailsScreen = ({ route, navigation, onRegister, isRegistered }) => {
  const { event } = route.params;

  const handleRegister = () => {
    if (isRegistered(event.id)) {
      Alert.alert('Already Registered', 'You have already registered for this event!', [{ text: 'OK' }]);
    } else {
      onRegister(event);
      Alert.alert('Success!', 'You have successfully registered for this event!', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={globalStyles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{event.title}</Text>
        <View style={styles.categoryBadge}><Text style={styles.categoryText}>{event.category}</Text></View>

        <View style={styles.detailsCard}>
          <View style={styles.detailRow}><Text style={styles.icon}>📅</Text><View style={styles.detailInfo}><Text style={styles.detailLabel}>Date</Text><Text style={styles.detailValue}>{formatDate(event.date)}</Text></View></View>
          <View style={styles.detailRow}><Text style={styles.icon}>📍</Text><View style={styles.detailInfo}><Text style={styles.detailLabel}>Location</Text><Text style={styles.detailValue}>{event.location}</Text></View></View>
          <View style={styles.detailRow}><Text style={styles.icon}>👤</Text><View style={styles.detailInfo}><Text style={styles.detailLabel}>Organized by</Text><Text style={styles.detailValue}>{event.organizer}</Text></View></View>
        </View>

        <View style={styles.descriptionCard}><Text style={styles.descriptionTitle}>About this event</Text><Text style={styles.descriptionText}>{event.description}</Text></View>

        <TouchableOpacity style={[styles.registerButton, isRegistered(event.id) && styles.registeredButton]} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>{isRegistered(event.id) ? 'Already Registered ✓' : 'Register for Event'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  contentContainer: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 12 },
  categoryBadge: { alignSelf: 'flex-start', backgroundColor: colors.primary, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, marginBottom: 16 },
  categoryText: { color: colors.white, fontSize: 12, fontWeight: '600' },
  detailsCard: { backgroundColor: colors.white, borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: colors.border },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  icon: { fontSize: 20, marginRight: 12 },
  detailInfo: { flex: 1 },
  detailLabel: { fontSize: 12, color: colors.textSecondary, marginBottom: 2 },
  detailValue: { fontSize: 16, color: colors.text, fontWeight: '500' },
  descriptionCard: { backgroundColor: colors.white, borderRadius: 12, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: colors.border },
  descriptionTitle: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 8 },
  descriptionText: { fontSize: 15, color: colors.textSecondary, lineHeight: 22 },
  registerButton: { backgroundColor: colors.primary, borderRadius: 12, padding: 16, alignItems: 'center' },
  registeredButton: { backgroundColor: colors.success },
  registerButtonText: { color: colors.white, fontSize: 16, fontWeight: '600' },
});

export default EventDetailsScreen;
