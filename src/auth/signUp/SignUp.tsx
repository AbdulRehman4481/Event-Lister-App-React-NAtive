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
import SignUpStyle from './SignUpStyle';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamsList} from '..';
import useSignUp from '../../hooks/useSignUp';


interface SignInScreenProp {
  navigation: StackNavigationProp<RootStackParamsList, 'SignUp'>;
}

;
export default function SignUp({navigation}: SignInScreenProp) {
  const {handleChange,handleSignUp,isProcessing ,onGoogleButtonPress}=useSignUp()

  return (
    <ScrollView>
       {isProcessing && (
          <View style={SignUpStyle.loadingContainer}>
            <ActivityIndicator size="large" color="#7b2cbf"  />
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
          <Pressable onPress={onGoogleButtonPress}>

          <Image
            style={SignUpStyle.image}
            source={require('../../assets/logo/Googleplay.png')}
            />
            </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
