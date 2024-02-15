import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import PasswordStyle from './PasswordStyle';

export default function ResetPassword() {

  return (
    <>
      <ScrollView>
        <View style={{ marginHorizontal: 20, marginTop: 100 }}>
          <View>
            <Text style={PasswordStyle.labels}>Old Password</Text>
            <TextInput
              style={PasswordStyle.inputs}
              placeholder="Old Password"
              secureTextEntry={true}
            />
          </View>
          <View>
            <Text style={PasswordStyle.labels}>New Password</Text>
            <TextInput
              style={PasswordStyle.inputs}
              placeholder="New Password"
              secureTextEntry={true}
            />
          </View>
          <View>
            <Text style={PasswordStyle.labels}>Confirm Password</Text>
            <TextInput
              style={PasswordStyle.inputs}
              placeholder="Confirm Password"
              secureTextEntry={true}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <TouchableOpacity style={PasswordStyle.button}>
          <Text style={PasswordStyle.signText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
