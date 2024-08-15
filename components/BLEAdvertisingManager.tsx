import React from 'react';
import {Switch, Text, View} from 'react-native';
import {colors, styles} from '../styles/styles';
import {useAdvertising} from '../utils/bleUtils';

interface BLEAdvertisingManagerProps {
  statusMessage: string;
  setStatusMessage: (message: string) => void;
  connectWebSocket: () => void;
  disconnectWebSocket: () => void;
}

export const BLEAdvertisingManager: React.FC<BLEAdvertisingManagerProps> = ({
  statusMessage,
  setStatusMessage,
  connectWebSocket,
  disconnectWebSocket,
}) => {
  const {isAdvertising, startAdvertising, stopAdvertising} = useAdvertising();

  const toggleSwitch = async () => {
    if (!isAdvertising) {
      try {
        await startAdvertising();
        setStatusMessage('Start Roaming Around the Store.');
        connectWebSocket();
      } catch (error) {
        console.error('Error starting advertising:', error);
        setStatusMessage(`Error: ${error}`);
      }
    } else {
      disconnectWebSocket();
      try {
        await stopAdvertising();
        setStatusMessage('Start Discovering Offers Around.');
      } catch (error) {
        console.error('Error stopping advertising:', error);
        setStatusMessage(`Error: ${error}`);
      }
    }
  };

  return (
    <View style={{maxWidth: 300}}>
      <View style={[styles.centerContent, styles.paddingHorizontal]}>
        <Switch
          trackColor={{false: colors.primary, true: colors.secondary}}
          thumbColor={'white'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          style={{
            transform: [{scaleX: 3}, {scaleY: 3}],
            marginBottom: 50,
          }}
          value={isAdvertising}
        />
        <Text
          style={[
            styles.textMedium,
            styles.textBold,
            {
              color: colors.black,
              textAlign: 'center',
              maxWidth: 240,
              marginBottom: 60,
            },
          ]}>
          {statusMessage}
        </Text>
      </View>
    </View>
  );
};
