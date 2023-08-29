import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert, ToastAndroid, TextInput, Platform  } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ExpeditionDetails = ({ route }) => {
  const { selectedTrip } = route.params;
  const [seatStatus, setSeatStatus] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [tcNumber, setTcNumber] = useState(''); 

  const navigation = useNavigation();

  const handlePurchaseButtonPress = () => {
    if (selectedSeats.length === 0) {
      const toastMessage = 'Lütfen koltuk seçimi yapınız.';
      showMessage(toastMessage);
      return;
    }

    if (tcNumber === '') {
      const toastMessage = 'Lütfen TC kimlik numarasını giriniz.';
      showMessage(toastMessage);
      return;
    }

    if (tcNumber.length !== 11) { // TC numarasının 11 hane olup olmadığını kontrol edin
      const toastMessage = 'TC kimlik numarası 11 hane olmalıdır.';
      showMessage(toastMessage);
      return;
    }

    // Ödeme ekranına yönlendir
    navigation.navigate('PaymentScreen', {
      selectedSeats: selectedSeats,
      totalPrice: totalPrice,
      tcNumber: tcNumber,

    });
  };

  const showMessage = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else if (Platform.OS === 'ios') {
      // iOS için Alert kullanabilirsiniz
      Alert.alert('', message);
    }
  };

  const isAdjacentSeatOccupied = (seatIndex, gender, selectedSeats, seatStatus) => {
    if (seatIndex === 0 || seatIndex === 1) {
      // 1 ve 2 numaralı koltuklarda aynı cinsiyet oturabilir
      const adjacentSeatGender = seatStatus[seatIndex + 1];
      return adjacentSeatGender === gender;
    } else if (selectedSeats.includes(seatIndex - 1) || selectedSeats.includes(seatIndex + 1)) {
      // Diğer koltuklarda yanındaki koltukları kontrol et
      const adjacentSeatGender = seatStatus[seatIndex - 1] || seatStatus[seatIndex + 1];
      return adjacentSeatGender === gender;
    }
  
    return false;
  };

  useEffect(() => {
    const newSeatStatus = Array(24).fill('empty');
    const emptySeatCount = 24 - selectedTrip.availableSeats;
  
    // Çift koltuklara sırayla cinsiyetleri uygulama
    let currentGender = 'male'; // Başlangıç cinsiyeti
    for (let i = 0; i < emptySeatCount; i += 2) {
      let randomIndex = Math.floor(Math.random() * 24);
  
      // Farklı cinsiyetler oturamayacak koltuk numaralarını kontrol et
      while (
        randomIndex % 3 === 2 || // Koltuk numarasının 3'e göre modu 2 ise (2, 5, 8, ...)
        newSeatStatus[randomIndex] !== 'empty' ||
        newSeatStatus[randomIndex + 2] !== 'empty'
      ) {
        randomIndex = Math.floor(Math.random() * 24);
      }
  
      newSeatStatus[randomIndex] = currentGender;
      newSeatStatus[randomIndex + 2] = currentGender;
      currentGender = currentGender === 'male' ? 'female' : 'male'; 
    }
  
    setSeatStatus(newSeatStatus);
  }, [selectedTrip]);

  useEffect(() => {
    const pricePerSeat = selectedTrip.price;
    const selectedSeatsCount = selectedSeats.length;
    const newTotalPrice = pricePerSeat * selectedSeatsCount;
    setTotalPrice(newTotalPrice);
  }, [selectedSeats, selectedTrip.price]);

  const handleSeatPress = (index) => {
    if (selectedSeats.length >= 5) {
      const toastMessage = 'En fazla 5 koltuk seçebilirsiniz!';
      showMessage(toastMessage);
      return;
    }
  
    if (seatStatus[index] === 'empty') {
      openGenderSelectionAlert(index);
    } else {
      setSelectedSeats(selectedSeats.filter(seatIndex => seatIndex !== index));
    }
  };
  
  const openGenderSelectionAlert = (index) => {
    Alert.alert(
      'Cinsiyet Seçimi',
      'Cinsiyetinizi Seçiniz',
      [
        {
          text: 'Erkek',
          onPress: () => selectGenderAndCloseAlert(index, 'male'),
        },
        {
          text: 'Kadın',
          onPress: () => selectGenderAndCloseAlert(index, 'female'),
        },
        {
          text: 'İptal',
          onPress: () => {},
          style: 'cancel',
        },
      ]
    );
  };

  const handlePassengerInput = (text) => {
    setTcNumber(text);
  };
  
  const selectGenderAndCloseAlert = (index, gender) => {
    if (seatStatus[index] !== gender) {
      if (selectedSeats.includes(index - 1) && seatStatus[index - 1] !== gender) {
        showMessage('Yanındaki koltuk zaten farklı cinsiyetten dolu!');
        return;
      }
  
      if (selectedSeats.includes(index + 1) && seatStatus[index + 1] !== gender) {
        showMessage('Yanındaki koltuk zaten farklı cinsiyetten dolu!');
        return;
      }
  
      setSeatStatus(prevSeatStatus => {
        const newSeatStatus = [...prevSeatStatus];
        newSeatStatus[index] = gender;
        return newSeatStatus;
      });
  
      setSelectedSeats(prevSelectedSeats => [...prevSelectedSeats, index]);
    }
  };
  
  const renderSeats = () => {
    return seatStatus.map((status, index) => {
      let seatBackgroundColor = getColorForStatus(status);
      let seatContent = null;

      if (selectedSeats.includes(index)) {
        seatBackgroundColor = selectedSeats[index] === 'male' ? '#0080FF' : '#FF1493';
      }

      if (status === 'male') {
        seatContent = <FontAwesome name="male" size={15} color="blue" style={styles.icon} />;
      } else if (status === 'female') {
        seatContent = <FontAwesome name="female" size={15} color="pink" style={[styles.icon, styles.femaleIcon]} />;
      } else if (status === 'empty') {
        seatContent = <Text style={styles.seatNumber}>{index + 1}</Text>;
      }

      let isDisabled = false;

      return (
        <TouchableOpacity
          key={index}
          style={[styles.seat, { backgroundColor: seatBackgroundColor }]}
          disabled={isDisabled}
          onPress={() => handleSeatPress(index)}
        >
          {seatContent}
        </TouchableOpacity>
      );
    });
  };

  const getColorForStatus = (status) => {
    switch (status) {
      case 'empty':
        return '#ccc';
      default:
        return 'gray';
    }
  };

  return (
    <View style={styles.container}>
    <View style={styles.detailsContainer}>
      <View style={styles.detailBox}>
        <Text style={styles.detailLabel}>Firma Adı</Text>
        <Text style={styles.detailText}>{selectedTrip.firmName}</Text>
      </View>
      <View style={styles.detailBox}>
        <Text style={styles.detailLabel}>Tarih</Text>
        <Text style={styles.detailText}>{selectedTrip.departureDate.toLocaleDateString('tr-TR')}</Text>
      </View>
      <View style={styles.detailBox}>
        <Text style={styles.detailLabel}>Koltuk Fiyatı</Text>
        <Text style={styles.detailText}>{selectedTrip.price} TL</Text>
      </View>
    </View>
    <View style={styles.busContainer}>
      <View style={styles.driverArea}>
        <FontAwesome name="bus" size={30} color="black" />
      </View>
      <View style={styles.seatRows}>
          <View style={styles.corridor} />
          <View style={styles.seatRow}>
            {renderSeats().slice(0, 1)}
            {renderSeats().slice(3, 4)}
            {renderSeats().slice(6, 7)}
            {renderSeats().slice(9, 10)}
            {renderSeats().slice(12, 13)}
            {renderSeats().slice(15, 16)}
            {renderSeats().slice(18, 19)}
            {renderSeats().slice(21, 22)}
          </View>
          <View style={styles.corridor} />
          <View style={[styles.seatRow, { marginTop: -15 }]}>
            {renderSeats().slice(1, 2)}
            {renderSeats().slice(4, 5)}
            {renderSeats().slice(7, 8)}
            {renderSeats().slice(10, 11)}
            {renderSeats().slice(13, 14)}
            {renderSeats().slice(16, 17)}
            {renderSeats().slice(19, 20)}
            {renderSeats().slice(22, 23)}
          </View>
          <View style={styles.corridor} />
          <View style={styles.seatRow}>
            {renderSeats().slice(2, 3)}
            {renderSeats().slice(5, 6)}
            {renderSeats().slice(8, 9)}
            {renderSeats().slice(11, 12)}
            {renderSeats().slice(14, 15)}
            {renderSeats().slice(17, 18)}
            {renderSeats().slice(20, 21)}
            {renderSeats().slice(23, 24)}
          </View>
          <View style={styles.corridor} />
        </View>
        <View style={styles.passengerInputContainer}>
        <Text style={styles.passengerInputLabel}>Yolcu TC</Text>
        <TextInput
  style={styles.passengerInput}
  placeholder="TC Kimlik Numarası"
  onChangeText={(text) => handlePassengerInput(text)}
  keyboardType="numeric" // Sadece numara klavyesi
  maxLength={11} // Maksimum 11 karakter
  value={tcNumber} 
/>
      </View>
      <View style={styles.selectedSeatsContainer}>
        <Text style={styles.selectedSeatsLabel}>Seçilen Koltuk</Text>
        <Text style={styles.selectedSeatsText}>
          {selectedSeats.map(seatIndex => seatIndex + 1).join(', ')}
        </Text>
      </View>
      <View style={styles.purchaseButtonContainer}>
        <Text style={styles.totalPrice}>Toplam Fiyat: {totalPrice} TL</Text>
        <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchaseButtonPress}>
          <Text style={styles.purchaseButtonText}>Satın Al</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1eff0',
    alignItems: 'center',
    justifyContent: 'bottom',
  },
  busContainer: {
    width: '90%', 
    aspectRatio: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: '10%', 
  },
  driverArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatRows: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  seatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
    marginTop: 5,
  },
  seat: {
    width: 25,
    height: 25,
    backgroundColor: '#ccc',
    borderRadius: 12.5,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatNumber: {
    fontSize: 10,
    color: 'black',
  },
  corridor: {
    height: 10,
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
  },
  femaleIcon: {
    top: 5,
  },
  detailsContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    marginTop: '5%',
},
  detailBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10, 
    marginRight: 5, 
},
  detailLabel: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#555',
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  passengerInputContainer: {
    position: 'absolute',
    top: '150%', 
    left: '5%', 
    width: '45%', 
  },
  passengerInputLabel: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  passengerInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
  },
  selectedSeatsContainer: {
    position: 'absolute',
    top: '170%', 
    right: '5%', 
    width: '45%', 
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedSeatsLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
  },
  selectedSeatsText: {
    fontSize: 25,
    color: '#333',
  },
  purchaseButtonContainer: {
    position: 'absolute',
    bottom: '-200%', 
    right: '5%', 
    alignItems: 'flex-end',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  purchaseButton: {
    backgroundColor: '#0080FF',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  purchaseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExpeditionDetails;
