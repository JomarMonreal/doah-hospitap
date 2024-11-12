import StarRating from '@/components/StarRating';
import { UserContext } from '@/providers/UserProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, ImageBackground, Linking, TouchableOpacity } from 'react-native';
import { baseStyles } from './index';
import CustomBottomNav from '@/components/CustomBottomNav';

export default function Home() {

  const { user } = useContext(UserContext);

  const handlePress = async () => {
    const url = 'https://maps.app.goo.gl/6TsLhxwZp19gQWns5';
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "Unable to open the link");
    }
  };

  return (
    <>
      <ImageBackground
        source={require('../assets/images/hospital.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <Text style={styles.subtitle2}>RURAL HEALTH UNIT</Text>
        <Text style={styles.subtitle}>GUBAT, SORSOGON</Text>
        <Text style={styles.title}>Hello, {user.name}</Text>
        <Text style={styles.subtitle}>Welcome to DOAH Hospitap</Text>
        <Text style={styles.timeText}>8:00 am - 5:00 pm</Text>
        <TouchableOpacity onPress={handlePress}>
          <Image source={require('../assets/images/GubatBurger.png')} style={styles.image} />
        </TouchableOpacity>
        <StarRating rating={4}/>

        <Link href="/add_service" style={baseStyles.button}>
          BOOK AN APPOINTMENT
        </Link>
      </ImageBackground>
      <CustomBottomNav highlighted={'home'} />
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
    padding: 30,
    paddingTop: 70
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white'
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  subtitle2: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white'
  },
  timeText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    alignSelf: 'stretch',
  },
});
