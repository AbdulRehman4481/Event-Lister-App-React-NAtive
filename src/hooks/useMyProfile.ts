import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import { setLoggedOut} from '../store/reducer/authReducer';
import {RootState} from '../store/store';


export default function useMyprofile() {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log('user', user);
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

  return {handleLogout,user};
}
