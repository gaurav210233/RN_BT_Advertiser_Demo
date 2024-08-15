import React, {useState} from 'react';
import {Switch, Text, View} from 'react-native';
import {colors, styles} from '../styles/styles';
import {startAdvertising, stopAdvertising} from '../utils/bleUtils';

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
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = async () => {
    const newState = !isEnabled;
    setIsEnabled(newState);

    if (newState) {
      try {
        await startAdvertising();
        setStatusMessage('Start Roaming Around the Store.');
      } catch (error) {
        console.error('Error starting advertising:', error);
        setStatusMessage(`Error: ${error}`);
        setIsEnabled(false);
      }
      connectWebSocket();
    } else {
      disconnectWebSocket();
      try {
        await stopAdvertising();
        setStatusMessage('Start Discovering Offers Around.');
      } catch (error) {
        console.error('Error stopping advertising:', error);
        setStatusMessage(`Error: ${error}`);
        setIsEnabled(true);
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
          value={isEnabled}
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
