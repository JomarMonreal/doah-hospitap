import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomBottomNav from '@/components/CustomBottomNav';
import { TelemedicineContext } from '@/providers/TelemediineProvider';
import { useRouter } from 'expo-router';

const TelemedicinesPage = () => {
  const navigation = useRouter();
  const { telemedicineList } = useContext(TelemedicineContext);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()]; // Get month name
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <>
      <LinearGradient colors={['#AED8F8', '#6198AE']} style={styles.background}>
        {/* Header Section with Heading */}
        <View style={styles.header}>
          <MaterialCommunityIcons name="pill" size={40} color="#6198AE" />
          <Text style={styles.heading}>Telemedicine</Text>
        </View>

        {/* Telemedicine List */}
        <FlatList
          data={telemedicineList}
          keyExtractor={(item, index) => index.toString()} // Use index for now
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.medicineText}>{item.medicine}</Text>
              <Text style={styles.detailsText}>
                Every {item.hours} hrs / ends in {formatDate(item.duration)} 
              </Text>
            </View>
          )}
          contentContainerStyle={styles.listContainer}
        />
        
        {/* Plus Button to Navigate to Add Telemedicine */}
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => navigation.navigate('/add_telemedicine')}
        >
          <MaterialCommunityIcons name="plus" size={30} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      <CustomBottomNav highlighted="clock" />
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#e0f7fa',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  medicineText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
  },
  detailsText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  plusButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#00796b',
    borderRadius: 50,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default TelemedicinesPage;
