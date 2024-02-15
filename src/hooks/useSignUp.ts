import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {setLoggedIn, setLoggedOut} from '../store/reducer/authReducer';

interface State {
  name: string;
  email: string | null;
  password: string;
  photo: string;
  uid: string;
}

const initialUser: State = {
  name: '',
  email: '',
  password: '',
  photo: '',
  uid: '',
};
export default function useSignUp() {
  const [state, setState] = useState(initialUser);
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (name: keyof State, value: string) => {
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSignUp = () => {
    let {email, password, name} = state;
    if (!email) {
      Alert.alert('Please enter your email');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Password must be 6 chars');
      return;
    }
    setIsProcessing(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log(user);
        createUserProfile(user, name);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
    setIsProcessing(false);
  };

  const createUserProfile = (user: FirebaseAuthTypes.User, name: string) => {
    let formData = {
      name: name,
      email: user.email,
      uid: user.uid,
      dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
    };
    firestore()
      .collection('users')
      .doc(user.uid)
      .set(formData)
      .then(() => {
        console.log('User added!');
        dispatch(setLoggedIn({user}));
      })
      .catch(err => {
        console.error(err);
      });
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '453116556250-nbi7332o8kdi0p0ebs4agmfe6pblfknb.apps.googleusercontent.com',
    });
  }, []);

  const onGoogleButtonPress = async () => {
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
        const user = {...userData};
        await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .set(userData);
        dispatch(setLoggedIn({user}));
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

  return {handleChange, handleSignUp, isProcessing, onGoogleButtonPress};
}
