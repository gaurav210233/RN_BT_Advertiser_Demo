import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {styles} from '../styles/styles';
import Navbar from '../components/Navbar';
import {useDiscountData} from '../hooks/useDiscountData';
import DiscountCard from '../components/DiscountCard';
import no_notifications from '../assets/icons/No_Notifications.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoNotifications = () => (
  <View style={[styles.centerContent, {marginTop: 100}]}>
    <View style={[styles.centerContent, {marginBottom: 20}]}>
      <Image source={no_notifications}></Image>
    </View>
    <Text
      style={[
        styles.textLarge,
        {color: '#F0BC02'},
        styles.textBold,
        {maxWidth: 400, marginBottom: 20},
      ]}>
      No New Notifications
    </Text>
    <Text style={[styles.textSmall, {textAlign: 'center', maxWidth: 400}]}>
      Your Notifications will appear once you’ve received them.
    </Text>
  </View>
);

export const DiscountScreen = () => {
  const {discountOffers} = useDiscountData();
  const [cachedOffers, setCachedOffers] = useState<string[]>([]);

  useEffect(() => {
    // Load discount offers from cache when the component mounts
    const loadDiscountOffers = async () => {
      try {
        const cachedOffers = await AsyncStorage.getItem('discountOffers');
        if (cachedOffers) {
          setCachedOffers(JSON.parse(cachedOffers));
        }
      } catch (error) {
        console.error('Error loading discount offers from cache:', error);
      }
    };

    loadDiscountOffers();
  }, []);

  const offersToDisplay =
    discountOffers.length > 0 ? discountOffers : cachedOffers;

  return (
    <ScrollView
      style={[styles.container, {paddingVertical: 50, paddingHorizontal: 30}]}>
      <Navbar screen="Discounts" />
      <Text
        style={[styles.textMedium, styles.textRegular, styles.marginBottom]}>
        Previously
      </Text>
      {offersToDisplay.length === 0 ? (
        <NoNotifications />
      ) : (
        offersToDisplay.map((discount_offer, index) => (
          <DiscountCard key={index} discount_offer={discount_offer} />
        ))
      )}
    </ScrollView>
  );
};
