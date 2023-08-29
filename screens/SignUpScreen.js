import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = () => {
    if (
      firstName && lastName && identityNumber && selectedGender &&
      birthDay && birthMonth && birthYear && email && password && confirmPassword
    ) {
      if (password === confirmPassword) {
        setErrorMessage('');

        Alert.alert(
          'Kayıt Başarılı',
          'Hesabınız başarıyla oluşturuldu.',
          [
            {
              text: 'Tamam',
              onPress: () => {
                console.log('Kayıt tamamlandı:');
                console.log('Ad:', firstName);
                console.log('Soyad:', lastName);
                console.log('Kimlik No:', identityNumber);
                console.log('Cinsiyet:', selectedGender);
                console.log('Doğum Tarihi:', `${birthDay}.${birthMonth}.${birthYear}`);
                console.log('Mail Adresi:', email);
                console.log('Şifre:', password);

                console.log('Kayıt Başarılı');
                navigation.navigate('Login');
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        setErrorMessage('Şifreler eşleşmiyor.');
      }
    } else {
      setErrorMessage('Tüm alanları doldurun.');
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.logo}>Kayıt Ol</Text>
        {errorMessage !== '' && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        <View style={[styles.inputView, errorMessage !== '' && styles.errorInput]}>
          <TextInput
            style={styles.inputText}
            placeholder="Ad"
            placeholderTextColor="#B0C4DE"
            onChangeText={text => setFirstName(text)}
          />
        </View>
        <View style={[styles.inputView, errorMessage !== '' && styles.errorInput]}>
          <TextInput
            style={styles.inputText}
            placeholder="Soyad"
            placeholderTextColor="#B0C4DE"
            onChangeText={text => setLastName(text)}
          />
        </View>
        <View style={[styles.inputView, errorMessage !== '' && styles.errorInput]}>
          <TextInput
            style={styles.inputText}
            placeholder="Kimlik No"
            placeholderTextColor="#B0C4DE"
            keyboardType="numeric"
            maxLength={11}
            onChangeText={text => setIdentityNumber(text)}
          />
        </View>
        <View style={[styles.inputView, errorMessage !== '' && styles.errorInput]}>
          <View style={styles.birthDateContainer}>
            <Text style={styles.birthDateLabel}>Doğum Tarihi Giriniz </Text>
            <TextInput
              style={[styles.inputText, styles.birthDateInput]}
              placeholder="Gün"
              placeholderTextColor="#B0C4DE"
              keyboardType="numeric"
              maxLength={2}
              onChangeText={text => setBirthDay(text)}
            />
            <TextInput
              style={[styles.inputText, styles.birthDateInput]}
              placeholder="Ay"
              placeholderTextColor="#B0C4DE"
              keyboardType="numeric"
              maxLength={2}
              onChangeText={text => setBirthMonth(text)}
            />
            <TextInput
              style={[styles.inputText, styles.birthDateInput]}
              placeholder="Yıl"
              placeholderTextColor="#B0C4DE"
              keyboardType="numeric"
              maxLength={4}
              onChangeText={text => setBirthYear(text)}
            />
          </View>
        </View>
        <View style={[styles.inputView, errorMessage !== '' && styles.errorInput]}>
          <View style={styles.genderContainer}>
            <Text style={styles.genderLabel}>Cinsiyet Seçiniz    </Text>
            <TouchableOpacity
              style={[styles.genderButton, selectedGender === 'Erkek' && styles.selectedGenderButton]}
              onPress={() => setSelectedGender('Erkek')}>
              <Text style={styles.genderButtonText}>Erkek</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderButton, selectedGender === 'Kadın' && styles.selectedGenderButton]}
              onPress={() => setSelectedGender('Kadın')}>
              <Text style={styles.genderButtonText}>Kadın</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.inputView, errorMessage !== '' && styles.errorInput]}>
          <TextInput
            style={styles.inputText}
            placeholder="Mail Adresi"
            placeholderTextColor="#B0C4DE"
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={[styles.inputView, errorMessage !== '' && styles.errorInput]}>
          <TextInput
            style={styles.inputText}
            placeholder="Şifre"
            placeholderTextColor="#B0C4DE"
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View style={[styles.inputView, errorMessage !== '' && styles.errorInput]}>
          <TextInput
            style={styles.inputText}
            placeholder="Şifre Tekrarı"
            placeholderTextColor="#B0C4DE"
            secureTextEntry
            onChangeText={text => setConfirmPassword(text)}
          />
        </View>
        <TouchableOpacity style={styles.signUpBtn} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={wp('8%')} color="#3CB371" />
      </TouchableOpacity>
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
    justifyContent: 'center',
    paddingTop: 20,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#FF4500',
    marginBottom: 10,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  inputView: {
    width: wp('80%'),
    marginBottom: hp('2%'), 
  },
  errorInput: {
    backgroundColor: 'red',
  },
  inputText: {
    height: 50,
    backgroundColor: '#465881',
    borderRadius: 25,
    color: 'white',
    paddingHorizontal: 20,
  },
  birthDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  birthDateLabel: {
    fontSize: wp('4.3%'), 
    fontWeight: 'bold',
  },
  birthDateInput: {
    flex: 1,
    height: hp('5%'), 
    marginRight: wp('2%'), 
    backgroundColor: '#465881',
    borderRadius: wp('2%'), 
    color: 'white',
    paddingHorizontal: wp('3%'), 
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genderLabel: {
    fontSize: wp('4.5%'), 
    fontWeight: 'bold',
  },
  genderButton: {
    backgroundColor: '#465881',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
  },
  selectedGenderButton: {
    backgroundColor: '#3CB371',
  },
  genderButtonText: {
    color: 'white',  
  },
  signUpBtn: {
    position: 'absolute',
    bottom: hp('2%'), 
    right: wp('5%'), 
    backgroundColor: '#FF4500',
    borderRadius: wp('5%'), 
    width: wp('40%'),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('1.5%'), 
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  buttonText: {
    color: 'white',
  },
});

export default SignUpScreen;
