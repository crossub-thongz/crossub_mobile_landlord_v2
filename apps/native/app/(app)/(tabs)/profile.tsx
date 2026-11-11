import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/src/auth';
import { colors } from '@/src/theme';

export default function ProfileScreen() {
  const { email, logout } = useAuth();
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.inner}>
        <Text style={styles.kicker}>ACCOUNT</Text>
        <Text style={styles.h1}>Profile</Text>
        <View style={styles.card}>
          <Text style={styles.title}>Owner account</Text>
          <Text style={styles.muted}>{email}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>What this app is for</Text>
          <Text style={styles.body}>See the portfolio, decide approvals, and read owner statements. Day-to-day leasing, maintenance scheduling and tenant messages stay with the agency or Crossub.</Text>
        </View>
        <Pressable accessibilityRole="button" onPress={() => logout()} style={styles.signOut}>
          <Text style={styles.signOutText}>Sign out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  inner: { padding: 20, gap: 12 },
  kicker: { color: colors.green, fontWeight: '700', letterSpacing: 1.2, fontSize: 11 },
  h1: { color: colors.ink, fontSize: 28, fontWeight: '700' },
  card: { backgroundColor: '#fff', borderWidth: 1, borderColor: colors.line, borderRadius: 18, padding: 16, gap: 6 },
  title: { color: colors.ink, fontSize: 16, fontWeight: '700' },
  muted: { color: colors.muted },
  body: { color: colors.ink, fontSize: 14, lineHeight: 20 },
  signOut: { minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  signOutText: { color: '#9b3b3b', fontWeight: '700' },
});
