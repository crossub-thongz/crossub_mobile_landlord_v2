import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { usePortfolio } from '@/src/portfolio';
import { colors } from '@/src/theme';

function tint(color: unknown) {
  return typeof color === 'string' ? color : colors.muted;
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const pending = usePortfolio().approvals.filter((item) => item.status === 'PENDING').length;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#e3e9e4',
          height: 52 + Math.max(insets.bottom, 10),
          paddingBottom: Math.max(insets.bottom, 10),
          paddingTop: 6,
        },
        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: '#98a49a',
        sceneStyle: { backgroundColor: colors.bg },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'home' : 'home-outline'} color={tint(color)} size={20} /> }} />
      <Tabs.Screen
        name="approvals"
        options={{
          title: 'Approvals',
          tabBarBadge: pending || undefined,
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'checkmark-circle' : 'checkmark-circle-outline'} color={tint(color)} size={20} />,
        }}
      />
      <Tabs.Screen name="statements" options={{ title: 'Statements', tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'document-text' : 'document-text-outline'} color={tint(color)} size={20} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'person' : 'person-outline'} color={tint(color)} size={20} /> }} />
    </Tabs>
  );
}
