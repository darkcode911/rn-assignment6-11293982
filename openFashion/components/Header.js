// components/Header.js
import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const menuIcon = require('../assets/Menu.png');
const cartIcon = require('../assets/shoppingBag.png');
const searchIcon = require('../assets/Search.png');
const logoImage = require('../assets/Logo.png'); 

const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Image source={menuIcon} style={styles.icon} />
      </TouchableOpacity>
      <Image source={logoImage} style={styles.logo} /> 
      <View style={styles.rightIcons}>
        <TouchableOpacity>
          <Image source={searchIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Image source={cartIcon} style={styles.icon} />
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100, // Adjust the width to fit your logo
    height: 40, // Adjust the height to fit your logo
    resizeMode: 'contain',
  },
  rightIcons: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
});

export default Header;