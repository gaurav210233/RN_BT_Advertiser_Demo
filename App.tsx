import React, {useState, useCallback} from 'react';
import {View, Text, Button, Platform, PermissionsAndroid} from 'react-native';
import BLEAdvertiser from 'react-native-ble-advertiser';

const App: React.FC = () => {
  const [isAdvertising, setIsAdvertising] = useState<boolean>(false);
  const [currentUUID, setCurrentUUID] = useState<string>('');

  const requestPermissions = useCallback(async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 31) {
        // Android 12 and above
        const results = await Promise.all([
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
          ),
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          ),
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          ),
        ]);
        return results.every(
          result => result === PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    }
    return true;
  }, []);

  const startAdvertising = useCallback(async (): Promise<void> => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      console.log('Permission denied');
      return;
    }

    // UUID for our hypothetical contact tracing service
    const UUID = 'C19CE516-0000-1000-8000-00805F9B34FB';
    setCurrentUUID(UUID);
    // Manufacturer data
    const MANUFACTURER_DATA: number[] = [
      0x02, // Protocol version (version 2)
      0xc1,
      0x9a, // Short identifier for our app (16-bit)
      0x3f, // Transmit power level (63 in decimal, used for distance estimation)
      0x12,
      0x34,
      0x56,
      0x78, // First part of rotating identifier (changes periodically)
      0x9a,
      0xbc,
      0xde,
      0xf0, // Second part of rotating identifier
    ];

    BLEAdvertiser.setCompanyId(0x00e0); // Googles's company ID as an example

    try {
      await BLEAdvertiser.broadcast(UUID, MANUFACTURER_DATA, {});
      setIsAdvertising(true);
      console.log('Broadcasting started successfully,', 'UUID:', UUID);
      console.log();
    } catch (error) {
      console.log('Broadcasting error', error);
    }
  }, [requestPermissions]);

  const stopAdvertising = useCallback(async (): Promise<void> => {
    try {
      await BLEAdvertiser.stopBroadcast();
      setIsAdvertising(false);
      console.log('Broadcasting stopped successfully');
    } catch (error) {
      console.log('Stop broadcasting error', error);
    }
  }, []);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>BLE Advertiser Demo </Text>
      <Button
        title={isAdvertising ? 'Stop Advertising' : 'Start Advertising'}
        onPress={isAdvertising ? stopAdvertising : startAdvertising}
      />
      {currentUUID !== '' && (
        // eslint-disable-next-line react-native/no-inline-styles
        <Text style={{marginTop: 20}}>
          <Text>UUID: </Text>
          <Text>{currentUUID}</Text>
        </Text>
      )}
    </View>
  );
};

export default App;
