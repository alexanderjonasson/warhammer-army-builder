import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import BackButton from "../components/BackButton";
import { getFactionColor } from "../theme/factions";

function getUnitImage(name) {
  switch (name) {
    case "Necron Warriors":
      return require("../../assets/images/units/necron-warriors.webp");
    case "Overlord":
      return require("../../assets/images/units/necron-overlord.webp");
    case "Boyz":
      return require("../../assets/images/units/ork-boyz.webp");
    case "Warboss":
      return require("../../assets/images/units/ork-warboss.webp");
    case "Captain in Terminator Armour":
      return require("../../assets/images/units/space-captain-terminator.webp");
    case "Intercessor Squad":
      return require("../../assets/images/units/space-intercessor.webp");
    case "Crisis Battlesuits":
      return require("../../assets/images/units/tau-crisis.webp");
    case "Fire Warriors":
      return require("../../assets/images/units/tau-fire-warriors.webp");
    case "Hive Tyrant":
      return require("../../assets/images/units/tyranids-hivetyrant.webp");
    case "Termagants":
      return require("../../assets/images/units/tyranids-termagants.webp");
    default:
      return null;
  }
}

function getFactionTheme(faction) {
  return { primary: getFactionColor(faction) };
}

export default function UnitDetailsScreen({ route, navigation }) {
  const { name, faction, role, points } = route.params;

  const image = getUnitImage(name);
  const theme = getFactionTheme(faction);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.contentBox}>
        <Text style={[styles.title, { color: theme.primary }]}>{name}</Text>

        <View style={styles.card}>
          <View style={styles.imageArea}>
            {image && <Image source={image} style={styles.image} />}
          </View>

          <View style={styles.info}>
            <Text style={styles.label}>Faction</Text>
            <Text style={styles.value}>{faction}</Text>

            <View style={styles.divider} />

            <Text style={styles.label}>Role</Text>
            <Text style={styles.value}>{role}</Text>

            <View style={styles.divider} />

            <Text style={styles.label}>Points</Text>
            <Text style={[styles.points, { color: theme.primary }]}>
              {points} pts
            </Text>
          </View>
        </View>

        <View style={styles.backWrapper}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0d10",
  },
  content: {
    paddingTop: 8,
    paddingBottom: 40,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  contentBox: {
    width: "100%",
    maxWidth: 420,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#2a2d31",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  imageArea: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  image: {
    width: 220,
    height: 220,
    resizeMode: "contain",
    backgroundColor: "transparent",
  },
  info: {
    padding: 20,
  },
  label: {
    color: "#9aa0a6",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  value: {
    color: "#e6e6e6",
    fontSize: 20,
    fontWeight: "600",
  },
  points: {
    fontSize: 22,
    fontWeight: "800",
  },
  divider: {
    height: 1,
    backgroundColor: "#3a3d42",
    marginVertical: 14,
  },
  backWrapper: {
    marginTop: 16,
    alignItems: "center",
  },
});
