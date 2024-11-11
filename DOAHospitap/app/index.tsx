import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Button, Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <LinearGradient
      colors={['#99cff8', '#f7fbff', '#99cff8']} // gradient colors
      style={styles.background}
    >
      <Image source={require('../assets/images/logo.png')} style={styles.image} />
      <Link href="/login" style={styles.button}>
        Log In
      </Link>
      <Link href="/signup" style={styles.button}>
        Sign Up
      </Link>
    </LinearGradient>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  button: {
    padding: 10,
    backgroundColor: '#6198ae',
    color: 'white'
  }
});
