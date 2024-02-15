import {configureStore} from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';
import eventFetchReducer from './reducer/eventFetchReducer';
import searchEventReducer from './reducer/searchEventReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventFetchReducer,
    searchEvents: searchEventReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
