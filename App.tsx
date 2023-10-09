import * as React from 'react';
import { Text, View, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FEF384' }}>
      <StatusBar style='auto' backgroundColor='#AD6200' />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Login'
          screenOptions={{
            headerStyle: { backgroundColor: '#E37D00' }, // header color
            headerTintColor: '#fff', // header text color
          }}
        >
          <Stack.Screen
            name='Login'
            component={Login}
            options={{
              title: 'Login',
              headerTitleStyle: {
                fontWeight: 'bold',
                textAlign: 'center' as const, // Use 'const' for type assertion
              },
            }}
          />

          <Stack.Screen
            name='Register'
            component={Register}
            options={{
              title: 'Registre-se',
            }}
          />

          <Stack.Screen
            name='Home'
            component={Home}
            options={({ navigation }) => ({
              title: 'Home',
              headerRight: () => (
                <Button
                  onPress={() =>
                    Alert.alert('Atenção!', 'Deseja sair do aplicativo?', [
                      {
                        text: 'Sim',
                        onPress: () => navigation.navigate('Login'),
                      },
                      {
                        text: 'Não',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                    ])
                  }
                  title='Sair'
                  color='#730000'
                />
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
