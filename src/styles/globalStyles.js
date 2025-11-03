import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#007AFF',
  success: '#34C759',
  danger: '#FF3B30',
  warning: '#FF9500',
  background: '#F5F5F5',
  white: '#FFFFFF',
  text: '#333333',
  textSecondary: '#666666',
  textLight: '#999999',
  border: '#E0E0E0',
};

export const globalStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.white, padding: 20, paddingTop: 50, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: colors.text, marginBottom: 4 },
  headerSubtitle: { fontSize: 14, color: colors.textSecondary },
  card: { backgroundColor: colors.white, borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  button: { backgroundColor: colors.primary, borderRadius: 12, padding: 16, alignItems: 'center' },
  buttonText: { color: colors.white, fontSize: 16, fontWeight: '600' },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyStateText: { fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 8 },
  emptyStateSubtext: { fontSize: 14, color: colors.textSecondary },
});
