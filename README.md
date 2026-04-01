# Zoom MeetingSDK React Native (Expo) Demo

Use of this sample app is subject to our [Terms of Use](https://explore.zoom.us/en/legal/zoom-api-license-and-tou/).

This is a sample application that demonstrates how to use the [Zoom Meeting SDK](https://developers.zoom.us/docs/meeting-sdk/react-native) in a React Native application using [Expo](https://expo.dev).

> Looking for the React Native CLI version? Check the [`main`](https://github.com/zoom/MeetingSDK-ReactNative-Quickstart/tree/main) branch.

## Prerequisites

- Node (LTS)
- NPM (other package managers can cause problems with the dependencies)
- [Zoom Meeting SDK credentials](https://developers.zoom.us/docs/meeting-sdk/get-credentials/)
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and Android SDK

## Getting Started

1. Clone the Repo and switch to the `expo` branch

```bash
git clone -b expo https://github.com/zoom/MeetingSDK-ReactNative-Quickstart.git
cd MeetingSDK-ReactNative-Quickstart
```

2. Install the dependencies

```bash
npm install
```

3. Add your Zoom Meeting SDK credentials

- Open `src/JWT.ts` and add your `ZOOM_MEETING_SDK_KEY` and `ZOOM_MEETING_SDK_SECRET` with your Zoom Meeting SDK credentials.

- Update the `config` object with your meeting number, user name, password and role.

> **Disclaimer**: It's not recommended to store your credentials in the source code. This is only for demonstration purposes for sake of simplicity. You should use a secure backend to generate the token and pass it to the client.

4. Run the app

```bash
npx expo run:ios
# or
npx expo run:android
```

## How to setup in a fresh Expo project

1. Create a new project

```bash
npx create-expo-app@latest zoom-meeting-sdk
cd zoom-meeting-sdk
```

2. Install the Zoom Meeting SDK and dependencies

```bash
npx expo install @zoom/meetingsdk-react-native react-native-pure-jwt expo-build-properties expo-dev-client
```

3. Configure `app.json` as in this repo.

5. Create the Expo config plugin

The Zoom Meeting SDK requires an Expo config plugin to resolve Android manifest merge conflicts. Create `plugins/withZoomSdk/app.plugin.js`:

```js
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
```

This plugin handles:
- **`android:allowBackup`** - Resolves merge conflict with the Zoom SDK manifest
- **`android:usesCleartextTraffic`** - Allows HTTP connections to the Metro dev server
- **`android:networkSecurityConfig`** - Overrides the Zoom SDK's restrictive network security config

6. Wrap your app in the `ZoomSDKProvider`

```tsx
function App() {
  return (
    <ZoomSDKProvider config={{
      jwtToken: token,
      domain: 'zoom.us',
      enableLog: true,
      logSize: 5,
    }}>
      <YourApp />
    </ZoomSDKProvider>
  );
}
```

7. Use the Zoom Meeting SDK

```tsx
function YourApp() {
  const zoom = useZoom();
  const handleJoin = async () => {
    await zoom.joinMeeting({
      meetingNumber: '123456789',
      userName: 'User',
      password: 'password',
    });
  };
  // ...
}
```

8. Run the app

```bash
npx expo run:ios
# or
npx expo run:android
```

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us) or our [Developer Forum](https://devforum.zoom.us). Priority support is also available with [Premier Developer Support](https://explore.zoom.us/docs/en-us/developer-support-plans.html) plans.
