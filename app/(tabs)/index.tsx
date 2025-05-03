import { StyleSheet, View, Text, Image, Pressable, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  const navigateToUrl = (url: string) => {
    router.push({
      pathname: '/web',
      params: { url }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <StatusBar style="light" />
        
        <View style={styles.hero}>
          <View style={styles.heroContent}>
            <Image
              source={require('../../assets/transparent logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.heroTitle}>Welcome to the HedgeFi Mobile App</Text>
            <Text style={styles.heroSubtitle}>
              Intelligent, self-learning AI that executes trades autonomously.
            </Text>
          </View>
        </View>

        <View style={styles.cardsContainer}>
          <Pressable 
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed
            ]}
            onPress={() => navigateToUrl('https://hedgefi.finance/app/user')}>
            <View style={styles.cardIcon}>
              <MaterialCommunityIcons name="robot" size={32} color="#4200FF" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Manage your Trading Agent</Text>
              <Text style={styles.cardDescription}>Track your agents performance and configure settings</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  hero: {
    height: 360,
    width: '100%',
    position: 'relative',
  },
  heroContent: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    position: 'relative',
    zIndex: 1,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 24,
  },
  heroTitle: {
    color: '#F7F7F7',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  heroSubtitle: {
    color: '#F7F7F7',
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.8,
    maxWidth: 300,
    lineHeight: 26,
    letterSpacing: 0.3,
  },
  cardsContainer: {
    gap: 16,
    padding: 24,
    paddingTop: 0,
    backgroundColor: '#0F0F0F',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 26, 26, 0.5)',
    padding: 24,
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  cardPressed: {
    backgroundColor: 'rgba(26, 26, 26, 0.7)',
    transform: [{ scale: 0.98 }],
  },
  cardIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(66, 0, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: '#F7F7F7',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  cardDescription: {
    color: '#888',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.2,
  }
});