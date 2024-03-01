import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import ShowToast from '../components/showToast/ShowTost';
import {FIRE_BASE_COLLECTION} from '../constants/FirebaseCollection';
import {SigInUser} from '../constants/Types';
import useUserCheck from './useUserCheck';

const initialState = {
  email: '',
  password: '',
};
export default function useSignIn() {
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const {readUserProfile} = useUserCheck();

  const handleChange = (name: keyof SigInUser, value: string) => {
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
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;

        ShowToast('success', 'Email or Password is Incorrect');
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

  const handleGoogleSignIn = async () => {
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
          .collection(FIRE_BASE_COLLECTION.USERS)
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

  return {handleChange, handleSignIn, isProcessing, handleGoogleSignIn};
}
