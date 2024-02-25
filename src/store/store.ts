import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';
import eventFetchReducer from './reducer/eventFetchReducer';
import myEventReducer from './reducer/myEventReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventFetchReducer,
    myEvents: myEventReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
