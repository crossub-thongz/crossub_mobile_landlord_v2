import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePortfolio } from '@/src/portfolio';
import { colors } from '@/src/theme';

export default function ApprovalsScreen() {
  const { approvals, decide } = usePortfolio();
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.kicker}>DECISIONS</Text>
        <Text style={styles.h1}>Approvals</Text>
        {approvals.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.muted}>{item.detail}</Text>
            <Text style={styles.amount}>{item.amount}</Text>
            <Text style={styles.muted}>{item.decision}</Text>
            {item.decision === 'Pending' ? (
              <View style={styles.row}>
                <Pressable accessibilityRole="button" style={styles.primary} onPress={() => decide(item.id, 'Approved')}>
                  <Text style={styles.primaryText}>Approve</Text>
                </Pressable>
                <Pressable accessibilityRole="button" style={styles.secondary} onPress={() => decide(item.id, 'Declined')}>
                  <Text style={styles.secondaryText}>Decline</Text>
                </Pressable>
              </View>
            ) : null}
          </View>
        ))}
        <Text style={styles.note}>An approval is a decision for the property manager to action. It does not transfer funds from this screen.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: 20, gap: 12 },
  kicker: { color: colors.green, fontWeight: '700', letterSpacing: 1.2, fontSize: 11 },
  h1: { color: colors.ink, fontSize: 28, fontWeight: '700' },
  card: { backgroundColor: '#fff', borderWidth: 1, borderColor: colors.line, borderRadius: 18, padding: 16, gap: 6 },
  title: { color: colors.ink, fontSize: 16, fontWeight: '700' },
  muted: { color: colors.muted, fontSize: 12, lineHeight: 18 },
  amount: { color: colors.ink, fontSize: 18, fontWeight: '700' },
  row: { flexDirection: 'row', gap: 8, marginTop: 6 },
  primary: { flex: 1, minHeight: 44, borderRadius: 12, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: '#fff', fontWeight: '700' },
  secondary: { flex: 1, minHeight: 44, borderRadius: 12, backgroundColor: '#f0f4f1', alignItems: 'center', justifyContent: 'center' },
  secondaryText: { color: colors.green, fontWeight: '700' },
  note: { color: colors.muted, fontSize: 12, lineHeight: 18 },
});
