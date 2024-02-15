import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamsLists} from '..';
import {colors} from '../../../components/constants/constants';
import firestore from '@react-native-firebase/firestore';
import Webview from 'react-native-webview';
import dayjs from 'dayjs';
import auth from '@react-native-firebase/auth';
import ShowToast from '../../../components/ShowToast/ShowTost';

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

interface TicketDataInfo {
  userId: string;
}

interface DetailTicketScreenProp {
  navigation: StackNavigationProp<RootStackParamsLists, 'DetailTicket'>;
}

export default function EventDetail({route}: any) {
  const {eventId} = route.params;
  // const {eventDetails} = useEventDetail(route);
  const [hasPurchasedTicket, setHasPurchasedTicket] = useState(false);
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

          // Check if the user has purchased a ticket for this event
          const currentUser = auth().currentUser;
          console.log("currentUser",currentUser?.uid)
          if (currentUser) {
            const userTickets = await firestore()
              .collection('usersTickets')
              .where('userId', '==', currentUser.uid)
              .where('eventId', '==', eventId)
              .get();
            console.log('userTickets', userTickets);
            // Check if there are any tickets found
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
  // useEffect(() => {
  //   const fetchEventDetails = async () => {
  //     try {
  //       const eventDoc = await firestore()
  //         .collection('eventInfo')
  //         .doc(eventId)
  //         .get();

  //       if (eventDoc.exists) {
  //         const eventData = eventDoc.data() as EventInfo;
  //         eventData.eventDate = eventData.eventDate.toDate();
  //         setEventDetails(eventData);
  //         console.log('eventDetails', eventDetails);
  //       }

  //     } catch (error) {
  //       console.error('Error fetching event details:', error);
  //     }
  //   };

  //   fetchEventDetails();
  // }, [eventId]);

  // useEffect(()=>{
  //   const currentUser =  auth().currentUser;
  //       if (currentUser) {
  //         const userTicketDoc =  firestore()
  //         .collection('userTickets')
  //         .where('userId', '==', currentUser.uid)
  //         .where('eventId', '==', eventId)
  //         .get()}

  //         if (!userTicketDoc.empty) {
  //           setHasPurchasedTicket(true);
  //         }
  // },[])

  const HandleBuyTicket = async () => {
    try {
      const currentUser = await auth().currentUser;
      if (currentUser) {
        const ticketData = {
          userId: currentUser.uid,
          userName: currentUser.displayName,
          userEmail: currentUser.email,
          eventId: route.params.eventId,
          eventName: eventDetails?.eventName,
          eventDate: eventDetails?.eventDate,
          eventImage: eventDetails?.eventImage,
          eventLocation: eventDetails?.eventLocation,
          eventMapUrl: eventDetails?.eventMapUrl,
          eventPrice: eventDetails?.eventPrice,
          eventType: eventDetails?.eventType,
        };

        await firestore().collection('usersTickets').add(ticketData);
      } else {
        console.log('User not authenticated.');
      }
    } catch (error) {
      console.error('Error buying ticket:', error);
    } finally {
      ShowToast('success', 'Ticket purchased successfully!');
    }
  };
  console.log('hasPurchasedTicket', hasPurchasedTicket);

  return (
    <ScrollView>
      <View>
        <View style={EventDetailStyle.card}>
          <View style={EventDetailStyle.imageView}>
            <ImageBackground
              source={
                eventDetails?.eventImage
                  ? {uri: eventDetails.eventImage}
                  : require('../../../assets/images/Grey_background.jpg')
              }
              style={EventDetailStyle.backgroundImage}
              borderRadius={16}></ImageBackground>
          </View>
          <View style={EventDetailStyle.cardDetail}>
            <View style={EventDetailStyle.eventView}>
              <Text style={EventDetailStyle.cardTitle}>
                {eventDetails?.eventName}
              </Text>
              <Text style={EventDetailStyle.price}>
                ${eventDetails?.eventPrice}
              </Text>
            </View>
            <View style={EventDetailStyle.detailsecond}>
              <Text style={EventDetailStyle.participants}>182</Text>
              <Text>Participant</Text>
              <Text style={EventDetailStyle.Date}>
                {dayjs(eventDetails?.eventDate).format('DD MMM YYYY')}
              </Text>
            </View>
            <View>
              <Text style={EventDetailStyle.aboutHeading}>About Event</Text>
              <Text style={EventDetailStyle.eventAbout}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Molestiae sequi debitis incidunt, animi, laboriosam quasi
                reprehenderit rerum
              </Text>
            </View>
            <View style={EventDetailStyle.profileDetail}>
              <Image
                source={
                  eventDetails?.createdBy.photoURL
                    ? {uri: eventDetails?.createdBy.photoURL}
                    : require('../../../assets/images/profilePic.png')
                }
                style={EventDetailStyle.profileImage}
              />
              <Text style={EventDetailStyle.profileTitle}>
                {eventDetails?.createdBy.name}
              </Text>
            </View>
            <View>
              <Text style={EventDetailStyle.mapText}>Map</Text>
              <View style={EventDetailStyle.mapView}>
                <Webview
                  source={{
                    html: `<iframe  src="${eventDetails?.eventMapUrl}" width=100% height=100% style="border:0; border-radius: 60px;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade "></iframe>`,
                  }}
                />
              </View>
            </View>
            <View>
              {hasPurchasedTicket ? (
                <Pressable
                  style={EventDetailStyle.BuyBtn}
                  onPress={HandleBuyTicket}>
                  <Text style={EventDetailStyle.BuyText}>
                    Show Ticket Detail
                  </Text>
                </Pressable>
              ) : (
                <Pressable
                  style={EventDetailStyle.BuyBtn}
                  onPress={HandleBuyTicket}>
                  <Text style={EventDetailStyle.BuyText}>Buy Ticket</Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const EventDetailStyle = StyleSheet.create({
  BuyText: {
    fontWeight: '600',
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  BuyBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 50,
  },
  mapText: {
    fontWeight: '600',
    fontSize: 16,
    color: 'black',
    marginVertical: 7,
  },
  mapView: {
    width: 335,
    height: 140,
    backgroundColor: colors.secondry,
    borderRadius: 20,
    marginVertical: 5,
  },
  profileTitle: {
    color: 'black',
    marginHorizontal: 10,
  },
  profileDetail: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    marginTop: 5,
    marginRight: 5,
    height: 30,
    width: 30,
    borderRadius: 50,
  },
  eventAbout: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
  },
  aboutHeading: {
    fontWeight: '600',
    fontSize: 12,
    color: 'black',
    lineHeight: 15.3,
  },
  participants: {
    fontWeight: '600',
    color: 'black',
    marginHorizontal: 6,
  },
  Date: {
    marginHorizontal: 6,
  },
  detailsecond: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 18,
    color: 'black',
  },
  card: {
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
    flex: 1,
  },
  backgroundImage: {
    backgroundColor: 'white',
    flex: 1,
    resizeMode: 'cover',
    height: 180,
    width: 335,
  },
  cardDetail: {
    padding: 5,
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: 30,
  },

  price: {
    color: '#6F3DE9',
    backgroundColor: 'rgba(146, 146, 146, 0.19)',
    padding: 6,
    borderRadius: 15,
  },
  eventView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 32,
    width: 302,
  },
});
