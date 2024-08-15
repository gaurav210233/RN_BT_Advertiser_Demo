// permissions.ts
import {Platform, PermissionsAndroid} from 'react-native';

export const requestPermissions = async (): Promise<boolean> => {
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
};

export const requestNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: 'Notification Permission',
        message: 'This app needs access to send you notifications.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Notification permission denied');
    }
  }
};
