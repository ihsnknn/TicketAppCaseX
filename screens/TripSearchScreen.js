import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TripSearchScreen = ({ navigation }) => {
  const [departureCity, setDepartureCity] = useState('İstanbul');
  const [destinationCity, setDestinationCity] = useState('Ankara');
  const [tripType, setTripType] = useState('roundTrip');
  const [showDepartureDatePicker, setShowDepartureDatePicker] = useState(false);
  const [departureDate, setDepartureDate] = useState(new Date(2023, 8, 5));
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);
  const [returnDate, setReturnDate] = useState(new Date(2023, 8, 8));

  const cities = ['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa'];

  const trips = [
    {
      firmName: 'Firma A',
      departureCity: 'İstanbul',
      destinationCity: 'Ankara',
      departureDate: new Date(2023, 8, 5),
      returnDate: new Date(2023, 8, 8),
      price: 150,
      availableSeats: 10,
    },
    {
      firmName: 'Firma B',
      departureCity: 'İstanbul',
      destinationCity: 'Ankara',
      departureDate: new Date(2023, 8, 5),
      returnDate: new Date(2023, 8, 8),
      price: 180,
      availableSeats: 8,
    },
    {
      firmName: 'Firma C',
      departureCity: 'İstanbul',
      destinationCity: 'Ankara',
      departureDate: new Date(2023, 8, 5),
      returnDate: new Date(2023, 8, 8),
      price: 200,
      availableSeats: 8,
    },
    {
      firmName: 'Firma D',
      departureCity: 'İstanbul',
      destinationCity: 'Ankara',
      departureDate: new Date(2023, 8, 5),
      returnDate: new Date(2023, 8, 8),
      price: 170,
      availableSeats: 12,
    },
    {
      firmName: 'Firma E',
      departureCity: 'İstanbul',
      destinationCity: 'Ankara',
      departureDate: new Date(2023, 8, 5),
      returnDate: new Date(2023, 8, 8),
      price: 190,
      availableSeats: 8,
    },
    {
      firmName: 'Firma F',
      departureCity: 'İzmir',
      destinationCity: 'Antalya',
      departureDate: new Date(2023, 8, 7),
      returnDate: new Date(2023, 8, 12),
      price: 220,
      availableSeats: 15,
    },
    {
      firmName: 'Firma G',
      departureCity: 'İzmir',
      destinationCity: 'Antalya',
      departureDate: new Date(2023, 8, 7),
      returnDate: new Date(2023, 8, 12),
      price: 200,
      availableSeats: 8,
    },
    {
      firmName: 'Firma H',
      departureCity: 'İzmir',
      destinationCity: 'Antalya',
      departureDate: new Date(2023, 8, 7),
      returnDate: new Date(2023, 8, 12),
      price: 250,
      availableSeats: 10,
    },
    {
      firmName: 'Firma I',
      departureCity: 'İzmir',
      destinationCity: 'Antalya',
      departureDate: new Date(2023, 8, 7),
      returnDate: new Date(2023, 8, 12),
      price: 180,
      availableSeats: 8,
    },
    {
      firmName: 'Firma J',
      departureCity: 'İzmir',
      destinationCity: 'Antalya',
      departureDate: new Date(2023, 8, 7),
      returnDate: new Date(2023, 8, 12),
      price: 230,
      availableSeats: 12,
    },
    {
      firmName: 'Firma K',
      departureCity: 'İzmir',
      destinationCity: 'Antalya',
      departureDate: new Date(2023, 8, 7),
      returnDate: new Date(2023, 8, 12),
      price: 210,
      availableSeats: 8,
    },
    
  ];

  const currentDate = new Date();

  const handleSearch = () => {
    if (!departureCity || !destinationCity) {
      Alert.alert('Uyarı', 'Lütfen nereden ve nereye şehirlerini seçin.');
      return;
    }

    const selectedDepartureDate = new Date(departureDate);
    const selectedReturnDate = new Date(returnDate);

    if (selectedDepartureDate < currentDate || selectedReturnDate < currentDate) {
      Alert.alert('Uyarı', 'Geçmiş tarihleri seçemezsiniz.');
      return;
    }
    
    const foundTrips = trips.filter(trip =>
      trip.departureCity === departureCity && trip.destinationCity === destinationCity &&
      trip.departureDate <= selectedDepartureDate && trip.returnDate >= selectedReturnDate
    );

    if (foundTrips.length > 0) {
      navigation.navigate('ExpeditionList', { trips: foundTrips });
    } else {
      const cityTripExists = trips.some(trip =>
        trip.departureCity === departureCity && trip.destinationCity === destinationCity
      );

      if (!cityTripExists) {
        Alert.alert('Uyarı', 'Seçilen şehirler arasında sefer bulunamadı.');
      } else {
        Alert.alert('Uyarı', 'Seçilen tarih aralığında belirtilen rota için sefer bulunamadı.');
      }
    }
  };

  const handleDepartureDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setShowDepartureDatePicker(false);
      setDepartureDate(selectedDate);
    } else {
      setShowDepartureDatePicker(false);
    }
  };

  const handleReturnDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setShowReturnDatePicker(false);
      setReturnDate(selectedDate);
    } else {
      setShowReturnDatePicker(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.tripTypeView}>
          <Text style={styles.tripTypeLabel}><Text style={styles.boldLabel}>Yolculuk Türü:</Text></Text>
          <View style={styles.tripTypeButtons}>
            <TouchableOpacity
              style={[
                styles.tripTypeButton,
                tripType === 'oneWay' && styles.selectedTripTypeButton,
              ]}
              onPress={() => setTripType('oneWay')}>
              <Text style={styles.tripTypeButtonText}>Gidiş</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tripTypeButton,
                tripType === 'roundTrip' && styles.selectedTripTypeButton,
              ]}
              onPress={() => setTripType('roundTrip')}>
              <Text style={styles.tripTypeButtonText}>Gidiş-Dönüş</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}><Text style={styles.boldLabel}>Nereden:</Text></Text>
          <Picker
            style={styles.picker}
            selectedValue={departureCity}
            onValueChange={(itemValue) => setDepartureCity(itemValue)}>
            <Picker.Item label="Şehir Seçin" value="" />
            {cities.map((city, index) => (
              <Picker.Item key={index} label={city} value={city} />
            ))}
          </Picker>
        </View>
        <View style={[styles.inputContainer, { justifyContent: 'flex-start', marginLeft: 0 }]}>
          <Picker
            style={styles.picker}
            selectedValue={destinationCity}
            onValueChange={(itemValue) => setDestinationCity(itemValue)}>
            <Picker.Item label="Şehir Seçin" value="" />
            {cities.map((city, index) => (
              <Picker.Item key={index} label={city} value={city} />
            ))}
          </Picker>
          <Text style={styles.inputLabelRight}><Text style={styles.boldLabel}>Nereye:</Text></Text>
        </View>
        <View style={styles.dateContainer}>
          <TouchableOpacity
            style={[styles.datePickerButton, styles.leftDatePickerButton]}
            onPress={() => setShowDepartureDatePicker(true)}>
            <Text style={styles.datePickerButtonText}><Text style={styles.boldLabel}>Gidiş Tarihi:</Text> {departureDate.toLocaleDateString('tr-TR')}</Text>
          </TouchableOpacity>
          {showDepartureDatePicker && (
            <DateTimePicker
              value={departureDate}
              mode="date"
              display="default"
              onChange={handleDepartureDateChange}
            />
          )}
          {tripType === 'roundTrip' && (
            <>
              <TouchableOpacity
                style={[styles.datePickerButton, styles.rightDatePickerButton]}
                onPress={() => setShowReturnDatePicker(true)}>
                <Text style={styles.datePickerButtonText}><Text style={styles.boldLabel}>Dönüş Tarihi:</Text> {returnDate.toLocaleDateString('tr-TR')}</Text>
              </TouchableOpacity>
              {showReturnDatePicker && (
                <DateTimePicker
                  value={returnDate}
                  mode="date"
                  display="default"
                  onChange={handleReturnDateChange}
                />
              )}
            </>
          )}
        </View>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>Ara</Text>
              <FontAwesome name="search" size={16} color="white" style={styles.searchIcon} />
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#e1eff0',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    marginTop: '35%',
  },
  tripTypeView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  tripTypeLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  tripTypeButtons: {
    flexDirection: 'row',
  },
  tripTypeButton: {
    backgroundColor: '#465881',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
  },
  selectedTripTypeButton: {
    backgroundColor: '#3CB371',
  },
  tripTypeButtonText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '70%',
  },
  inputLabel: {
    marginRight: 5,
    color: '#333',
  },
  inputLabelRight: {
    marginLeft: 5,
    color: '#333',
  },
  boldLabel: {
    fontWeight: 'bold',
  },
  picker: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 10,
  },
  datePickerButtonText: {
    color: '#333',
  },
  searchButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '55%',
    right: 50,
    backgroundColor: '#3CB371',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3CB371',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 5,
  },
  searchIcon: {
    marginLeft: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default TripSearchScreen;
