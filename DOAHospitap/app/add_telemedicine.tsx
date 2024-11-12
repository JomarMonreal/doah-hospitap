import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TelemedicineContext } from '@/providers/TelemediineProvider';
import { useRouter } from 'expo-router';

const AddTelemedicinePage = () => {
  const navigation = useRouter();
  const { telemedicineList, setTelemedicineList } = useContext(TelemedicineContext);

  // State for form inputs
  const [medicine, setMedicine] = useState('');
  const [hours, setHours] = useState('');
  const [duration, setDuration] = useState<Date>(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  // Handle form submission
  const handleSubmit = () => {
    if (!medicine || !hours || !duration) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newTelemedicine = {
      medicine,
      hours: parseInt(hours),
      duration: duration.toISOString(), // Save in UTC format
    };

    // Add the new telemedicine entry to the list
    setTelemedicineList([...telemedicineList, newTelemedicine]);

    // Navigate back to the Telemedicines page after adding
    navigation.back();
  };

  // Handle date selection
  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || duration;
    setShowDateTimePicker(Platform.OS === 'ios');
    setDuration(currentDate);
  };


  return (
    <LinearGradient colors={['#AED8F8', '#6198AE']} style={styles.background}>
      {/* Header Section */}
      <View style={styles.header}>
        <MaterialCommunityIcons name="pill" size={40} color="#6198AE" />
        <Text style={styles.heading}>Add Telemedicine</Text>
      </View>

      {/* Form Section */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Medicine</Text>
        <TextInput
          style={styles.input}
          value={medicine}
          onChangeText={setMedicine}
          placeholder="Enter medicine"
        />

        <Text style={styles.label}>Hours</Text>
        <TextInput
          style={styles.input}
          value={hours}
          onChangeText={setHours}
          keyboardType="numeric"
          placeholder="Enter hours"
        />

        <Text style={styles.label}>Duration</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDateTimePicker(true)}
        >
          <Text style={styles.inputText}>
            {duration ? duration.toLocaleString() : 'Select Duration'}
          </Text>
        </TouchableOpacity>

        {/* DateTime Picker */}
        {showDateTimePicker && (
          <DateTimePicker
            value={duration}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Add Telemedicine</Text>
        </TouchableOpacity>
      </View>

    </LinearGradient>
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
  formContainer: {
    marginTop: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#00796b',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddTelemedicinePage;
