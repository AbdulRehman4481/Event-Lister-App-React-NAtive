import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import ShowToast from '../components/showToast/ShowTost';
import { FIRE_BASE_COLLECTION } from '../constants/FirebaseCollection';
import { DetailUserData, EditEventInfo } from '../constants/Types';

export default function useEventDetail(eventId: string) {
  const [hasPurchasedTicket, setHasPurchasedTicket] = useState(false);
  const [eventDetails, setEventDetails] = useState<EditEventInfo>();
  const [eventUser, setEventUser] = useState<DetailUserData>();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventDoc = await firestore()
          .collection(FIRE_BASE_COLLECTION.EVENTINFO)
          .doc(eventId)
          .get();

        if (eventDoc.exists) {
          const eventData = eventDoc.data() as EditEventInfo;
          eventData.eventDate = eventData.eventDate.toDate();
          setEventDetails(eventData);

          const eventUserId = eventData?.createdBy?.uid || '';
          const userQuerySnapshot = await firestore()
            .collection(FIRE_BASE_COLLECTION.USERS)
            .where('uid', '==', eventUserId)
            .get();
          const eventUser = userQuerySnapshot.docs[0].data();
          setEventUser(eventUser as DetailUserData);

          const currentUser = auth().currentUser;
          if (currentUser) {
            const userTickets = await firestore()
              .collection(FIRE_BASE_COLLECTION.TICKETINFO)
              .where('userId', '==', currentUser.uid)
              .where('eventId', '==', eventId)
              .get();
            if (!userTickets.empty) {
              setHasPurchasedTicket(true);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const HandleBuyTicket = async () => {
    try {
      const currentUser = await auth().currentUser;
      if (currentUser) {
        const ticketData = {
          userId: currentUser.uid,
          userName: currentUser.displayName,
          userEmail: currentUser.email,
          eventId: eventId,
          eventName: eventDetails?.eventName,
          eventDate: eventDetails?.eventDate,
          eventImage: eventDetails?.eventImage,
          eventLocation: eventDetails?.eventLocation,
          eventMapUrl: eventDetails?.eventMapUrl,
          eventPrice: eventDetails?.eventPrice,
          eventType: eventDetails?.eventType,
        };

        await firestore()
          .collection(FIRE_BASE_COLLECTION.TICKETINFO)
          .add(ticketData);
      } else {
        console.log('User not authenticated.');
      }
    } catch (error) {
      console.error('Error buying ticket:', error);
    } finally {
      setHasPurchasedTicket(true);
      ShowToast('success', 'Ticket purchased successfully!');
    }
  };

  const openMap = () => {
    Linking.openURL(eventDetails?.eventMapUrl || '');
  };

  return {
    openMap,
    HandleBuyTicket,
    eventDetails,
    setEventDetails,
    setHasPurchasedTicket,
    hasPurchasedTicket,
    eventUser,
  };
}
