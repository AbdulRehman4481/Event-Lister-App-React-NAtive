import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {EventInfo, EventState} from '../../types/Types';

const initialState: EventState = {
  eventData: [],
  todayEvent: [],
  isLoading: false,
};

export const fetchEvents = createAsyncThunk<EventInfo[], void>(
  'events/fetchEvents',
  async () => {
    const querySnapshot = await firestore().collection('eventInfo').get();
    const events: EventInfo[] = [];

    querySnapshot.forEach(documentSnapshot => {
      const data = {...(documentSnapshot.data() as EventInfo)};
      data.eventDate = documentSnapshot.data().eventDate.toDate();
      events.push(data);
    });
    return events;
  },
);

export const fetchTodayEvents = createAsyncThunk<EventInfo[], void>(
  'events/fetchTodayEvents',
  async () => {
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
    );

    const querySnapshot = await firestore()
      .collection('eventInfo')
      .where('eventDate', '>=', startOfToday)
      .where('eventDate', '<', endOfDay)
      .limit(1)
      .get();

    const events: EventInfo[] = [];

    querySnapshot.forEach(documentSnapshot => {
      const data = {...(documentSnapshot.data() as EventInfo)};
      data.eventDate = documentSnapshot.data().eventDate.toDate();
      events.push(data);
    });

    return events;
  },
);

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEvents.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.eventData = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchEvents.rejected, state => {
        state.isLoading = false;
      })
      .addCase(fetchTodayEvents.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchTodayEvents.fulfilled, (state, action) => {
        state.todayEvent = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTodayEvents.rejected, state => {
        state.isLoading = false;
      });
  },
});

export default eventSlice.reducer;
