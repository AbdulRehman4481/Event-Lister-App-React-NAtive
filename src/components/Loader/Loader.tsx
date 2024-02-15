import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CustomLoader = () => {
  return (
    <View style={styles.loader}>
      <LinearGradient
        colors={['#766DF4', '#0000']}
        start={[0, 1]}
        end={[1, 0]}
        style={styles.gradientTop}
      />
      <LinearGradient
        colors={['#0000', '#766DF4']}
        start={[0, 1]}
        end={[1, 0]}
        style={styles.gradientCircle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    position: 'relative',
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  gradientCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    top: 0,
    left: 0,
    transformOrigin: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default CustomLoader;
