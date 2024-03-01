import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import ShowToast from '../components/showToast/ShowTost';
import {setLoggedOut} from '../store/reducer/authReducer';
import {RootState} from '../store/store';

export default function useMyProfile() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [userInfo, setUserInfo] = useState({
    userName: user?.name,
    userEmail: user?.email,
    userPhoto: user?.photo,
  });

  const dispatch = useDispatch();
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(setLoggedOut());
      })
      .catch(err => {
        console.error('Error signing out:', err);
      });
  };

  useEffect(() => {
    const userName = user?.name || 'Unknown';
    const userEmail = user?.email || 'Unknown';
    const userPhoto = user?.photo || '';
    setUserInfo({userName, userEmail, userPhoto});
  }, [user]);

  const update = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        await currentUser.updateProfile({
          displayName: userInfo.userName,
          photoURL: userInfo.userPhoto,
        });

        await firestore().collection('users').doc(currentUser.uid).update({
          name: userInfo.userName,
          photo: userInfo.userPhoto,
        });

        ShowToast('success', 'Profile updated');
      } else {
        console.error('User not authenticated. Unable to update profile.');
        ShowToast('error', 'Failed to update profile. User not authenticated.');
      }
    } catch (err) {
      console.error('Error updating user profile:', err);
      ShowToast('error', 'Failed to update profile. Please try again.');
    }
  };

  const openCamera = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    const uri = result?.assets?.[0]?.uri;
    if (uri) {
      setUserInfo({...userInfo, userPhoto: uri});
    } else {
      console.warn('Image selection was cancelled or failed.');
    }
  };

  const handleForgetPassword = () => {
    const userInfoEmail = user?.email || '';
    auth()
      .sendPasswordResetEmail(userInfoEmail)
      .then(() => {
        ShowToast('success', 'Password reset Email sent');
      });
  };

  return {
    handleLogout,
    user,
    update,
    handleForgetPassword,
    userInfo,
    openCamera,
    setUserInfo,
  };
}
