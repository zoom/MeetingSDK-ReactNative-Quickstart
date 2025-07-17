import { useZoom, ZoomSDKProvider } from '@zoom/meetingsdk-react-native';
import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet } from 'react-native';
import { generateJwt, config } from './JWT';

function App(): React.JSX.Element {
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  if (!jwtToken) {
    return (
      <SafeAreaView style={styles.container}>
        <Button onPress={async () => {
          const token = await generateJwt();
          console.log('jwtToken', token);
          setJwtToken(token);
        }} title="Generate JWT" />
      </SafeAreaView>
    );
  }

  return (
    <ZoomSDKProvider config={{
      jwtToken: jwtToken,
      domain: 'zoom.us',
      enableLog: true,
      logSize: 5,
    }}>
      <SafeAreaView style={styles.container}>
        <MSDK />
      </SafeAreaView>
    </ZoomSDKProvider>
  );
}

function MSDK() {
  const zoom = useZoom();

  const joinMeeting = async () => {
    try {
      console.log('Joining meeting');
      await zoom.joinMeeting({
        meetingNumber: config.meetingNumber,
        userName: config.userName,
        password: config.password,
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  return <Button onPress={joinMeeting} title="Join Meeting" />;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default App;
