import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {borderRadius, colors, spacing, styles} from '../styles/styles';

interface DiscountCardProps {
  discount_offer: string;
}
const DiscountCard: React.FC<DiscountCardProps> = ({
  discount_offer = 'No discount available',
}) => {
  return (
    <View>
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.primary,
            padding: 0,
            overflow: 'hidden',
            marginBottom: 10,
          },
        ]}>
        <View style={styles.row}>
          <Image
            source={{uri: 'https://example.com/image.jpg'}}
            style={{
              width: 100,
              height: '100%',
              marginRight: spacing.md,
            }}
          />
          <View
            style={{
              flex: 1,
              padding: spacing.md,
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                styles.textRegular,
                styles.textBold,
                {color: colors.white, marginBottom: spacing.md},
              ]}>
              {discount_offer}
            </Text>
            <TouchableOpacity
              style={[
                {
                  alignSelf: 'stretch',
                  backgroundColor: colors.secondary,
                  paddingVertical: spacing.sm,
                  borderRadius: borderRadius.round,
                },
              ]}>
              <Text
                style={[
                  styles.buttonText,
                  styles.textRegular,
                  {color: colors.black},
                ]}>
                GET NOW
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DiscountCard;
