import React from 'react';
import Home from './home/Home';
import AddEvents from './addEvents/AddEvents';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyProfile from './myProfile/MyProfile';
import {Image, View} from 'react-native';
import Discovery from './discovery/Discovery';
import Ticket from './ticket/Ticket';
import {colors} from '../../components/constants/constants';
import {createStackNavigator} from '@react-navigation/stack';
import DetailTicket from './detailTicket/DetailTicket';
import EventDetail from './eventDetail/EventDetail';
import ResetPassword from '../../auth/resetPassword/ResetPassword';

const Tab = createBottomTabNavigator();
export type RootStackParamsLists = {
  DetailTicket: undefined;
  EventDetail: {eventId: string};
  MyTabs: undefined;
  ResetPassword: undefined;
};

//

const Stack = createStackNavigator<RootStackParamsLists>();

function MyTabs() {
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
              source={require('../../assets/logo/Heart.png')}
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
              source={require('../../assets/logo/Discovery.png')}
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
              <Image source={require('../../assets/logo/Add.png')} />
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
              source={require('../../assets/logo/Ticket.png')}
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
              source={require('../../assets/logo/Profile.png')}
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
        <Stack.Screen
          name="DetailTicket"
          component={DetailTicket}
          options={{
            headerStyle: {
              backgroundColor: colors.darBlue,
            },
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="EventDetail"
          component={EventDetail}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </>
  );
}
