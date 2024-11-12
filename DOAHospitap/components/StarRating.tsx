import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <View style={[styles.container, { gap: 10 }]}>
        <View style={styles.container}>
            {[...Array(5)].map((_, i) => (
                <FontAwesome
                key={i}
                name={i < rating ? 'star' : 'star-o'}
                size={20}
                color="#FFD700"
                />
            ))}
        </View>
        <Text>{rating}.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default StarRating;
