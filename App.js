import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import TripSearchScreen from './screens/TripSearchScreen';
import ExpeditionList from './screens/ExpeditionList';
import ExpeditionDetails from './screens/ExpeditionDetail';
import PaymentScreen from './screens/PaymentScreen';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state.',
]);

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="TripSearch"
          component={TripSearchScreen}
          options={{
            title: 'Bilet Ara',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="ExpeditionList"
          component={ExpeditionList}
          options={{
            title: 'Uygun Seferler',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="ExpeditionDetails"
          component={ExpeditionDetails}
          options={{
            title: 'Sefer Detayları',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{
            title: 'Ödeme',
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
