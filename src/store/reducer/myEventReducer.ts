import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {EventInfo, MyEventState} from '../../constants/Types';
import {FIRE_BASE_COLLECTION} from '../../constants/FirebaseCollection';

const initialState: MyEventState = {
  myEventData: [],
  isLoading: false,
};

export const fetchMyPostEvents = createAsyncThunk<EventInfo[], void>(
  'myPostEvents/fetchMyPostEvents',
  async () => {
    const userUid = auth().currentUser?.uid;
    if (!userUid) {
      console.log('User not authenticated');
      return [];
    }
    try {
      const querySnapshot = await firestore()
        .collection(FIRE_BASE_COLLECTION.EVENTINFO)
        .where('createdBy.uid', '==', userUid)
        .get();
      const events: EventInfo[] = [];
      querySnapshot.forEach(documentSnapshot => {
        const data = documentSnapshot.data() as EventInfo;
        data.eventDate = documentSnapshot.data().eventDate.toDate();
        events.push(data);
      });

      return events;
    } catch (error) {
      console.error('Error fetching my post events:', error);
      return [];
    }
  },
);

const myEventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMyPostEvents.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchMyPostEvents.fulfilled, (state, action) => {
        state.myEventData = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchMyPostEvents.rejected, (state, action) => {
        console.error('Error fetching my post events:', action.error);
        state.isLoading = false;
      });
  },
});

export default myEventSlice.reducer;
