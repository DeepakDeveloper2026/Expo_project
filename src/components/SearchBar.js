import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { colors } from '../styles/globalStyles';

const SearchBar = ({ value, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput style={styles.input} placeholder={placeholder} value={value} onChangeText={onChangeText} placeholderTextColor={colors.textLight} />
      {value !== '' && (<TouchableOpacity onPress={() => onChangeText('')}><Text style={styles.clearButton}>✕</Text></TouchableOpacity>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, margin: 16, marginBottom: 8, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1, borderColor: colors.border },
  icon: { fontSize: 20, marginRight: 8 },
  input: { flex: 1, paddingVertical: 12, fontSize: 16, color: colors.text },
  clearButton: { fontSize: 20, color: colors.textSecondary, padding: 4 },
});

export default SearchBar;
