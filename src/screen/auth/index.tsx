import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import { AUTH_STACK_NAVIGATION_SCREENS } from '../../navigation/NavigationScreens';

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
        {AUTH_STACK_NAVIGATION_SCREENS.map(item => (
          <Stack.Screen
            key={item.name}
            name={item.name as keyof RootStackParamsList}
            component={item.component}
            options={{
              headerShown: false,
            }}
          />
        ))}
      </Stack.Navigator>
    </>
  );
}
