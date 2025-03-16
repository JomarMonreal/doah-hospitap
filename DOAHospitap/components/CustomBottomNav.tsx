import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

const CustomBottomNav = ({ highlighted = "home" }: { highlighted: string }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.navigate('/home')} style={{ backgroundColor: highlighted !== "home"? "#6198AE" : "white", ...styles.button }}>
        <FontAwesome name="home" size={24} color={ highlighted === "home"? "#6198AE" : "white" } />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.navigate('/telemedicine')} style={{ backgroundColor: highlighted !== "clock"? "#6198AE" : "white", ...styles.button }}>
        <Feather name="clock" size={24} color={ highlighted === "clock"? "#6198AE" : "white" } />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.navigate('/view_all_appointments')} style={{ backgroundColor: highlighted !== "appointments"? "#6198AE" : "white", ...styles.button }}>
        <Ionicons name="calendar-outline" size={24} color={ highlighted === "appointments"? "#6198AE" : "white" } />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.navigate('/view_results')} style={{ backgroundColor: highlighted !== "results"? "#6198AE" : "white", ...styles.button }}>
        <MaterialCommunityIcons name="file-document-outline" size={24} color={ highlighted === "results"? "#6198AE" : "white" } />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.navigate('/profile')} style={{ backgroundColor: highlighted !== "profile"? "#6198AE" : "white", ...styles.button }}>
        <Ionicons name="person" size={24} color={ highlighted === "profile"? "#6198AE" : "white" } />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.navigate('/telekonsulta')} style={{ backgroundColor: highlighted !== "message"? "#6198AE" : "white", ...styles.button }}>
        <MaterialCommunityIcons name="message" size={24} color={ highlighted === "message"? "#6198AE" : "white" } />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#6198AE',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 10
  }
});

export default CustomBottomNav;
