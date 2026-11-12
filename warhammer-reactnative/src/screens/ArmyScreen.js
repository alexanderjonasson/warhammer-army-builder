import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  Pressable,
} from "react-native";
import { useArmy } from "../context/ArmyContext";
import BackButton from "../components/BackButton";
import { getFactionColor } from "../theme/factions";

const CARD_MAX_WIDTH = 520;
const GRID_GAP = 16;
const CONTENT_MAX_WIDTH = CARD_MAX_WIDTH * 2 + GRID_GAP;

export default function ArmyScreen({ navigation }) {
  const { armyUnits, removeUnit, totalPoints } = useArmy();

  const groupedUnits = Object.values(
    armyUnits.reduce((acc, unit) => {
      if (!acc[unit.id]) {
        acc[unit.id] = {
          ...unit,
          count: 1,
        };
      } else {
        acc[unit.id].count += 1;
      }
      return acc;
    }, {}),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Army Builder</Text>
      <Text style={styles.subtitle}>Manage your selected units</Text>

      <View style={styles.topBarWrapper}>
        <View style={styles.topBar}>
          <BackButton onPress={() => navigation.goBack()} />

          <View style={styles.summary}>
            <Text style={styles.summaryLabel}>ARMY SUMMARY</Text>
            <Text style={styles.summaryValue}>
              {armyUnits.length} Units • {totalPoints} pts
            </Text>
          </View>
        </View>
      </View>

      {groupedUnits.length === 0 ?
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No units added yet?</Text>
          <Text style={styles.emptySub}>
            Go back and add units from the home screen!
          </Text>
        </View>
      : <FlatList
          data={groupedUnits}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={Platform.OS === "web"}
          renderItem={({ item }) => {
            const factionColor = getFactionColor(item.faction);

            return (
              <View style={styles.unitCardWrapper}>
                <View
                  style={[styles.unitCard, { borderLeftColor: factionColor }]}>
                  <View style={styles.unitInfo}>
                    <Text style={styles.unitName}>
                      {item.name} x{item.count}
                    </Text>
                    <Text style={styles.unitMeta}>{item.faction}</Text>
                    <Text style={styles.unitMeta}>{item.role}</Text>
                    <Text style={[styles.unitPoints, { color: factionColor }]}>
                      {item.points * item.count} pts
                    </Text>
                  </View>

                  <View style={styles.buttonColumn}>
                    <Pressable
                      style={[
                        styles.actionButton,
                        { borderColor: factionColor },
                      ]}
                      onPress={() => removeUnit(item.id)}>
                      <Text
                        style={[
                          styles.actionButtonText,
                          { color: factionColor },
                        ]}>
                        Remove 1
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          }}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1012",
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    color: "#d4af37",
    textAlign: "center",
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    color: "#9e9788",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 14,
  },
  topBarWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  topBar: {
    width: "100%",
    maxWidth: CONTENT_MAX_WIDTH,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  summary: {
    flex: 1,
    backgroundColor: "#1a1b1f",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  summaryLabel: {
    color: "#9aa0a6",
    fontSize: 12,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  summaryValue: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  listContent: {
    paddingBottom: 24,
  },
  unitCardWrapper: {
    width: "100%",
    maxWidth: CONTENT_MAX_WIDTH,
    alignSelf: "center",
    marginBottom: 14,
  },
  unitCard: {
    backgroundColor: "#18191d",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderLeftWidth: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  unitInfo: {
    flex: 1,
  },
  unitName: {
    color: "#f3f0e8",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },
  unitMeta: {
    color: "#c1bbaf",
    fontSize: 14,
    marginBottom: 2,
  },
  unitPoints: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "800",
  },
  buttonColumn: {
    marginLeft: 16,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1.5,
    minWidth: 100,
    alignItems: "center",
  },
  actionButtonText: {
    fontWeight: "700",
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptySub: {
    color: "#9aa0a6",
    fontSize: 14,
    textAlign: "center",
    maxWidth: 260,
  },
});
