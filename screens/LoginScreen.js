import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validUsers = [
    { username: 'kullanici@gmail.com', password: '12345', gender: 'Erkek' },
    { username: 'kullanici2@gmail.com', password: '12345', gender: 'Kadın' },
  ];

  const handleLogin = () => {
    const validUser = validUsers.find(user => user.username === username && user.password === password);
    if (validUser) {
      setErrorMessage('');
      console.log('Giriş yapıldı:', username);

      const userGender = validUser.gender;

      navigation.navigate('TripSearch'); // Giriş başarılıysa TripSearch sayfasına yönlendir
    } else {
      setErrorMessage('Kullanıcı adı veya şifre hatalı.');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp'); // 'SignUp' ekranına yönlendirme
  };

  // Ödeme tamamlandıktan sonra dönecek sayfa
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.logo}>Bilet Satış Uygulaması</Text>
        <Text style={styles.welcomeText}>Hoşgeldiniz</Text>
        {errorMessage !== '' && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        <View style={[styles.inputView, errorMessage !== '' && styles.errorInput]}>
          <TextInput
            style={styles.inputText}
            placeholder="Mail"
            placeholderTextColor="#B0C4DE"
            onChangeText={text => setUsername(text)}
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.signUpBtn} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Üye Ol</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.buttonText}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'center',
    paddingTop: 40,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#8B4513',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 24,
    color: '#8B4513',
    marginBottom: 10,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  errorInput: {
    backgroundColor: 'red',
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  signUpBtn: {
    backgroundColor: '#FF4500',
    borderRadius: 25,
    width: wp('45%'), 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    backgroundColor: '#3CB371',
    borderRadius: 25,
    width: wp('45%'), 
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export default LoginScreen;
