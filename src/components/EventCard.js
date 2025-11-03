import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../styles/globalStyles';
import { formatShortDate } from '../utils/dateFormatter';

const EventCard = ({ event, onPress, showRegistered = false }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={2}>{event.title}</Text>
        {showRegistered && (<View style={styles.registeredBadge}><Text style={styles.checkmark}>✓</Text></View>)}
      </View>

      <View style={styles.categoryBadge}><Text style={styles.categoryText}>{event.category}</Text></View>

      <View style={styles.infoRow}><Text style={styles.icon}>📅</Text><Text style={styles.infoText}>{formatShortDate(event.date)}</Text></View>

      <View style={styles.infoRow}><Text style={styles.icon}>📍</Text><Text style={styles.infoText} numberOfLines={1}>{event.location}</Text></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: colors.white, borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  title: { fontSize: 18, fontWeight: '600', color: colors.text, flex: 1, marginRight: 8 },
  registeredBadge: { backgroundColor: colors.success, width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  checkmark: { color: colors.white, fontSize: 16, fontWeight: 'bold' },
  categoryBadge: { alignSelf: 'flex-start', backgroundColor: colors.primary, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginBottom: 8 },
  categoryText: { color: colors.white, fontSize: 12, fontWeight: '600' },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  icon: { fontSize: 16, marginRight: 8 },
  infoText: { fontSize: 14, color: colors.textSecondary, flex: 1 },
});

export default EventCard;
