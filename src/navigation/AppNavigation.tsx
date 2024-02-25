import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import useUserCheck from '../hooks/useUserCheck';
import Auth from '../screen/auth';
import Frontend from '../screen/frontend';
import {RootState} from '../store/store';

export default function AppNavigation() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const {isLoading} = useUserCheck();
  return (
    <>
      {isLoading ? (
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
