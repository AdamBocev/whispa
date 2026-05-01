import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radius, spacing } from "@/components/theme";

const BAR_COUNT = 13;

function formatTime(ms: number) {
  const totalCs = Math.floor(ms / 10);
  const cs = totalCs % 100;
  const totalSec = Math.floor(totalCs / 100);
  const s = totalSec % 60;
  const m = Math.floor(totalSec / 60);
  return {
    main: `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
    cs: String(cs).padStart(2, "0"),
  };
}

export default function Record() {
  const [running, setRunning] = useState(true);
  const [ms, setMs] = useState(252820);
  const [tick, setTick] = useState(0);
  const startRef = useRef(Date.now() - ms);

  useEffect(() => {
    if (!running) return;
    startRef.current = Date.now() - ms;
    const id = setInterval(() => {
      setMs(Date.now() - startRef.current);
      setTick((t) => t + 1);
    }, 80);
    return () => clearInterval(id);
  }, [running]);

  const t = formatTime(ms);

  const bars = Array.from({ length: BAR_COUNT }, (_, i) => {
    const phase = (tick + i * 2) % 20;
    const center = (BAR_COUNT - 1) / 2;
    const baseDist = 1 - Math.abs(i - center) / center;
    const wobble = running ? 0.5 + 0.5 * Math.sin(phase / 3 + i) : 0.4;
    const h = 28 + baseDist * 80 * wobble;
    const dim = i % 4 === 0 || i === 1 || i === BAR_COUNT - 2;
    return { h, dim };
  });

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text style={styles.headerTitle}>Active Session</Text>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Recording Live</Text>
          </View>
        </View>
        <View style={styles.userRow}>
          <Text style={styles.userName}>Alex Rivers</Text>
          <Text style={styles.userPlan}>Pro Plan</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.label}>ELAPSED TIME</Text>
        <View style={styles.timer}>
          <Text style={styles.timerMain}>{t.main}</Text>
          <Text style={styles.timerCs}>.{t.cs}</Text>
        </View>

        <View style={styles.waveform}>
          {bars.map((b, i) => (
            <View
              key={i}
              style={[
                styles.bar,
                {
                  height: b.h,
                  backgroundColor: b.dim ? "#cdd5cf" : colors.primary,
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.controls}>
          <View style={styles.sideBtn}>
            <Pressable style={styles.iconBtnSquare}>
              <Ionicons name="albums-outline" size={20} color={colors.text} />
            </Pressable>
            <Text style={styles.sideLabel}>MULTI-TAKE</Text>
          </View>

          <Pressable
            onPress={() => setRunning((r) => !r)}
            style={styles.recordBtn}
          >
            <Ionicons
              name={running ? "pause" : "play"}
              size={32}
              color="#fff"
            />
          </Pressable>

          <View style={styles.sideBtn}>
            <Pressable style={[styles.iconBtnSquare, styles.iconBtnDark]}>
              <Ionicons name="checkmark" size={22} color="#fff" />
            </Pressable>
            <Text style={styles.sideLabel}>FINISH</Text>
          </View>
        </View>

        <View style={styles.privacyCard}>
          <View style={styles.sparkleBox}>
            <Ionicons name="sparkles" size={16} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.privacyTitle}>Privacy Intelligence Active</Text>
            <Text style={styles.privacyText}>
              Currently filtering background noise and shielding sensitive
              biometric data in real-time.
            </Text>
          </View>
        </View>

        <View style={styles.takesCard}>
          <View style={styles.takesHeader}>
            <Text style={styles.takesTitle}>RECORDED TAKES</Text>
            <View style={styles.takesPill}>
              <Text style={styles.takesPillText}>3 SESSIONS</Text>
            </View>
          </View>
          <Take icon="time-outline" name="Take 01" meta="01:45 • Intro" />
          <Take icon="pulse-outline" name="Take 02" meta="02:10 • Main Thesis" />
        </View>
      </View>
    </SafeAreaView>
  );
}

function Take({
  icon,
  name,
  meta,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  name: string;
  meta: string;
}) {
  return (
    <View style={styles.takeRow}>
      <View style={styles.takeIcon}>
        <Ionicons name={icon} size={16} color={colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.takeName}>{name}</Text>
        <Text style={styles.takeMeta}>{meta}</Text>
      </View>
      <Ionicons
        name="ellipsis-vertical"
        size={16}
        color={colors.textMuted}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: colors.text },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.successSoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.successText,
  },
  liveText: {
    color: colors.successText,
    fontSize: 11,
    fontWeight: "600",
  },
  userRow: { alignItems: "flex-end" },
  userName: { fontWeight: "700", color: colors.text },
  userPlan: { fontSize: 11, color: colors.textMuted },
  body: { flex: 1, alignItems: "center", paddingTop: spacing.xl },
  label: {
    color: colors.textMuted,
    letterSpacing: 1.5,
    fontSize: 11,
    fontWeight: "600",
  },
  timer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 6,
  },
  timerMain: {
    fontSize: 64,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -2,
  },
  timerCs: {
    fontSize: 40,
    fontWeight: "800",
    color: colors.primary,
    letterSpacing: -1,
  },
  waveform: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 120,
    marginVertical: spacing.xl,
  },
  bar: {
    width: 8,
    borderRadius: 4,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    marginVertical: spacing.lg,
  },
  sideBtn: { alignItems: "center", gap: 6 },
  iconBtnSquare: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBtnDark: { backgroundColor: "#0b0f0d", borderColor: "#0b0f0d" },
  sideLabel: {
    fontSize: 10,
    letterSpacing: 1.2,
    color: colors.textMuted,
    fontWeight: "600",
  },
  recordBtn: {
    width: 88,
    height: 88,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  privacyCard: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    alignSelf: "stretch",
  },
  sparkleBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  privacyTitle: { fontWeight: "700", color: colors.text, marginBottom: 2 },
  privacyText: { color: colors.text, fontSize: 12.5, lineHeight: 18 },
  takesCard: {
    alignSelf: "stretch",
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  takesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  takesTitle: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    color: colors.textMuted,
  },
  takesPill: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  takesPillText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.primary,
    letterSpacing: 1,
  },
  takeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: spacing.sm,
  },
  takeIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  takeName: { fontWeight: "700", color: colors.text, fontSize: 13 },
  takeMeta: { color: colors.textMuted, fontSize: 12 },
});
