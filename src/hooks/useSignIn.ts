import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import useUserCheck from './useUserCheck';
import { User } from '../types/Types';


const initialState = {
  email: '',
  password: '',
};
export default function useSignIn() {
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const {readUserProfile} = useUserCheck();
  

  const handleChange = (name: keyof User, value: string) => {
    setState(s => ({...s, [name]: value}));
  };

  const handleSignIn = () => {
    const {email, password} = state;
    setIsProcessing(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        readUserProfile(user);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '453116556250-nbi7332o8kdi0p0ebs4agmfe6pblfknb.apps.googleusercontent.com',
    });
  }, []);

  const handleGoogleSignin = async () => {
    setIsProcessing(true);
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await auth().signInWithCredential(googleCredential);
      const currentUser = auth().currentUser;
      if (currentUser) {
        const userData = {
          name: currentUser.displayName ?? '',
          email: currentUser.email ?? '',
          uid: currentUser.uid,
          photo: currentUser.photoURL ?? '',
          dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
        };
        const user = {...currentUser};
        await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .set(userData);
        readUserProfile(user);
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      Alert.alert(
        'Google Sign-In Error',
        'An error occurred during Google sign-in. Please try again later.',
      );
    }
    setIsProcessing(false);
  };

  return {handleChange, handleSignIn, isProcessing, handleGoogleSignin};
}
