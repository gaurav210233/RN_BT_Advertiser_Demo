import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';
import {requestNotificationPermission} from './permissionUtils';

export const setupNotifications = () => {
  PushNotification.configure({
    onNotification: function (notification) {
      console.log('Notification:', notification);
    },
    requestPermissions: Platform.OS === 'ios',
  });

  PushNotification.createChannel(
    {
      channelId: 'discount-alerts',
      channelName: 'Default Alerts',
      channelDescription: 'A channel for sending discount alert notifications.',
    },
    created => console.log(`CreateChannel returned '${created}'`),
  );

  requestNotificationPermission();
};

export const triggerNotification = (message: string) => {
  PushNotification.localNotification({
    channelId: 'discount-alerts',
    title: '🎉 Savings Alert!',
    message: message,
    playSound: true,
    soundName: 'default',
    importance: 'high',
    priority: 'high',
    vibrate: true,
  });
};
