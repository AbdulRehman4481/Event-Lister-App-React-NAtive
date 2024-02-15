import {View, Text, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import MyProfileStyles from './MyProfileStyles';
import useMyprofile from '../../../hooks/useMyProfile';
import {RootStackParamsLists} from '..';
import {StackNavigationProp} from '@react-navigation/stack';

interface User {
  name?: string;
  email?: string;
  photo?: string;
}

interface RestPasswordScreenProp {
  navigation: StackNavigationProp<RootStackParamsLists, 'ResetPassword'>;
}

export default function MyProfile({navigation}: RestPasswordScreenProp) {
  const {handleLogout, user} = useMyprofile();
  const [userInfo, setUserInfo] = useState({
    userName: '',
    userEmail: '',
    userPhoto: '',
  });

  useEffect(() => {
    const userName = user?.name || 'Unknown';
    const userEmail = user?.email || 'Unknown';
    const userPhoto = user?.photo || '';
    setUserInfo({userName, userEmail, userPhoto});
  }, [user]);

  return (
    <ScrollView>
      <View style={MyProfileStyles.mainView}>
        <View style={MyProfileStyles.secondView}>
          <Text style={MyProfileStyles.mainHeading}>Profile Sittings</Text>
          <Pressable style={MyProfileStyles.logoutBtn} onPress={handleLogout}>
            <Text style={MyProfileStyles.logoutText}>LogOut</Text>
          </Pressable>
        </View>
        <View style={MyProfileStyles.thirdView}>
          <View style={MyProfileStyles.imageView}>
            <Image
              style={MyProfileStyles.profileImage}
              source={
                userInfo.userPhoto
                  ? {uri: userInfo.userPhoto}
                  : require('../../../assets/images/profilePic.png')
              }
            />
          </View>
          <Image
            source={require('../../../assets/logo/FrameEdit.png')}
            style={MyProfileStyles.frameEdit}
          />
        </View>
        <View>
          <Text style={MyProfileStyles.labels}>Name</Text>
          <View style={MyProfileStyles.titleView}>
            <Text style={MyProfileStyles.profileTitle}>
              {userInfo.userName}
            </Text>
          </View>
        </View>
        <View>
          <Text style={MyProfileStyles.labels}>Email</Text>
          <View style={MyProfileStyles.emailView}>
            <Text style={MyProfileStyles.profileEmail}>
              {userInfo.userEmail}
            </Text>
          </View>
        </View>
        <View style={MyProfileStyles.btnView}>
          <View>
            <Pressable style={MyProfileStyles.UpdatBtn}>
              <Text style={MyProfileStyles.UpdateText}>Udate Profile</Text>
            </Pressable>
          </View>
          <View>
            <Pressable
              style={MyProfileStyles.ResetBtn}
              onPress={() => navigation.navigate('ResetPassword')}>
              <Text style={MyProfileStyles.resetText}>Reset Password</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
