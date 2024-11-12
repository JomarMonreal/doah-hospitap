import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserContext } from '@/providers/UserProvider';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import CustomBottomNav from '@/components/CustomBottomNav';
import { LinearGradient } from 'expo-linear-gradient';

const Profile = () => {
  const { user } = useContext(UserContext);

  // Helper function to format date as "January 1, 1981"
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
        {/* Icon with white circular background */}
        <View style={styles.iconContainer}>
          <FontAwesome5 name="user-circle" size={100} color="#6198AE" />
        </View>
        <View style={styles.infoBlock}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.info}>{user.name || 'N/A'}</Text>
        </View>
        <View style={styles.infoBlock}>
            <Text style={styles.label}>Birthday:</Text>
            <Text style={styles.info}>{user.bday ? formatDate(user.bday) : 'N/A'}</Text>
        </View>
        <View style={styles.infoBlock}>
            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.info}>{user.gender || 'N/A'}</Text>
        </View>
      </LinearGradient>
      <CustomBottomNav highlighted="profile" />
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 50,
    paddingTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  iconContainer: {
    width: 150,
    height: 150,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 20,
    color: '#333',
    marginBottom: 15,
  },
  infoBlock: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  }
});

export default Profile;
