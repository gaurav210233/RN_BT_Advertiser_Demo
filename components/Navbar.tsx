import React from 'react';
import {Image, Text, View, ImageSourcePropType} from 'react-native';
import {colors, styles} from '../styles/styles';

const profile: ImageSourcePropType = require('../assets/icons/profile.png');
const search: ImageSourcePropType = require('../assets/icons/search.png');

interface NavbarProps {
  screen: string;
}

const Navbar: React.FC<NavbarProps> = ({screen}) => {
  return (
    <View
      style={[
        styles.container,
        {
          maxHeight: 70,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 50,
        },
      ]}>
      <Image style={{width: 30, height: 30}} source={profile} />
      <Text style={[styles.textMedium, styles.textBold, {color: colors.black}]}>
        {screen}
      </Text>
      <Image style={{width: 30, height: 30}} source={search} />
    </View>
  );
};

export default Navbar;
