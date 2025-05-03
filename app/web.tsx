import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Linking, Platform, Pressable, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Create a global event system for WebView refresh
const REFRESH_EVENT = 'WEBVIEW_REFRESH';
const eventListeners = new Set<() => void>();

if (typeof window !== 'undefined') {
  (window as any).triggerWebViewRefresh = () => {
    eventListeners.forEach(listener => listener());
  };
}

export default function WebViewScreen() {
  const { url } = useLocalSearchParams<{ url: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const webViewRef = useRef<WebView>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const handleRefresh = () => {
      if (webViewRef.current) {
        webViewRef.current.reload();
      }
    };

    eventListeners.add(handleRefresh);
    return () => {
      eventListeners.delete(handleRefresh);
    };
  }, []);

  // Inject Web3 configuration and wallet detection
  const injectedJavaScript = `
    (function() {
      // Clear any existing wallet instances
      window.ethereum = undefined;
      window.web3 = undefined;

      // Override wallet detection
      Object.defineProperty(window, 'ethereum', {
        set: function() {},
        get: function() {
          return undefined;
        }
      });

      // Helper to handle wallet connections
      window.openWalletApp = function(uri) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'WALLET_CONNECT', uri }));
      };

      // Intercept wallet connection attempts
      document.addEventListener('click', function(e) {
        const element = e.target;
        if (element.closest('[data-wallet], .wallet-connect, .connect-wallet, [class*="wallet"]')) {
          e.preventDefault();
          e.stopPropagation();
          window.postMessage({ type: 'WALLET_CONNECT_REQUEST' }, '*');
        }
      }, true);

      true;
    })();
  `;

  // Handle messages from WebView
  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'WALLET_CONNECT' && data.uri) {
        Linking.openURL(data.uri);
      }
    } catch (error) {
      console.error('Error handling WebView message:', error);
    }
  };

  // Handle navigation state changes and external URLs
  const handleNavigationStateChange = (navState: any) => {
    setCanGoBack(navState.canGoBack);
    const { url: navUrl } = navState;
    
    // Handle wallet-related URLs
    if (
      navUrl.startsWith('ethereum:') || 
      navUrl.startsWith('metamask:') ||
      navUrl.startsWith('wc:') ||
      navUrl.startsWith('trust:') ||
      navUrl.includes('metamask.app.link')
    ) {
      Linking.openURL(navUrl);
      return false;
    }

    // Handle other external URLs
    if (navUrl !== url && !navUrl.startsWith(url as string)) {
      Linking.openURL(navUrl);
      return false;
    }

    return true;
  };

  const goBack = () => {
    if (webViewRef.current && canGoBack) {
      webViewRef.current.goBack();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.navigationBar}>
        <Pressable 
          style={styles.backButton} 
          onPress={goBack}
        >
          <Ionicons name="chevron-back" size={24} color="#F7F7F7" />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </View>
      <WebView
        key={key}
        ref={webViewRef}
        source={{ uri: url as string }}
        style={styles.webview}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        containerStyle={{ backgroundColor: '#0F0F0F' }}
        onShouldStartLoadWithRequest={handleNavigationStateChange}
        onNavigationStateChange={handleNavigationStateChange}
        injectedJavaScriptBeforeContentLoaded={injectedJavaScript}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4200FF" />
          </View>
        )}
      />
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#4200FF" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  navigationBar: {
    height: 56,
    backgroundColor: '#0F0F0F',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  backText: {
    color: '#F7F7F7',
    fontSize: 16,
    marginLeft: 4,
  },
  webview: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F0F0F',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 15, 15, 0.9)',
  },
});