import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const ExpeditionList = ({ route, navigation }) => {
  const { trips } = route.params;
  const [selectedTrip, setSelectedTrip] = useState(null);

  const renderItem = ({ item }) => {
    const departureTime = item.departureDate.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

    const handleSelectTrip = (selectedTrip) => {
      setSelectedTrip(selectedTrip);
      navigation.navigate('ExpeditionDetails', { selectedTrip }); // Seçilen seferi ExpeditionDetails sayfasına iletiyoruz
    };

    return (
      <TouchableOpacity
        style={[
          styles.expeditionContainer,
          selectedTrip === item ? styles.selectedExpeditionContainer : null,
        ]}
        onPress={() => setSelectedTrip(item)}
      >
        <View style={styles.expeditionDetails}>
          <Text style={styles.routeText}>{`${item.departureCity} - ${item.destinationCity}`}</Text>
          <Text style={styles.firmName}>{item.firmName}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.departureTime}>Saat: {departureTime}</Text>
            <Text style={styles.availableSeats}>Boş Koltuk: {item.availableSeats}</Text>
            <Text style={styles.price}>Fiyat: {item.price} TL</Text>
          </View>
          {selectedTrip === item && (
            <TouchableOpacity style={styles.selectButton} onPress={() => handleSelectTrip(item)}>
              <Text style={styles.selectButtonText}>Seç</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={trips}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1eff0',
    padding: 20,
  },
  expeditionContainer: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedExpeditionContainer: {
    borderColor: '#3CB371',
  },
  expeditionDetails: {
    flexDirection: 'column',
  },
  routeText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  firmName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  departureTime: {
    color: '#555',
    fontSize: 14,
  },
  availableSeats: {
    color: '#555',
    fontSize: 14,
  },
  price: {
    color: '#3CB371',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'right',
  },
  selectButton: {
    backgroundColor: '#3CB371',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 15,
    alignSelf: 'flex-end',
  },
  selectButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ExpeditionList;
