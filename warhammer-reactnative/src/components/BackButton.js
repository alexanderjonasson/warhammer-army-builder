import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export default function BackButton({ onPress }) {
  return (
    <Pressable style={styles.backButton} onPress={onPress}>
      <Text style={styles.backText}>← Back</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#1a1b1f",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    color: "#d4af37",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
