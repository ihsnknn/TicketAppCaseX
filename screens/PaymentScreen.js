import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const PaymentScreen = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCVC] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handlePayButtonPress = () => {
    if (!cardNumber || !expiry || !cvc || !cardHolderName) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    setIsLoading(true);

    // ödeme işlemi
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Başarılı', 'Ödeme işlemi tamamlandı.', [
        {
          text: 'Tamam',
          onPress: () => navigation.navigate('Login'), // LoginScreen'e yönlendir
        },
      ]);
    }, 1000);
  };

  const handleCardNumberChange = (input) => {
    // Sadece numerik karakterleri al ve 16 hane ile sınırlandır
    const numericInput = input.replace(/\D/g, '').slice(0, 16);
    setCardNumber(numericInput);
  };

  const handleExpiryChange = (input) => {
    // Sadece numerik karakterleri al ve "MM/YY" formatında 4 hane ile sınırlandır
    const numericInput = input.replace(/\D/g, '').slice(0, 4);
    if (numericInput.length >= 3) {
      setExpiry(`${numericInput.slice(0, 2)}/${numericInput.slice(2)}`);
    } else {
      setExpiry(numericInput);
    }
  };

  const handleCVCChange = (input) => {
    // Sadece numerik karakterleri al ve 3 hane ile sınırla ve CVC yi yaz
    const numericInput = input.replace(/\D/g, '').slice(0, 3);
    setCVC(numericInput);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kredi Kartı Bilgileri</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Kart Üzerindeki İsim"
        value={cardHolderName}
        onChangeText={setCardHolderName}
      />

      <TextInput
        style={styles.input}
        placeholder="Kart Numarası (16 hane)"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={handleCardNumberChange}
      />
      
      <View style={styles.inlineInputs}>
        <TextInput
          style={[styles.input, styles.inlineInput]}
          placeholder="MM/YY"
          keyboardType="numeric"
          value={expiry}
          onChangeText={handleExpiryChange}
        />
        
        <TextInput
          style={[styles.input, styles.inlineInput]}
          placeholder="CVC/CV2 (3 hane)"
          keyboardType="numeric"
          value={cvc}
          onChangeText={handleCVCChange}
        />
      </View>
      
      <TouchableOpacity style={styles.payButton} onPress={handlePayButtonPress}>
        <Text style={styles.payButtonText}>Ödemeyi Tamamla</Text>
      </TouchableOpacity>


      {isLoading && <ActivityIndicator style={styles.spinner} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    width: '80%',
  },
  inlineInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  inlineInput: {
    width: '45%',
  },
  payButton: {
    backgroundColor: '#0080FF',
    borderRadius: 8,
    padding: 15,
    width: '60%',
    marginTop: 20,
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  spinner: {
    marginTop: 20,
  },
});

export default PaymentScreen;
