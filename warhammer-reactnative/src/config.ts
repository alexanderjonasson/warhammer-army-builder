// API base URL. Set EXPO_PUBLIC_API_URL in warhammer-reactnative/.env
// (see .env.example). Falls back to a locally running API.
export const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:5000";
