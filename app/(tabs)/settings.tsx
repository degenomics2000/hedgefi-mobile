import { StyleSheet, View, Text, Pressable, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const openPrivacyPolicy = () => {
    Linking.openURL('https://hedgefi.finance/privacy-policy');
  };

  const openTerms = () => {
    Linking.openURL('https://hedgefi.finance/terms');
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.versionContainer}>
          <Text style={styles.version}>Version 1.0.0</Text>
          <Text style={styles.buildNumber}>Build #1</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal</Text>
        <Pressable 
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
          ]} 
          onPress={openPrivacyPolicy}>
          <Ionicons name="shield-checkmark-outline" size={24} color="#4200FF" />
          <Text style={styles.buttonText}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </Pressable>
        <Pressable 
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
          ]} 
          onPress={openTerms}>
          <Ionicons name="document-text-outline" size={24} color="#4200FF" />
          <Text style={styles.buttonText}>Terms of Service</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    padding: 24,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#F7F7F7',
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  versionContainer: {
    backgroundColor: 'rgba(26, 26, 26, 0.5)',
    padding: 20,
    borderRadius: 16,
  },
  version: {
    color: '#F7F7F7',
    fontSize: 16,
    marginBottom: 4,
  },
  buildNumber: {
    color: '#666',
    fontSize: 14,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 26, 26, 0.5)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
  },
  buttonPressed: {
    backgroundColor: 'rgba(26, 26, 26, 0.7)',
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: '#F7F7F7',
    fontSize: 16,
    flex: 1,
    marginLeft: 16,
    letterSpacing: 0.2,
  },
});