import firestore from '@react-native-firebase/firestore';
import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {FIRE_BASE_COLLECTION} from '../../constants/FirebaseCollection';
import {EventInfo, EventState} from '../../constants/Types';
const initialState: EventState = {
  eventData: [],
  todayEvent: [],
  isLoading: false,
};
export const fetchEvents = createAsyncThunk<EventInfo[], void>(
  'events/fetchEvents',
  async (_, {dispatch}) => {
    return new Promise<EventInfo[]>((resolve, reject) => {
      const unsubscribe = firestore()
        .collection(FIRE_BASE_COLLECTION.EVENTINFO)
        .orderBy('eventDate')
        .onSnapshot(querySnapshot => {
          const events: EventInfo[] = [];
          querySnapshot.forEach(documentSnapshot => {
            const data = {...(documentSnapshot.data() as EventInfo)};
            data.eventDate = documentSnapshot.data().eventDate.toDate();
            events.push(data);
          });
          dispatch(eventSlice.actions.fetchEventsFulfilled(events));
          resolve(events);
        });
    });
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
      .collection(FIRE_BASE_COLLECTION.EVENTINFO)
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
  reducers: {
    fetchEventsFulfilled: (state, action: PayloadAction<EventInfo[]>) => {
      state.eventData = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEvents.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.eventData = action.payload;
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
