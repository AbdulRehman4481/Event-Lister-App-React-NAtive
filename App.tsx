import React, {useEffect} from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {ToastProvider} from 'react-native-toast-notifications';
import {Provider} from 'react-redux';
import store from './src/store/store';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <ToastProvider>
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </Provider>
    </ToastProvider>
  );
}
