import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Pressable,
  useWindowDimensions,
} from "react-native";
import axios from "axios";
import { useArmy } from "../context/ArmyContext";
import { API_URL } from "../config";
import { GOLD, getFactionColor } from "../theme/factions";

const CARD_MAX_WIDTH = 520;
const GRID_GAP = 16;
const CONTENT_MAX_WIDTH = CARD_MAX_WIDTH * 2 + GRID_GAP;

export default function HomeScreen({ navigation }) {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { armyUnits, addUnit, removeUnit, totalPoints } = useArmy();
  const { width } = useWindowDimensions();
  const numColumns = width > 900 ? 2 : 1;

  const loadUnits = useCallback(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`${API_URL}/api/units`, { timeout: 60000 })
      .then((res) => setUnits(res.data))
      .catch(() => setError("Could not load units. Is the API running?"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadUnits();
  }, [loadUnits]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={GOLD} />
        <Text style={styles.loadingText}>Loading units...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.builderButton} onPress={loadUnits}>
          <Text style={styles.builderButtonText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Warhammer 40K Units</Text>
      <Text style={styles.subtitle}>Browse and inspect units</Text>

      <View style={styles.summaryWrapper}>
        <View style={styles.summary}>
          <View>
            <Text style={styles.summaryLabel}>Current Army And Points</Text>
            <Text style={styles.summaryValue}>
              {armyUnits.length} Units • {totalPoints} pts
            </Text>
          </View>

          <Pressable
            style={styles.builderButton}
            onPress={() => navigation.navigate("Army")}>
            <Text style={styles.builderButtonText}>Go to Army Builder</Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={units}
        key={numColumns}
        numColumns={numColumns}
        keyExtractor={(item) => item._id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
        showsVerticalScrollIndicator={Platform.OS === "web"}
        renderItem={({ item }) => {
          const factionColor = getFactionColor(item.faction);

          return (
            <View
              style={[
                styles.cardWrapper,
                numColumns > 1 && styles.cardWrapperWide,
              ]}>
              <View style={[styles.card, { borderLeftColor: factionColor }]}>
                <Pressable
                  onPress={() =>
                    navigation.navigate("UnitDetails", {
                      id: item._id,
                      name: item.name,
                      faction: item.faction,
                      role: item.role,
                      points: String(item.points),
                    })
                  }
                  style={({ pressed }) => [
                    styles.cardInfo,
                    pressed && styles.cardPressed,
                  ]}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.meta}>{item.faction}</Text>
                  <Text style={styles.meta}>{item.role}</Text>
                  <Text style={[styles.points, { color: factionColor }]}>
                    {item.points} pts
                  </Text>
                </Pressable>

                <View style={styles.buttonRow}>
                  <Pressable
                    style={[styles.actionButton, { borderColor: factionColor }]}
                    onPress={() =>
                      addUnit({
                        id: item._id,
                        name: item.name,
                        faction: item.faction,
                        role: item.role,
                        points: Number(item.points),
                      })
                    }>
                    <Text
                      style={[
                        styles.actionButtonText,
                        { color: factionColor },
                      ]}>
                      Add to Army
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[styles.actionButton, styles.removeButton]}
                    onPress={() => removeUnit(item._id)}>
                    <Text
                      style={[
                        styles.actionButtonText,
                        styles.removeButtonText,
                      ]}>
                      Remove
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          );
        }}
      />
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
    fontSize: 30,
    color: "#d4af37",
    textAlign: "center",
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    color: "#9e9788",
    textAlign: "center",
    marginBottom: 24,
    fontSize: 14,
  },
  summaryWrapper: {
    alignItems: "center",
    marginBottom: 16,
  },
  summary: {
    width: "100%",
    maxWidth: CONTENT_MAX_WIDTH,
    backgroundColor: "#1a1b1f",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    borderLeftWidth: 4,
    borderLeftColor: "#d4af37",
  },
  summaryLabel: {
    color: "#888",
    fontSize: 12,
    marginBottom: 4,
  },
  summaryValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  builderButton: {
    backgroundColor: "#d4af37",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  builderButtonText: {
    color: "#000",
    fontWeight: "700",
  },
  // The list spans the full width so it scrolls wherever the pointer is;
  // only its content is limited in width and centred.
  list: {
    flex: 1,
    width: "100%",
  },
  listContent: {
    width: "100%",
    maxWidth: CONTENT_MAX_WIDTH,
    alignSelf: "center",
    paddingTop: 4,
    paddingBottom: 30,
  },
  row: {
    justifyContent: "space-between",
  },
  cardWrapper: {
    marginBottom: 16,
  },
  cardWrapperWide: {
    flex: 1,
    maxWidth: CARD_MAX_WIDTH,
  },
  card: {
    minHeight: 210,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 18,
    justifyContent: "space-between",
    backgroundColor: "#1a1b1f",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 4,
  },
  cardInfo: {
    alignItems: "center",
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.97 }],
  },
  name: {
    color: "#f3f0e8",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  meta: {
    color: "#c1bbaf",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 2,
  },
  points: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "800",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 16,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1.5,
    minWidth: 110,
    alignItems: "center",
  },
  actionButtonText: {
    fontWeight: "700",
    fontSize: 14,
  },
  removeButton: {
    borderColor: "#7d8794",
    backgroundColor: "#252931",
  },
  removeButtonText: {
    color: "#d7dde5",
  },
  center: {
    flex: 1,
    backgroundColor: "#0f1012",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#e6e6e6",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  loadingText: {
    marginTop: 12,
    color: "#d4af37",
    fontSize: 15,
  },
});
