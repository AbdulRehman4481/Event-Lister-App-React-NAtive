import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {EventInfo, SearchEventState} from '../../types/Types';

const initialState: SearchEventState = {
  eventData: [],
  myEventData: [],
  isLoading: false,
};

export const fetchSeachEvents = createAsyncThunk<EventInfo[], string>(
  'searchevents/fetchsearchEvents',
  async (searchQuery: string) => {
    const querySnapshot = await firestore()
      .collection('eventInfo')
      .where('eventName', '>=', searchQuery)
      .get();

    const events: EventInfo[] = [];
    querySnapshot.forEach(documentSnapshot => {
      const data = documentSnapshot.data() as EventInfo;
      data.eventDate = documentSnapshot.data().eventDate.toDate();
      events.push(data);
    });
    return events;
  },
);

export const fetchMyPostEvents = createAsyncThunk<EventInfo[], void>(
  'myPostEvents/fetchMyPostEvents',
  async () => {
    console.log('Fetching my post events...');
    const userUid = auth().currentUser?.uid;

    if (!userUid) {
      console.log('User not authenticated');
      return [];
    }

    try {
      const querySnapshot = await firestore()
        .collection('eventInfo')
        .where('createdBy.uid', '==', userUid)
        .get();
      const events: EventInfo[] = [];
      querySnapshot.forEach(documentSnapshot => {
        console.log('Event document:', documentSnapshot.data());
        const data = documentSnapshot.data() as EventInfo;
        data.eventDate = documentSnapshot.data().eventDate.toDate();
        events.push(data);
      });

      console.log('Fetched events:', events);
      return events;
    } catch (error) {
      console.error('Error fetching my post events:', error);
      return [];
    }
  },
);

const searchEventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSeachEvents.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchSeachEvents.fulfilled, (state, action) => {
        state.eventData = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSeachEvents.rejected, state => {
        state.isLoading = false;
      })
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

export default searchEventSlice.reducer;
