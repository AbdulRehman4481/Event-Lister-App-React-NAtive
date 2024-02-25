import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { FIRE_BASE_COLLECTION } from '../constants/FirebaseCollection';
import { TicketInfo } from '../constants/Types';


export default function useTicketDetail(ticketId: string) {
  const [ticketDetails, setTicketDetails] = useState<TicketInfo>();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventDoc = await firestore()
          .collection(FIRE_BASE_COLLECTION.TICKETINFO)
          .where('eventId', '==', ticketId)
          .get();

        if (!eventDoc.empty) {
          const ticketData = eventDoc.docs[0].data() as TicketInfo;
          ticketData.eventDate = ticketData.eventDate.toDate()
          setTicketDetails(ticketData);
        } else {
          console.log('No matching document found for ticketId:', ticketId); // Log 2
        }
      } catch (error) {}
    };

    fetchEventDetails();
  }, [ticketId]);
  return {
    ticketDetails,
  };
}
