import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { AuthProvider, useAuth } from '@/src/auth';
import { PortfolioProvider } from '@/src/portfolio';
import { colors } from '@/src/theme';

function Gate() {
  const { status } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    const path = segments.join('/');
    const inAuth = path === '(auth)' || path.startsWith('(auth)/');
    if (status !== 'authed' && !inAuth) router.replace('/login');
    else if (status === 'authed' && inAuth) router.replace('/');
  }, [router, segments, status]);

  return (
    <View style={styles.root}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }} />
      <StatusBar style="dark" />
      {status === 'loading' ? (
        <View style={styles.boot}>
          <ActivityIndicator color={colors.green} />
        </View>
      ) : null}
    </View>
  );
}

export default function RootLayout() {
  return (
    <PortfolioProvider>
      <AuthProvider>
        <Gate />
      </AuthProvider>
    </PortfolioProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  boot: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' },
});
