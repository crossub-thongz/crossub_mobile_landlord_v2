import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/src/auth';
import { colors } from '@/src/theme';

export default function LoginScreen() {
  const { login, status } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed.');
    } finally {
      setSubmitting(false);
    }
  };

  if (status === 'authed') {
    return (
      <View style={styles.boot}>
        <ActivityIndicator color={colors.green} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.inner}>
        <Text style={styles.brand}>crossub</Text>
        <Text style={styles.kicker}>OWNER</Text>
        <Text style={styles.title}>Portfolio, approvals, statements.</Text>
        <Text style={styles.sub}>This is the owner account. Tenant and agent sign-in stay in their own apps.</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor="#8b9b90"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput secureTextEntry value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor="#8b9b90" style={styles.input} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Pressable accessibilityRole="button" onPress={onSubmit} style={styles.button}>
          {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign in</Text>}
        </Pressable>
        <Text style={styles.hint}>Use the same owner login as the CROSSUB owner website.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  boot: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg },
  inner: { flex: 1, justifyContent: 'center', padding: 24, gap: 10 },
  brand: { color: colors.green, fontSize: 28, fontWeight: '800' },
  kicker: { color: colors.muted, letterSpacing: 1.4, fontWeight: '700', fontSize: 11 },
  title: { color: colors.ink, fontSize: 28, fontWeight: '700', marginTop: 8 },
  sub: { color: colors.muted, lineHeight: 20 },
  input: { borderWidth: 1, borderColor: '#dfe8e0', borderRadius: 12, backgroundColor: '#fff', padding: 12, color: colors.ink },
  error: { color: '#9b3b3b' },
  button: { minHeight: 48, borderRadius: 12, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
  hint: { color: colors.muted, fontSize: 12, lineHeight: 18 },
});
