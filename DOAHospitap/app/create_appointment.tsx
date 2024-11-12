import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { AppointmentContext } from '@/providers/AppointmentsProvider';

const CreateAppointment = () => {
  const { appointment, setAppointment, appointmentList, setAppointmentList } = useContext(AppointmentContext);
  const router = useRouter();
  const [date, setDate] = useState<Date>(new Date());
  const [message, setMessage] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleSaveAppointment = () => {
    const newAppointment = {
        ...appointment,
        isDone: false,
        date: date.toISOString(), // Save date in UTC format
        message: message.trim(),
      };
    setAppointment(newAppointment);
    setAppointmentList([...appointmentList, newAppointment])

    router.navigate('/view_all_appointments');
  };

  return (
    <LinearGradient colors={['#AED8F8', '#6198AE']} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.heading}>Create Appointment</Text>

        {/* Date Picker */}
        <Text style={styles.label}>Select Date:</Text>
        <Button title="Choose Date" onPress={() => setShowDatePicker(true)} color="#6198AE" />
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        <Text style={styles.dateText}>Selected Date: {date.toUTCString()}</Text>

        {/* Optional Message Input */}
        <Text style={styles.label}>Message (Optional):</Text>
        <TextInput
          style={styles.input}
          placeholder="Add an optional message"
          value={message}
          onChangeText={setMessage}
        />

        {/* Save Button */}
        <Button title="Save Appointment" onPress={handleSaveAppointment} color="#6198AE" />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingTop: 100,
  },
  container: {
    backgroundColor: '#f7fbff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#00796b',
    marginVertical: 10,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});

export default CreateAppointment;
