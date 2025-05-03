import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HomeButton from '../components/HomeButton';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function RootLayout() {
  useFrameworkReady();
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { 
                backgroundColor: '#0F0F0F',
              },
            }}>
            <Stack.Screen 
              name="(tabs)" 
              options={{ 
                headerShown: false,
              }} 
            />
            <Stack.Screen 
              name="web" 
              options={{ 
                presentation: 'modal',
                headerShown: false,
              }} 
            />
          </Stack>
        </SafeAreaView>
        <HomeButton />
        <StatusBar style="light" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  safeArea: {
    flex: 1,
  },
});