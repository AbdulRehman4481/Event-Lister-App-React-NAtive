import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import SignInStyle from './SignInStyle';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamsList} from '..';
import useSignIn from '../../hooks/useSignIn';

interface SignInScreenProp {
  navigation: StackNavigationProp<RootStackParamsList, 'SignIn'>;
}

export default function SignIn({navigation}: SignInScreenProp) {
  const {handleChange, handleSignIn, isProcessing, handleGoogleSignin} =
    useSignIn();

  return (
    <ScrollView>
      {isProcessing && (
        <View style={SignInStyle.loadingContainer}>
          <ActivityIndicator size="large" color="#7b2cbf" />
        </View>
      )}
      <View>
        <Text style={SignInStyle.mainHeading}>Sign In</Text>
      </View>
      <View style={{marginHorizontal: 20, marginVertical: 80}}>
        <View>
          <Text style={SignInStyle.labels}>Email</Text>
          <TextInput
            style={SignInStyle.inputs}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={val => {
              handleChange('email', val);
            }}
          />
        </View>
        <View>
          <Text style={SignInStyle.labels}>Password</Text>
          <TextInput
            style={SignInStyle.inputs}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={val => {
              handleChange('password', val);
            }}
          />
        </View>
        <Text style={{marginTop: 15}}>
          Don’t have an account?
          <Text
            onPress={() => navigation.navigate('SignUp')}
            style={SignInStyle.insteadBtn}>
            SignUp Instead
          </Text>
          .
        </Text>

        <TouchableOpacity style={SignInStyle.button} onPress={handleSignIn}>
          <Text style={SignInStyle.signText}>Sign In</Text>
        </TouchableOpacity>

        <View style={SignInStyle.container}>
          <View style={SignInStyle.line} />
          <Text style={SignInStyle.text}>OR</Text>
          <View style={SignInStyle.line} />
        </View>
        <View style={SignInStyle.imageContainer}>
          <Pressable onPress={handleGoogleSignin}>
            <Image
              style={SignInStyle.image}
              source={require('../../assets/logo/Googleplay.png')}
            />
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
