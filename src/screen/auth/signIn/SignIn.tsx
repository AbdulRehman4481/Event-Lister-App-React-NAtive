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
import useSignIn from '../../../hooks/useSignIn';
import SignInStyle from './SignInStyle';
import {SignInScreenProp} from '../../../constants/Types';

export default function SignIn({navigation}: SignInScreenProp) {
  const {handleChange, handleSignIn, isProcessing, handleGoogleSignIn} =
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
          Don’t have an account? &nbsp;
          <Text
            onPress={() => navigation.navigate('SignUp')}
            style={SignInStyle.insteadBtn}>
            SignUp Instead
          </Text>
          .
        </Text>

        <TouchableOpacity style={SignInStyle.button} onPress={handleSignIn}>
          <Text style={SignInStyle.signText}>
            {' '}
            {isProcessing && (
              <ActivityIndicator size={'small'} color={'white'} />
            )}
            Sign In
          </Text>
        </TouchableOpacity>

        <View style={SignInStyle.container}>
          <View style={SignInStyle.line} />
          <Text style={SignInStyle.text}>OR</Text>
          <View style={SignInStyle.line} />
        </View>
        <View style={SignInStyle.imageContainer}>
          <TouchableOpacity onPress={handleGoogleSignIn}>
            <Image style={SignInStyle.image} source={Images.googlePlayLogo} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
