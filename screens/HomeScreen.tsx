import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import {BLEAdvertisingManager} from '../components/BLEAdvertisingManager';
import Navbar from '../components/Navbar';
import {useDiscountData} from '../hooks/useDiscountData';
import {colors, styles} from '../styles/styles';
import bulletPoints from '../utils/bulletPoints';
import {setupNotifications} from '../utils/notificationUtils';

type RootStackParamList = {
  Home: undefined;
  Discounts: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [statusMessage, setStatusMessage] = useState(
    'Start Discovering Offers Around',
  );
  const {error, disconnectWebSocket, connectWebSocket} = useDiscountData();

  useEffect(() => {
    setupNotifications();
  }, []);

  if (error) {
    return (
      <Text style={[styles.textMedium, styles.textBold, {color: colors.error}]}>
        Error: {error}
      </Text>
    );
  }

  return (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
        paddingVertical: 50,
        paddingHorizontal: 30,
      }}>
      <Navbar screen="Home" />
      <View style={[styles.container, styles.centerContent]}>
        <BLEAdvertisingManager
          statusMessage={statusMessage}
          setStatusMessage={setStatusMessage}
          connectWebSocket={connectWebSocket}
          disconnectWebSocket={disconnectWebSocket}
        />
      </View>
      <Text
        style={[styles.textRegular, {color: colors.black, marginBottom: 15}]}>
        Instructions:{' '}
      </Text>
      <FlatList
        style={{
          backgroundColor: colors.white,
          borderRadius: 10,
          padding: 20,
        }}
        data={bulletPoints}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Text
            style={[
              styles.textMedium,
              styles.textRegular,
              styles.marginBottom,
              {textAlign: 'left'},
            ]}>
            {item}
          </Text>
        )}
      />
      <Button
        title="Discounts"
        onPress={() => navigation.navigate('Discounts')}
      />
      {/* Commented Discount offer here*/}
      {/* <DiscountOfferDisplay discountOffer={discountOffer} /> */}
    </View>
  );
};

export default HomeScreen;
