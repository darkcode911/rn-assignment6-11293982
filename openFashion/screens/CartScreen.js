// screens/CartScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header.js';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      let cart = await AsyncStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      setCartItems(cart);
      calculateTotal(cart);
    };

    fetchCartItems();
  }, []);

  const calculateTotal = (cart) => {
    let total = cart.reduce((sum, item) => sum + parseFloat(item.price.substring(1)), 0);
    setTotal(total.toFixed(2));
  };

  const removeFromCart = async (id) => {
    let cart = await AsyncStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    cart = cart.filter(item => item.id !== id);
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
    setCartItems(cart);
    calculateTotal(cart);
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.header}>CHECKOUT</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>EST. TOTAL</Text>
          <Text style={styles.totalPrice}>${total}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  product: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
  },
  details: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#888',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    fontSize: 24,
    color: 'red',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E98D02',
  },
  checkoutButton: {
    backgroundColor: '#000',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;