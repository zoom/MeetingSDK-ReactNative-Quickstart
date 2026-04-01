const { withAndroidManifest } = require("@expo/config-plugins");
const { mkdirSync, writeFileSync } = require("fs");
const { join } = require("path");

const NETWORK_SECURITY_CONFIG = `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>
</network-security-config>`;

module.exports = function withZoomSdk(config) {
    return withAndroidManifest(config, (config) => {
        const app = config.modResults.manifest.application[0];
        config.modResults.manifest.$["xmlns:tools"] = "http://schemas.android.com/tools";
        app.$["tools:replace"] = "android:allowBackup,android:usesCleartextTraffic,android:networkSecurityConfig";
        app.$["android:usesCleartextTraffic"] = "true";
        app.$["android:networkSecurityConfig"] = "@xml/network_security_config";

        const xmlDir = join(config.modRequest.platformProjectRoot, "app/src/main/res/xml");
        mkdirSync(xmlDir, { recursive: true });
        writeFileSync(join(xmlDir, "network_security_config.xml"), NETWORK_SECURITY_CONFIG);

        return config;
    });
};
