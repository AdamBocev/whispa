import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radius, spacing } from "@/components/theme";

type Note = {
  id: string;
  title: string;
  date: string;
  time: string;
  preview: string;
  duration: string;
  words: string;
  status: "synced" | "draft";
};

const NOTES: Note[] = [
  {
    id: "1",
    title: "Project Launch Strategy",
    date: "Oct 24, 2023",
    time: "12:45 PM",
    preview:
      "We discussed the initial rollout for the Q4 campaign. Key focus areas include privacy-first messaging and leveraging the new waveform API. The team agreed on a tiered release starting with beta users in...",
    duration: "4:32",
    words: "842 words",
    status: "synced",
  },
  {
    id: "2",
    title: "Grocery List & Meal Plan",
    date: "Oct 22, 2023",
    time: "09:15 AM",
    preview:
      "Pick up spinach, almond milk, and salmon for dinner. Don't forget the sourdough from the bakery on the corner. Need to check if we have enough olive oil left...",
    duration: "1:15",
    words: "120 words",
    status: "draft",
  },
  {
    id: "3",
    title: "Morning Meditation Journal",
    date: "Oct 21, 2023",
    time: "07:00 AM",
    preview:
      "Feeling very grounded today. The quiet morning air really helps with focus. Thinking about the connection between creativity and routine. How can I protect this space more effectively?",
    duration: "8:45",
    words: "1,240 words",
    status: "synced",
  },
];

export default function Library() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.logoBox}>
            <Ionicons name="mic" size={18} color="#fff" />
          </View>
          <View>
            <Text style={styles.brand}>Echo</Text>
            <Text style={styles.brandSub}>PRIVACY-FIRST AUDIO</Text>
          </View>
        </View>
        <Pressable style={styles.iconBtn}>
          <Ionicons
            name="person-circle-outline"
            size={28}
            color={colors.text}
          />
        </Pressable>
      </View>

      <View style={styles.searchWrap}>
        <Ionicons
          name="search"
          size={16}
          color={colors.textMuted}
          style={{ marginRight: 8 }}
        />
        <TextInput
          placeholder="Search your transcriptions..."
          placeholderTextColor={colors.textMuted}
          style={styles.search}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Library</Text>
            <Text style={styles.subtitle}>
              Manage and revisit your privacy-encrypted audio memories.
            </Text>
          </View>
          <View style={styles.viewToggle}>
            <Pressable style={[styles.toggleBtn, styles.toggleBtnActive]}>
              <Ionicons name="grid-outline" size={16} color={colors.text} />
            </Pressable>
            <Pressable style={styles.toggleBtn}>
              <Ionicons name="list-outline" size={16} color={colors.textMuted} />
            </Pressable>
          </View>
        </View>

        {NOTES.map((n) => (
          <View key={n.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.playBtn}>
                <Ionicons name="play" size={16} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{n.title}</Text>
                <Text style={styles.cardMeta}>
                  {n.date}  •  {n.time}
                </Text>
              </View>
              <View
                style={[
                  styles.badge,
                  n.status === "synced"
                    ? styles.badgeSynced
                    : styles.badgeDraft,
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    n.status === "synced"
                      ? { color: colors.successText }
                      : { color: colors.draftText },
                  ]}
                >
                  {n.status.toUpperCase()}
                </Text>
              </View>
            </View>
            <Text style={styles.preview} numberOfLines={2}>
              {n.preview}
            </Text>
            <View style={styles.cardFooter}>
              <View style={styles.metaItem}>
                <Ionicons
                  name="time-outline"
                  size={14}
                  color={colors.textMuted}
                />
                <Text style={styles.metaText}>{n.duration}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons
                  name="document-text-outline"
                  size={14}
                  color={colors.textMuted}
                />
                <Text style={styles.metaText}>{n.words}</Text>
              </View>
              <View style={{ flex: 1 }} />
              <Text style={styles.openLink}>Open Transcription</Text>
            </View>
          </View>
        ))}
        <View style={{ height: 96 }} />
      </ScrollView>

      <Link href="/(tabs)/record" asChild>
        <Pressable style={styles.fab}>
          <Ionicons name="mic" size={22} color="#fff" />
        </Pressable>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  logoBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  brand: { fontSize: 20, fontWeight: "700", color: colors.primary },
  brandSub: {
    fontSize: 9,
    letterSpacing: 1.2,
    color: colors.textMuted,
    fontWeight: "600",
  },
  iconBtn: { padding: 4 },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    paddingHorizontal: 14,
    height: 40,
    borderWidth: 1,
    borderColor: colors.border,
  },
  search: { flex: 1, color: colors.text, fontSize: 14 },
  list: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.lg,
  },
  title: { fontSize: 32, fontWeight: "800", color: colors.text },
  subtitle: { color: colors.textMuted, marginTop: 4, fontSize: 13 },
  viewToggle: { flexDirection: "row", gap: 6 },
  toggleBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.card,
  },
  toggleBtnActive: { backgroundColor: colors.primarySoft },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: spacing.sm,
  },
  playBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: { fontSize: 16, fontWeight: "700", color: colors.text },
  cardMeta: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeSynced: { backgroundColor: colors.successSoft },
  badgeDraft: { backgroundColor: colors.draft },
  badgeText: { fontSize: 10, fontWeight: "700", letterSpacing: 0.5 },
  preview: { color: colors.text, lineHeight: 20, fontSize: 13.5 },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: spacing.md,
  },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { color: colors.textMuted, fontSize: 12 },
  openLink: { color: colors.primary, fontWeight: "700", fontSize: 12 },
  fab: {
    position: "absolute",
    right: spacing.lg,
    bottom: spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
});
