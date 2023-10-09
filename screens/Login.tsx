import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Separator from '../components/Separator';

interface LoginProps {
  navigation: any;
}

interface UserData {
  userName: string;
  userPhone: string;
  userEmail: string;
  userPassword: string;
}

export default function Login({ navigation }: LoginProps) {
  const [registeredState, setRegisteredState] = useState<UserData>({
    userName: '',
    userPhone: '',
    userEmail: '',
    userPassword: '',
  });

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function getUserData() {
    let userData = await SecureStore.getItemAsync('userData');

    if (userData) {
      const parsedUserData: UserData = JSON.parse(userData);
      setRegisteredState(parsedUserData);
    }
  }

  useEffect(() => {
    const loadData = async () => {
      await getUserData();
  
      const unsubscribe = navigation.addListener('focus', async () => {
        await getUserData();
      });
  
      return () => {
        unsubscribe();
      };
    };
  
    loadData();
  }, [navigation]);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Preencha todos os campos!');
    } else {
      console.log('Email entered:', email);
      console.log('Password entered:', password);
      console.log('Stored Email:', registeredState.userEmail);
      console.log('Stored Password:', registeredState.userPassword);
  
      if (email !== registeredState.userEmail || password !== registeredState.userPassword) {
        Alert.alert('Email ou senha incorretos!');
      } else {
        Alert.alert('Login realizado com sucesso!');
        navigation.navigate('Home', registeredState);
      }
    }
  }

  function handleRegister() {
    setEmail('');
    setPassword('');
    navigation.navigate('Register');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Secure Store App</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(value) => setEmail(value)}
        placeholder="E-mail"
        keyboardType='email-address'
        textContentType='emailAddress'
        autoCapitalize='none'
      />
      <TextInput
        value={password}
        onChangeText={(value) => setPassword(value)}
        placeholder="Senha"
        secureTextEntry={true}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <Separator marginVertical={10} />

      {!registeredState.userEmail ? (
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            Alert.alert('Informação:', `A sua senha foi enviada para o email cadastrado: ${registeredState.userEmail}`)
          }>
          <Text style={styles.buttonText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      )}
      <Separator marginVertical={30} />

      <Text style={styles.textSimple}>
        Este aplicativo faz uso de armazenamento local com SecureStore e fará também com AsyncStorage
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC300',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#730000',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#E37D00',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#730000',
    textAlign: 'center',
  },
  input: {
    width: '90%',
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: '#730000',
    borderRadius: 5,
    marginBottom: 10,
  },
  textSimple: {
    color: '#730000',
  },
});
