import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.kondy.wydatkonator",
  appName: "Wydatkonator",
  webDir: "dist",
  server: process.env.CAP_LIVE_RELOAD
    ? { url: "http://10.0.2.2:5173", cleartext: true }
    : undefined,
};

export default config;
