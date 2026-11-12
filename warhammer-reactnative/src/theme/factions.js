export const GOLD = "#d4af37";

const FACTION_COLORS = {
  Necrons: "#39ff88",
  Orks: "#2ecc71",
  "Space Marines": "#4da3ff",
  "T'au Empire": "#ff4d4d",
  Tyranids: "#b56cff",
};

export function getFactionColor(faction) {
  return FACTION_COLORS[faction] ?? GOLD;
}
