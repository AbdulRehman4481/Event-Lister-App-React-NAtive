import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Images from '../../../constants/Images';
import useSignUp from '../../../hooks/useSignUp';
import SignUpStyle from './SignUpStyle';
import {SigUpScreenProp} from '../../../constants/Types';

export default function SignUp({navigation}: SigUpScreenProp) {
  const {handleChange, handleSignUp, isProcessing, onGoogleButtonPress} =
    useSignUp();

  return (
    <ScrollView>
      {isProcessing && (
        <View style={SignUpStyle.loadingContainer}>
          <ActivityIndicator size="large" color="#7b2cbf" />
        </View>
      )}
      <View>
        <Text style={SignUpStyle.mainHeading}>Sign Up</Text>
      </View>
      <View style={{marginHorizontal: 20, marginTop: 30}}>
        <View>
          <Text style={SignUpStyle.labels}>Name</Text>
          <TextInput
            style={SignUpStyle.inputs}
            placeholder="Name"
            keyboardType="default"
            onChangeText={val => {
              handleChange('name', val);
            }}
          />
        </View>

        <View>
          <Text style={SignUpStyle.labels}>Email</Text>
          <TextInput
            style={SignUpStyle.inputs}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={val => {
              handleChange('email', val);
            }}
          />
        </View>
        <View>
          <Text style={SignUpStyle.labels}>Password</Text>
          <TextInput
            style={SignUpStyle.inputs}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={val => {
              handleChange('password', val);
            }}
          />
        </View>
        <Text style={{marginTop: 15}}>
          I have an account?{' '}
          <Text
            style={SignUpStyle.insteadBtn}
            onPress={() => navigation.navigate('SignIn')}>
            Sign In Instead
          </Text>
          .
        </Text>

        <TouchableOpacity style={SignUpStyle.button}>
          {isProcessing && <ActivityIndicator size={'small'} color={'white'} />}

          <Text style={SignUpStyle.signText} onPress={handleSignUp}>
            Sign Up
          </Text>
        </TouchableOpacity>

        <View style={SignUpStyle.container}>
          <View style={SignUpStyle.line} />
          <Text style={SignUpStyle.text}>OR</Text>
          <View style={SignUpStyle.line} />
        </View>
        <View style={SignUpStyle.imageContainer}>
          <TouchableOpacity onPress={onGoogleButtonPress}>
            <Image style={SignUpStyle.image} source={Images.googlePlayLogo} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
