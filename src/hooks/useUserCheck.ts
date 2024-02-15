import {useDispatch, useSelector} from 'react-redux';
import {setLoggedIn} from '../store/reducer/authReducer';
import {RootState} from '../store/store';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import { User } from '../types/Types';

export default function useUserCheck() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
      setIsLoading(true);
    try {
      const unsubscribe = auth().onAuthStateChanged(user => {
        if (user) {
          readUserProfile(user);
        } else {
          console.log("User isn't signed in");
        }
      });

      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const readUserProfile = async (user: User) => {
    try {
        setIsLoading(true)
      const docRef = firestore().collection('users').doc(user.uid);
      const docSnap = await docRef.get();

      if (docSnap.exists) {
        const userData = docSnap.data();
        const user = {...userData};
        dispatch(setLoggedIn({user}));
      } 
    }  finally {
        setIsLoading(false);
    }
  };
  return {readUserProfile, user, isLoading};
}
