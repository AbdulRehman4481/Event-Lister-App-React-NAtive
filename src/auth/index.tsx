import React from 'react';
import SignIn from './signIn/SignIn';
import SignUp from './signUp/SignUp';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

export type RootStackParamsList = {
  SignIn: undefined;
  SignUp: undefined;
};

type RootStackNavigationProps<T extends keyof RootStackParamsList> = {
  navigation: StackNavigationProp<RootStackParamsList, T>;
};

const Stack = createStackNavigator<RootStackParamsList>();
export default function Index() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false
          }}
        />
       
      </Stack.Navigator>
    </>
  );
}
