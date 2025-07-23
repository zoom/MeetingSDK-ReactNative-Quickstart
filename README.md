# Zoom MeetingSDK React Native Demo

Use of this sample app is subject to our [Terms of Use](https://explore.zoom.us/en/legal/zoom-api-license-and-tou/).

This is a sample application that demonstrates how to use the [Zoom Meeting SDK](https://developers.zoom.us/docs/meeting-sdk/react-native) in a React Native application bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Prerequisites

- [Environment setup](https://reactnative.dev/docs/environment-setup) for React Native
- Node (LTS)
- [Bun](https://bun.sh/) (or a package manager of your choice)
- [Zoom Meeting SDK credentials](https://developers.zoom.us/docs/meeting-sdk/get-credentials/)

## Getting Started

1. Clone the Repo

```bash
git clone https://github.com/zoom/MeetingSDK-ReactNative-Quickstart.git
```

2. Install the dependencies

```bash
bun install
```

3. Install cocoapods (iOS only)

```bash
bunx pod-install ## (or) cd ios && pod install
```

4. Add your Zoom Meeting SDK credentials

- Open `src/JWT.ts` and add your `ZOOM_MEETING_SDK_KEY` and `ZOOM_MEETING_SDK_SECRET` with your Zoom Meeting SDK credentials.

- Update the `config` object with your meeting number, user name, password and role.

> **Disclaimer**: It's not recommended to store your credentials in the source code. This is only for demonstration purposes for sake of simplicity. You should use a secure backend to generate the token and pass it to the client.

5. Run the app

```bash
bun run ios
# or
bun run android
```
> Note: The app doesn't support hot reloading on Android.

## How to setup in a fresh project

1. Create a new project, we recommend using React Native CLI to simplify the setup

```bash
bunx react-native@latest init zoom-meeting-sdk
```

2. Install the Zoom Meeting SDK

```bash
bun i @zoom/meetingsdk-react-native
```
- For Android: add `implementation 'us.zoom.meetingsdk:zoomsdk:6.4.10'` to the `dependencies` in `android/app/build.gradle` file. Use the version number matching the npm packge.
- For iOS run: `npx pod-install` to install the pods

3. Add permissions for the camera and microphone

- For iOS: add `NSCameraUsageDescription` and `NSMicrophoneUsageDescription` to your `Info.plist` file.
```xml
    <key>NSCameraUsageDescription</key>
	<string>For people to see you during meetings, we need access to your camera.</string>
	<key>NSMicrophoneUsageDescription</key>
	<string>For people to hear you during meetings, we need access to your microphone.</string>
```

- For Android: add the necessary permissions to your `android/app/src/main/AndroidManifest.xml` file. Example:
```xml
    <uses-permission android:name="android.permission.INTERNET" />
    <!-- "Connect to the network" will need the following Permissions -->
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <!-- In Meeting "Audio With VOIP/Share Screen Audio" will need the following Permissions -->
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <!-- "Preview/In Meeting Video/VirtualBackground/Share Camera" will need the following Permissions -->
    <uses-permission android:name="android.permission.CAMERA" />
    <!-- "Keep the CPU on in meeting when screen off" will need the following Permissions -->
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    ...
```

You can read the [docs](https://developers.zoom.us/docs/meeting-sdk/react-native/integrate/) for more details on the permissions.

4. Android only configuration

- Make sure you're using at least `minSdkVersion = 26` & `targetSdkVersion = 35` in your `android/build.gradle` file.

- The Meeting SDK doesn't support cleartext traffic for security reasons. Edit the `android/app/src/debug/AndroidManifest.xml` file to disable it:
```diff
    <application
        android:usesCleartextTraffic="true"
+        tools:replace="android:usesCleartextTraffic"
        ...
```

5. Wrap your app in the `ZoomSDKProvider`

```tsx
function App() {
  ...
  return (
    <ZoomSDKProvider config={{....}}>
      <YourApp>
    </ZoomSDKProvider>
  );
```

6. Use the Zoom Meeting SDK

```tsx
function YourApp() {
  const zoom = useZoom();
  const handleJoin = async () => {
     await zoom.joinMeeting({....});
  }
  ...
```

7. Run the app

```bash
# Android
bun run react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
bun run android
# iOS
bun run ios
```

## Need help?

If you're looking for help, try [Developer Support](https://devsupport.zoom.us) or our [Developer Forum](https://devforum.zoom.us). Priority support is also available with [Premier Developer Support](https://explore.zoom.us/docs/en-us/developer-support-plans.html) plans.
