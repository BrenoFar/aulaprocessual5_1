import React from 'react'; 
import { StyleSheet, Text, View } from 'react-native';

interface HomeProps {
  navigation: any; 
  route: any;
}

export default function Home({ navigation, route }: HomeProps) {
  return (
    <View style={styles.container}>
      <Text>Tela Home {route.params?.email}</Text>
      <Text>Olá {route.params?.name}, seja bem-vindo!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC300'
  },
});
