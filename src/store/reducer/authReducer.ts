import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, CheckUser } from '../../constants/Types';

const initialState: AuthState = {
  isAuth: false,
  user: null,
  isAppLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<{user: CheckUser}>) => {
      state.isAuth = true;
      state.user = {
        name: action.payload.user.name,
        email: action.payload.user.email,
        photo: action.payload.user.photo,
        uid: action.payload.user.uid,
      };
    },
    setLoggedOut: state => {
      state.isAuth = false;
      state.user = null;
      state.isAppLoading = false;
    },
  },
});

export const {setLoggedIn, setLoggedOut} = authSlice.actions;
export default authSlice.reducer;
