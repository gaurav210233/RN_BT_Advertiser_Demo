import React from 'react';
import {Text, View} from 'react-native';
import {styles} from '../styles/styles';

interface DiscountOfferDisplayProps {
  discountOffer: {discount_offer: string} | null;
}

export const DiscountOfferDisplay: React.FC<DiscountOfferDisplayProps> = ({
  discountOffer,
}) => {
  return (
    <View style={[styles.centerContent]}>
      {discountOffer ? (
        <Text style={[styles.textRegular, styles.marginBottom]}>
          {discountOffer.discount_offer}
        </Text>
      ) : (
        <>
          <Text style={[styles.textRegular, styles.marginBottom]}>
            Discount Offer
          </Text>
          <Text style={styles.textRegular}>No discount offer available</Text>
        </>
      )}
    </View>
  );
};
