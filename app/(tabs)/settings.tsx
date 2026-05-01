import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, radius, spacing } from "@/components/theme";

export default function Settings() {
  const [faceId, setFaceId] = useState(true);
  const [cellular, setCellular] = useState(false);
  const [hook, setHook] = useState("");

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.crumbs}>
          <Text style={styles.crumbBold}>Settings</Text>
          <Text style={styles.crumbSep}>/</Text>
          <Text style={styles.crumb}>Preferences & Security</Text>
        </View>

        <SectionHeader icon="shield-outline" label="Security & Access" />
        <View style={styles.card}>
          <Row
            iconBg="#cfe5d4"
            icon="happy-outline"
            iconColor={colors.successText}
            title="Face ID Lock"
            text="Require biometric authentication to open Echo."
            right={
              <Switch
                value={faceId}
                onValueChange={setFaceId}
                trackColor={{ false: "#ddd", true: colors.primary }}
                thumbColor="#fff"
              />
            }
          />
          <Divider />
          <Row
            iconBg={colors.warnSoft}
            icon="key-outline"
            iconColor={colors.warnText}
            title="Encryption Keys"
            text="Manage your private end-to-end encryption passphrase."
            right={
              <Pressable style={styles.btn}>
                <Text style={styles.btnText}>Manage</Text>
              </Pressable>
            }
          />
        </View>

        <SectionHeader icon="extension-puzzle-outline" label="Workflow & Connections" />
        <View style={styles.card}>
          <View style={styles.iconBoxLg}>
            <Ionicons name="calendar-outline" size={20} color={colors.successText} />
          </View>
          <Text style={styles.cardTitle}>Calendar Sync</Text>
          <Text style={styles.cardText}>
            Automatically link voice notes to your Google or Outlook calendar
            events based on timing.
          </Text>
          <View style={styles.btnRow}>
            <Pressable style={styles.outlineBtn}>
              <Text style={styles.outlineBtnText}>Google</Text>
            </Pressable>
            <Pressable style={styles.outlineBtn}>
              <Text style={styles.outlineBtnText}>Outlook</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.card}>
          <View style={[styles.iconBoxLg, { backgroundColor: colors.draft }]}>
            <Ionicons name="git-network-outline" size={20} color={colors.text} />
          </View>
          <Text style={styles.cardTitle}>Webhook Export</Text>
          <Text style={styles.cardText}>
            Push finalized transcriptions to custom endpoints, Zapier, or
            Make.com instantly.
          </Text>
          <View style={styles.hookRow}>
            <TextInput
              value={hook}
              onChangeText={setHook}
              placeholder="https://api.yourdomain.com/hook"
              placeholderTextColor={colors.textMuted}
              style={styles.hookInput}
            />
            <Pressable style={styles.setBtn}>
              <Text style={styles.setBtnText}>SET</Text>
            </Pressable>
          </View>
        </View>

        <SectionHeader icon="cloud-outline" label="Cloud & Sync" />
        <View style={styles.card}>
          <View style={styles.rowSpace}>
            <Text style={styles.cardTitle}>iCloud Synchronization</Text>
            <View style={styles.activePill}>
              <Ionicons
                name="checkmark-circle"
                size={12}
                color={colors.successText}
              />
              <Text style={styles.activePillText}>ACTIVE</Text>
            </View>
          </View>
          <Text style={styles.cardText}>
            Keep your library synced across iPhone, iPad, and Mac.
          </Text>
          <View style={styles.usageRow}>
            <Ionicons name="server-outline" size={16} color={colors.text} />
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
            <Text style={styles.usageText}>8.4 GB of 12 GB used</Text>
          </View>
          <Pressable style={styles.upgradeLink}>
            <Text style={styles.upgradeLinkText}>Upgrade Plan</Text>
          </Pressable>
          <Divider />
          <View style={styles.rowSpace}>
            <Text style={styles.cardTitle}>Backup on Cellular Data</Text>
            <Switch
              value={cellular}
              onValueChange={setCellular}
              trackColor={{ false: "#ddd", true: colors.primary }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={styles.toast}>
          <View style={styles.toastDot} />
          <Text style={styles.toastText}>Cloud Securely Synced</Text>
          <Ionicons name="close" size={14} color="#fff" />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Echo v2.4.1 — All data is local-first & encrypted
          </Text>
          <View style={styles.footerLinks}>
            <Text style={styles.footerLink}>Privacy Policy</Text>
            <Text style={styles.footerLink}>Terms of Service</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionHeader({
  icon,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Ionicons name={icon} size={16} color={colors.text} />
      <Text style={styles.sectionTitle}>{label}</Text>
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

function Row({
  icon,
  iconBg,
  iconColor,
  title,
  text,
  right,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  iconColor: string;
  title: string;
  text: string;
  right: React.ReactNode;
}) {
  return (
    <View style={styles.row}>
      <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardText}>{text}</Text>
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  body: { padding: spacing.lg, paddingBottom: spacing.xxl },
  crumbs: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  crumbBold: { fontSize: 22, fontWeight: "800", color: colors.text },
  crumbSep: { fontSize: 18, color: colors.textMuted },
  crumb: { color: colors.textMuted, fontSize: 14 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  sectionTitle: { fontWeight: "700", fontSize: 16, color: colors.text },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBoxLg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.successSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  cardTitle: { fontWeight: "700", color: colors.text, fontSize: 15 },
  cardText: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  btn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
  },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 12 },
  btnRow: { flexDirection: "row", gap: 10, marginTop: spacing.md },
  outlineBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    backgroundColor: colors.card,
  },
  outlineBtnText: { color: colors.text, fontWeight: "600", fontSize: 13 },
  hookRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.md,
    backgroundColor: colors.bg,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    paddingLeft: 12,
    paddingRight: 4,
  },
  hookInput: {
    flex: 1,
    height: 40,
    color: colors.text,
    fontSize: 13,
  },
  setBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
  },
  setBtnText: { color: "#fff", fontWeight: "700", fontSize: 11, letterSpacing: 1 },
  rowSpace: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.successSoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  activePillText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.successText,
    letterSpacing: 1,
  },
  usageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: spacing.md,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    overflow: "hidden",
  },
  progressFill: {
    width: "70%",
    height: "100%",
    backgroundColor: colors.primary,
  },
  usageText: { color: colors.textMuted, fontSize: 11 },
  upgradeLink: { alignSelf: "flex-end", marginTop: spacing.sm },
  upgradeLinkText: { color: colors.primary, fontWeight: "700", fontSize: 13 },
  toast: {
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.text,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginTop: spacing.md,
  },
  toastDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#5fdc97",
  },
  toastText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  footer: { marginTop: spacing.xl, alignItems: "center", gap: 8 },
  footerText: { color: colors.textMuted, fontSize: 11 },
  footerLinks: { flexDirection: "row", gap: 16 },
  footerLink: { color: colors.textMuted, fontSize: 11 },
});
