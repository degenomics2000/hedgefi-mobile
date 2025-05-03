import { StyleSheet, View, Pressable, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { BlurView } from 'expo-blur';

export default function HomeButton() {
  const pathname = usePathname();

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  const refreshPage = () => {
    if (pathname === '/web' && typeof window !== 'undefined') {
      (window as any).triggerWebViewRefresh?.();
    } else if (pathname) {
      router.replace(pathname);
    }
  };

  const NavigationBar = Platform.select({
    ios: BlurView,
    android: BlurView,
    default: View,
  });

  return (
    <View style={styles.container}>
      <NavigationBar 
        style={styles.navigationBar}
        intensity={20} 
        tint="dark"
      >
        <View style={styles.leftSection}>
          <Pressable 
            style={styles.navButton}
            onPress={goBack}>
            <MaterialCommunityIcons name="chevron-left" size={24} color="#F7F7F7" />
          </Pressable>
        </View>
        
        <View style={styles.centerSection}>
          <Pressable 
            style={[styles.navButton, styles.homeButton]}
            onPress={() => router.push('/')}>
            <MaterialCommunityIcons name="home" size={24} color="#F7F7F7" />
          </Pressable>
        </View>
        
        <View style={styles.rightSection}>
          <Pressable 
            style={styles.navButton}
            onPress={refreshPage}>
            <MaterialCommunityIcons name="refresh" size={24} color="#F7F7F7" />
          </Pressable>
        </View>
      </NavigationBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: 'transparent',
  },
  navigationBar: {
    flexDirection: 'row',
    backgroundColor: Platform.select({
      web: 'rgba(15, 15, 15, 0.8)',
      default: 'transparent',
    }),
    borderRadius: 30,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    overflow: 'hidden',
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeButton: {
    backgroundColor: '#4200FF',
    shadowColor: '#4200FF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
  },
});