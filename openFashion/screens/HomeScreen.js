// screens/HomeScreen.js
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';

const gridIcon = require('../assets/Listview.png');
const filterIcon = require('../assets/Filter.png');

const products = [
  { id: '1', name: 'Office Wear', description: 'reversible angora cardigan', price: '$120', image: require('../assets/dress1.png') },
  { id: '2', name: 'Black', description: 'reversible angora cardigan', price: '$120', image: require('../assets/dress2.png') },
  { id: '3', name: 'Church Wear', description: 'reversible angora cardigan', price: '$120', image: require('../assets/dress3.png') },
  { id: '4', name: 'Lamerei', description: 'reversible angora cardigan', price: '$120', image: require('../assets/dress4.png') },
  { id: '5', name: '21WN', description: 'reversible angora cardigan', price: '$120', image: require('../assets/dress5.png') },
  { id: '6', name: 'Lopo', description: 'reversible angora cardigan', price: '$120', image: require('../assets/dress6.png') },
  { id: '7', name: 'LopoReverse', description: 'reversible angora cardigan', price: '$120', image: require('../assets/dress7.png') },
  { id: '8', name: 'Lame', description: 'reversible angora cardigan', price: '$120', image: require('../assets/dress3.png') },
];

const addCircleImage = require('../assets/add_circle.png');

const HomeScreen = ({ navigation }) => {
  const addToCart = async (product) => {
    let cart = await AsyncStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    cart.push(product);
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
  };

  return (
    <ScrollView style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.headerContainer}>
        <Text style={styles.ourStoryTitle}>Our Story</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity>
            <Image source={gridIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={filterIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
            <TouchableOpacity onPress={() => addToCart(item)} style={styles.addButton}>
              <Image source={addCircleImage} style={styles.addButtonImage} />
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  ourStoryTitle: {
    fontSize: 24,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 16,
  },
  product: {
    flex: 1,
    margin: 8,
    padding: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 8,
  },
  details: {
    marginBottom: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#888',
  },
  price: {
    fontSize: 20,
    fontFamily: 'cursive',
    fontWeight: 'bold',
    color: '#E98D02',
    marginVertical: 8,
  },
  addButton: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    width: 20,
    height: 270,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonImage: {
    width: 30,
    height: 30,
  },
});

export default HomeScreen;