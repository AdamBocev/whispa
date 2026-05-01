import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radius, spacing } from "@/components/theme";

const ITEMS = [
  {
    icon: "lock-closed-outline" as const,
    title: "End-to-End Encryption",
    text: "Notes are encrypted on-device. Keys never leave your phone.",
  },
  {
    icon: "cloud-offline-outline" as const,
    title: "Local-First Storage",
    text: "Audio and transcripts live on your device. Cloud sync is opt-in.",
  },
  {
    icon: "send-outline" as const,
    title: "HMAC-Signed Webhooks",
    text: "You control where your data flows. Wire to Notion, Drive, Obsidian.",
  },
  {
    icon: "eye-off-outline" as const,
    title: "Background Noise Filter",
    text: "Sensitive biometric data is shielded in real-time during capture.",
  },
];

export default function Privacy() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.title}>Privacy</Text>
        <Text style={styles.subtitle}>
          Your voice notes stay yours. Here's what we promise.
        </Text>

        <View style={styles.statusCard}>
          <Ionicons
            name="shield-checkmark"
            size={28}
            color={colors.successText}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.statusTitle}>All systems private</Text>
            <Text style={styles.statusText}>
              Encryption active • No third-party trackers
            </Text>
          </View>
        </View>

        {ITEMS.map((it) => (
          <View key={it.title} style={styles.card}>
            <View style={styles.iconBox}>
              <Ionicons name={it.icon} size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{it.title}</Text>
              <Text style={styles.cardText}>{it.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  body: { padding: spacing.lg, paddingBottom: spacing.xxl },
  title: { fontSize: 32, fontWeight: "800", color: colors.text },
  subtitle: {
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: spacing.lg,
  },
  statusCard: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    backgroundColor: colors.successSoft,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  statusTitle: { fontWeight: "700", color: colors.successText, fontSize: 15 },
  statusText: { color: colors.successText, fontSize: 12, marginTop: 2 },
  card: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: { fontWeight: "700", color: colors.text, fontSize: 15 },
  cardText: { color: colors.textMuted, fontSize: 13, marginTop: 4, lineHeight: 18 },
});
