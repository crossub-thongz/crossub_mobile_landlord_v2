import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { money, monthLabel, usePortfolio } from '@/src/portfolio';
import { colors } from '@/src/theme';

export default function StatementsScreen() {
  const { statements, status, error } = usePortfolio();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.kicker}>ACCOUNTING</Text>
        <Text style={styles.h1}>Statements</Text>
        {status === 'loading' ? <ActivityIndicator color={colors.green} /> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {status === 'ready' && statements.length === 0 ? <Text style={styles.body}>No owner statements yet.</Text> : null}
        {statements.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.title}>{monthLabel(item.month)}</Text>
            <Text style={styles.body}>{item.propertyAddress}</Text>
            <Text style={styles.body}>Rent collected {money(item.rentReceived)}</Text>
            <Text style={styles.body}>Agent fee {money(item.agentFee)}</Text>
            <Text style={styles.body}>Crossub fee {money(item.crossubFee)}</Text>
            <Text style={styles.body}>Owner payment {money(item.netToLandlord)}</Text>
          </View>
        ))}
        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            Figures are monthly owner-statement totals from Crossub Accounting. Tenant contact details are not shown here.
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
  card: { backgroundColor: '#fff', borderWidth: 1, borderColor: colors.line, borderRadius: 18, padding: 16, gap: 4 },
  title: { color: colors.ink, fontSize: 16, fontWeight: '700', marginBottom: 4 },
  body: { color: colors.ink, fontSize: 14 },
  notice: { backgroundColor: colors.soft, borderRadius: 12, padding: 12 },
  noticeText: { color: '#496653', fontSize: 12, lineHeight: 18 },
  error: { color: '#9b3b3b' },
});
