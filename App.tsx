import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screen/frontend/home/Home';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Login from './src/screen/frontend/login/Login';
import TaskDetail from './src/screen/frontend/TaskDetail/[id]';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const Stack = createStackNavigator();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
              name="TaskDetail"
              options={{title: 'Task Detail'}}
              component={TaskDetail}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
