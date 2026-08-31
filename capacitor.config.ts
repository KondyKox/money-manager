import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.kondy.wydatkonator",
  appName: "wydatkonator",
  webDir: "dist",
  server: {
    url: "http://10.0.2.2:5173",
    cleartext: true,
  },
};

export default config;
