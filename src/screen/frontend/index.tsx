import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Image, View} from 'react-native';
import {colors} from '../../constants/Colors';
import Images from '../../constants/Images';
import {FRONTEND_STACK_SCREENS} from '../../constants/Navigation';
import {FRONTEND_STACK_NAVIGATION_SCREENS} from '../../navigation/NavigationScreens';
import AddEvents from './addEvents/AddEvents';
import Discovery from './discovery/Discovery';
import Home from './home/Home';
import MyProfile from './myProfile/MyProfile';
import Ticket from './ticket/Ticket';

const Tab = createBottomTabNavigator();
export type RootStackParamsLists = {
  DetailTicket: {ticketId: string | undefined};
  EventDetail: {eventId: string};
  EditEvents: {eventId: string};
  MyTabs: undefined;
};

const Stack = createStackNavigator<RootStackParamsLists>();

export function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: tabInfo => (
            <Image
              source={Images.heartLogo}
              style={{tintColor: tabInfo.focused ? 'black' : 'gray'}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Discovery"
        component={Discovery}
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: tabInfo => (
            <Image
              source={Images.discoveryLogo}
              style={{tintColor: tabInfo.focused ? 'black' : 'gray'}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddEvents"
        component={AddEvents}
        options={{
          headerShown: false,
          title: '',

          tabBarIcon: tabInfo => (
            <View
              style={{
                backgroundColor: colors.primary,
                borderRadius: 50,
                padding: 10,
              }}>
              <Image source={Images.addLogo} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Ticket"
        component={Ticket}
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: tabInfo => (
            <Image
              source={Images.ticketLogo}
              style={{tintColor: tabInfo.focused ? 'black' : 'gray'}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: tabInfo => (
            <Image
              source={Images.accountLogo}
              style={{tintColor: tabInfo.focused ? 'black' : 'gray'}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default function Index() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{
            headerShown: false,
          }}
        />
        {FRONTEND_STACK_NAVIGATION_SCREENS.map(screen => (
          <Stack.Screen
            key={screen.name}
            name={screen.name as keyof RootStackParamsLists}
            component={screen.component}
            options={{
              headerShown:
                screen.name === FRONTEND_STACK_SCREENS.EditEvents
                  ? false
                  : true,
              headerStyle: {
                backgroundColor:
                  screen.name === FRONTEND_STACK_SCREENS.DetailTicket
                    ? colors.darBlue
                    : undefined,
              },
              headerTitleStyle: {
                color:
                  screen.name === FRONTEND_STACK_SCREENS.DetailTicket
                    ? 'white'
                    : 'black',
              },
              headerTintColor:
                screen.name === FRONTEND_STACK_SCREENS.DetailTicket
                  ? 'white'
                  : 'black',
              headerTitleAlign: 'center',
            }}
          />
        ))}
      </Stack.Navigator>
    </>
  );
}
