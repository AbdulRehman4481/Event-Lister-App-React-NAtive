import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Images from '../../../constants/Images';
import useMyProfile from '../../../hooks/useMyProfile';
import MyProfileStyles from './MyProfileStyles';


export default function MyProfile() {
  const {
    handleLogout,
    update,
    userInfo,
    handleForgetPassword,
    openCamera,
    setUserInfo,
  } = useMyProfile();

  return (
    <ScrollView>
      <View style={MyProfileStyles.mainView}>
        <View style={MyProfileStyles.secondView}>
          <Text style={MyProfileStyles.mainHeading}>Profile Sittings</Text>
          <TouchableOpacity
            style={MyProfileStyles.logoutBtn}
            onPress={handleLogout}>
            <Text style={MyProfileStyles.logoutText}>LogOut</Text>
          </TouchableOpacity>
        </View>
        <View style={MyProfileStyles.thirdView}>
          <View style={MyProfileStyles.imageView}>
            <Image
              style={MyProfileStyles.profileImage}
              source={
                userInfo.userPhoto
                  ? {uri: userInfo.userPhoto}
                  : Images.profileLogo
              }
            />
          </View>
          <TouchableOpacity onPress={openCamera}>
            <Image
              source={Images.frameEditLogo}
              style={MyProfileStyles.frameEdit}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={MyProfileStyles.labels}>Name</Text>
          <View style={MyProfileStyles.titleView}>
            <TextInput
              style={MyProfileStyles.profileTitle}
              value={userInfo.userName}
              onChangeText={val => {
                setUserInfo({...userInfo, userName: val});
              }}
            />
          </View>
        </View>
        <View>
          <Text style={MyProfileStyles.labels}>Email</Text>
          <View style={MyProfileStyles.emailView}>
            <TextInput
              style={MyProfileStyles.profileEmail}
              value={userInfo.userEmail||""}
              onChangeText={val => {
                setUserInfo({...userInfo, userEmail: val});
              }}
            />
          </View>
        </View>
        <View style={MyProfileStyles.btnView}>
          <View>
            <TouchableOpacity
              style={MyProfileStyles.UpdateBtn}
              onPress={update}>
              <Text style={MyProfileStyles.UpdateText}>Update Profile</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={MyProfileStyles.ResetBtn}
              onPress={handleForgetPassword}>
              <Text style={MyProfileStyles.resetText}>Forget Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
