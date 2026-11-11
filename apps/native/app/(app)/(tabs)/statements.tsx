import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/src/theme';

const MONTHS = [
  ['October 2026', 'Rent collected $4,800', 'Fees $420', 'Owner payment $4,380'],
  ['September 2026', 'Rent collected $4,800', 'Fees $420', 'Owner payment $4,380'],
];

export default function StatementsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.kicker}>ACCOUNTING</Text>
        <Text style={styles.h1}>Statements</Text>
        {MONTHS.map(([month, rent, fees, paid]) => (
          <View key={month} style={styles.card}>
            <Text style={styles.title}>{month}</Text>
            <Text style={styles.body}>{rent}</Text>
            <Text style={styles.body}>{fees}</Text>
            <Text style={styles.body}>{paid}</Text>
          </View>
        ))}
        <View style={styles.notice}>
          <Text style={styles.noticeText}>Figures are owner-statement totals. Tenant arrears screens and receipt images belong in the tenant app, and only when Crossub Accounting holds them.</Text>
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
});
