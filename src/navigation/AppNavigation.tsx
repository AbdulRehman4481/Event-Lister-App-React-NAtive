import React from 'react';
import Frontend from '../screen/frontend';
import Auth from '../auth';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import useUserCheck from '../hooks/useUserCheck';

export default function AppNavigation() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const {isLoading} = useUserCheck();
  console.log(isAuth);
  console.log('isLoading', isLoading);
  return (
    <>
      {isLoading ? (
        // <><Text>....loading</Text></>
        <View style={Style.loadingContainer}>
          <ActivityIndicator size="large" color="purple" />
        </View>
      ) : isAuth ? (
        <Frontend />
      ) : (
        <Auth />
      )}
    </>
  );
}

const Style = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});
