import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {useEffect, useState} from 'react';
import {useAppDispatch} from '../store/storeHook';
import {
  fetchMyPostEvents,
  fetchSeachEvents,
} from '../store/reducer/searchEventReducer';
import firestore from '@react-native-firebase/firestore';

interface EventInfo {
    eventName: string;
    eventPrice: number;
    eventType: string;
    eventLocation: string;
    eventMapUrl: string;
    uid: string;
    eventDate: any;
    eventImage: string;
    createdBy: {
      email: string;
      name: string;
      photoURL: string;
    };
  }

export default function useEventDetail({route}:any) {
    const {eventId} = route.params;
    const [eventDetails, setEventDetails] = useState<EventInfo>();
    console.log('eventId', eventId);
    useEffect(() => {
      const fetchEventDetails = async () => {
        try {
          const eventDoc = await firestore()
            .collection('eventInfo')
            .doc(eventId)
            .get();
  
          if (eventDoc.exists) {
            const eventData = eventDoc.data() as EventInfo;
            eventData.eventDate = eventData.eventDate.toDate();
            setEventDetails(eventData);
          }
        } catch (error) {
          console.error('Error fetching event details:', error);
        }
      };
  
      fetchEventDetails();
    }, [eventId]);
  
  return {eventDetails};
}
