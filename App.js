import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FooterComponent from './Components/FooterComponent';
import TestComponent from './Components/TestComponent';
import HeaderComponent from './Components/HeaderComponent';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({
  $textColor: '#0275d8',
});

export default function App() {
  console.log('Expense Tracker App started......');
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <ScrollView>
          <HeaderComponent></HeaderComponent>
          <TestComponent></TestComponent>
          <StatusBar style="auto" />
        </ScrollView>
        <View>
          <FooterComponent></FooterComponent>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
});
