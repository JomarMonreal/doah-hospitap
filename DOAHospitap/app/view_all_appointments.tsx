import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { AppointmentContext } from '@/providers/AppointmentsProvider';
import CustomBottomNav from '@/components/CustomBottomNav';
import { useRouter } from 'expo-router';

const ViewAllAppointments = () => {
  const { appointmentList, setAppointment } = useContext(AppointmentContext);
  const navigation = useRouter()

  // Format the date to "MM/DD/YYYY" and time to "HH:MM AM/PM"
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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <LinearGradient colors={['#AED8F8', '#6198AE']} style={styles.background}>
        {/* Header Section with Logo and Heading */}
        <View style={styles.header}>
          <FontAwesome5 name="calendar-alt" size={40} color="#6198AE" />
          <Text style={styles.heading}>Appointments</Text>
        </View>

        {/* Appointment List */}
        <FlatList
          data={appointmentList.filter(appointment => !appointment.isDone)}
          keyExtractor={(item) => item.userId + item.date} // Use unique key for each item
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {navigation.navigate("/view_appointment"); setAppointment(item)}}>
              <View style={styles.card}>
                <Text style={styles.dateText}>{formatDate(item.date)}</Text>
                <Text style={styles.serviceText}>
                  ({formatTime(item.date)}) - {item.service}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContainer}
        />
      </LinearGradient>
      <CustomBottomNav highlighted='appointments'/>
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
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b',
  },
  serviceText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
});

export default ViewAllAppointments;
