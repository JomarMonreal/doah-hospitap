import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomBottomNav from '@/components/CustomBottomNav';
import { AppointmentContext } from '@/providers/AppointmentsProvider';

const ViewAppointment = () => {
  const { appointment } = useContext(AppointmentContext);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <>
      <LinearGradient colors={['#AED8F8', '#6198AE']} style={styles.background}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="calendar" size={40} color="#6198AE" />
          <Text style={styles.heading}>Appointment Details</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{formatDate(appointment.date)}</Text>

          <Text style={styles.label}>Service:</Text>
          <Text style={styles.value}>{appointment.service || 'N/A'}</Text>

          <Text style={styles.label}>Message:</Text>
          <Text style={styles.value}>{appointment.message || 'No message provided'}</Text>

          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{appointment.isDone ? 'Completed' : 'Pending'}</Text>

          <Text style={styles.label}>Prescription:</Text>
          <Text style={styles.value}>
            {appointment.prescription.length > 0 
              ? appointment.prescription.join(', ')
              : 'No prescription'}
          </Text>
        </View>
      </LinearGradient>
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
  card: {
    backgroundColor: '#e0f7fa',
    padding: 20,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796b',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
});

export default ViewAppointment;
