import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FIRE_BASE_COLLECTION } from '../constants/FirebaseCollection';
import { CheckUser } from '../constants/Types';
import { setLoggedIn } from '../store/reducer/authReducer';
import { RootState } from '../store/store';



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

  const readUserProfile = async (user: CheckUser) => {
    try {
      setIsLoading(true);
      const docRef = firestore().collection(FIRE_BASE_COLLECTION.USERS).doc(user.uid);
      const docSnap = await docRef.get();

      if (docSnap.exists) {
        const userData = docSnap.data();
        const user = {...userData};
        dispatch(setLoggedIn({user}));
      }
    } finally {
      setIsLoading(false);
    }
  };
  return {readUserProfile, user, isLoading};
}
