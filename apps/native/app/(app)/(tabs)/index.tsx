import { useRouter } from 'expo-router';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { money, usePortfolio } from '@/src/portfolio';
import { colors } from '@/src/theme';

export default function HomeScreen() {
  const router = useRouter();
  const portfolio = usePortfolio();
  const pending = portfolio.approvals.filter((item) => item.status === 'PENDING').length;
  const addresses = portfolio.properties.map((item) => item.address).filter(Boolean);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.kicker}>PORTFOLIO</Text>
        <Text style={styles.h1}>Good morning</Text>
        {portfolio.status === 'loading' || portfolio.status === 'idle' ? <ActivityIndicator color={colors.green} /> : null}
        {portfolio.error ? <Text style={styles.error}>{portfolio.error}</Text> : null}
        <View style={styles.card}>
          <Text style={styles.muted}>Properties</Text>
          <Text style={styles.amount}>{portfolio.status === 'ready' ? portfolio.properties.length : '—'}</Text>
          <Text style={styles.body}>
            {addresses.length > 0 ? addresses.join(' · ') : 'Properties you receive owner payouts for appear here.'}
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.tile}>
            <Text style={styles.muted}>Collected this month</Text>
            <Text style={styles.tileValue}>{portfolio.status === 'ready' ? money(portfolio.collectedThisMonth) : '—'}</Text>
          </View>
          <View style={styles.tile}>
            <Text style={styles.muted}>Waiting on you</Text>
            <Text style={styles.tileValue}>{portfolio.status === 'ready' ? pending : '—'}</Text>
          </View>
        </View>
        <Pressable accessibilityRole="button" style={styles.card} onPress={() => router.push('/approvals')}>
          <Text style={styles.title}>Approval centre</Text>
          <Text style={styles.body}>Maintenance quotes and rent reviews. Approving here does not pay a contractor.</Text>
        </Pressable>
        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            Owner totals come from Crossub Accounting. Tenant contact details are not shown on this screen.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: 20, gap: 12 },
  kicker: { color: colors.green, fontWeight: '700', letterSpacing: 1.2, fontSize: 11 },
  h1: { color: colors.ink, fontSize: 28, fontWeight: '700' },
  card: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, borderRadius: 18, padding: 16, gap: 6 },
  muted: { color: colors.muted, fontSize: 12 },
  amount: { color: colors.ink, fontSize: 28, fontWeight: '700' },
  title: { color: colors.ink, fontSize: 16, fontWeight: '700' },
  body: { color: colors.ink, fontSize: 14, lineHeight: 20 },
  row: { flexDirection: 'row', gap: 8 },
  tile: { flex: 1, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, borderRadius: 14, padding: 14, gap: 6 },
  tileValue: { color: colors.ink, fontSize: 18, fontWeight: '700' },
  notice: { backgroundColor: colors.soft, borderRadius: 12, padding: 12 },
  noticeText: { color: '#496653', fontSize: 12, lineHeight: 18 },
  error: { color: '#9b3b3b' },
});
