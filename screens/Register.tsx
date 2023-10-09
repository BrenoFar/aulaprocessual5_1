import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import Separator from '../components/Separator';

interface RegisterProps {
  navigation: any;
}

interface UserState {
  userName: string;
  userPhone: string;
  userEmail: string;
  userPassword: string;
}

export default function Register({ navigation }: RegisterProps) {
  const [state, setState] = useState<UserState>({
    userName: '',
    userPhone: '',
    userEmail: '',
    userPassword: '',
  });

  const [userPasswordConfirm, setUserPasswordConfirm] = useState<string>('');

  // Salva dados de registro com SecureStore
  const saveUserData = async (userData: UserState) => {
    try {
      await SecureStore.setItemAsync('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

  function handleRegister() {
    if (!state.userName || !state.userPhone || !state.userEmail || !state.userPassword || !userPasswordConfirm) {
      Alert.alert('Preencha todos os campos!');
      return;
    } else {
      if (state.userPassword !== userPasswordConfirm) {
        Alert.alert('As senhas não conferem!');
        return;
      } else {
        // Save user data here
        saveUserData(state); // Corrected to save user data
        Alert.alert('Usuário cadastrado com sucesso!');
        navigation.navigate('Login');
      }
    }
  }

  const handleChangeText = (key: keyof UserState, value: string) => {
    setState({
      ...state,
      [key]: value,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Dados do Usuário</Text>
      <TextInput
        style={styles.input}
        value={state.userName}
        onChangeText={(value) => handleChangeText('userName', value)}
        placeholder="Nome"
      />
      <TextInput
        style={styles.input}
        value={state.userPhone}
        onChangeText={(value) => handleChangeText('userPhone', value)}
        placeholder="Telefone"
        keyboardType='numeric'
      />
      <TextInput
        style={styles.input}
        value={state.userEmail}
        onChangeText={(value) => handleChangeText('userEmail', value)}
        placeholder="E-mail"
        keyboardType='email-address'
        textContentType='emailAddress'
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        value={state.userPassword}
        onChangeText={(value) => handleChangeText('userPassword', value)}
        placeholder="Senha"
        secureTextEntry={true}
        textContentType='password'
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        value={userPasswordConfirm}
        onChangeText={(value) => setUserPasswordConfirm(value)}
        placeholder="Confirme a senha"
        secureTextEntry={true}
        textContentType='password'
        autoCapitalize='none'
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleRegister}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>

      <Separator marginVertical={30} />
      <Text style={styles.textSimple}>Atenção!</Text>
      <Text style={styles.textSimple}>
        Informe um e-mail válido, pois em caso de recuperação de senha, ela será enviada para o e-mail cadastrado.
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
    marginBottom: 20,
    color: '#730000',
    textAlign: 'center',
  },
  saveButton: {
    width: '50%',
    height: 40,
    backgroundColor: '#E37D00',
    borderRadius: 5,
    padding: 5,
  },
  saveButtonText: {
    fontSize: 20,
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
    width: '95%',
    textAlign: 'justify',
  },
});
