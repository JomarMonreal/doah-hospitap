import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { baseStyles } from './index';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { AppointmentContext } from '@/providers/AppointmentsProvider';
import { useRouter } from 'expo-router';

const appointmentOptions = [
  'Health care for pregnant women',
  'BCG immunization for newborn babies',
  'Health care for patients',
  'Examination of various human specimens',
  'Conducting pre-marriage counseling',
  'Providing immunization',
  'Issuing sanitary permits',
  'Conducting mobile blood donation',
  'Newborn Screening (NBS) test',
];

const AddService = () => {
    const {appointment, setAppointment} = useContext(AppointmentContext)
    const router = useRouter();

    const addService = (service: string) => {
        setAppointment({...appointment, service: service})
        router.push('/create_appointment')
    }
    return (
        <LinearGradient
        colors={['#AED8F8','#6198AE']} 
        style={[baseStyles.background, styles.container]}
        >
        {/* Header Section with Logo and Heading */}
        <View style={styles.header}>
            <FontAwesome5 name="info-circle" size={24} color="#6198AE" />
            <Text style={styles.heading}>Create Appointment</Text>
        </View>
        
        {/* Subtitle */}
        <Text style={styles.subtitle}>These are the services that RHU offered</Text>
        
        {/* Appointment Options */}
        <FlatList
            data={appointmentOptions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
            <TouchableOpacity style={styles.optionContainer} onPress={()=>addService(item)}>
                <FontAwesome5 name="info-circle" size={24} color="#6198AE" />
                <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
            )}
            contentContainerStyle={styles.optionsList}
        />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: '#f7fbff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 20
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  optionsList: {
    paddingBottom: 20,
  },
  optionContainer: {
    backgroundColor: '#e0f7fa',
    padding: 15,
    borderRadius: 20,
    marginVertical: 5,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  optionText: {
    fontSize: 16,
    color: '#00796b',
    textAlign: 'center',
  },
});

export default AddService;
