import { StackNavigationProp } from '@react-navigation/stack';
import dayjs from 'dayjs';
import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';
import { RootStackParamsLists } from '..';
import Images from '../../../constants/Images';
import useEventDetail from '../../../hooks/useEventDetail';
import EventDetailStyle from './EventDetailStyle';
import { DetailTicketScreenProp } from '../../../constants/Types';


export default function EventDetail({
  route,
  navigation,
}: DetailTicketScreenProp) {
  const {eventId} = route.params;

  const {
    openMap,
    HandleBuyTicket,
    eventDetails,
    hasPurchasedTicket,
    eventUser
  } = useEventDetail(eventId);

  return (
    <ScrollView >
      <View>
        <View style={EventDetailStyle.card}>
          <View style={EventDetailStyle.imageView}>
            <ImageBackground
              source={
                eventDetails?.eventImage
                  ? {uri: eventDetails.eventImage}
                  : Images.greyBackgroundLogo
              }
              style={EventDetailStyle.backgroundImage}
              borderRadius={16}></ImageBackground>
          </View>
          <View style={EventDetailStyle.cardDetail}>
            <View style={EventDetailStyle.eventView}>
              {eventDetails?.eventName && (
                <Text style={EventDetailStyle.cardTitle}>
                  {eventDetails.eventName.charAt(0).toUpperCase() +
                    eventDetails.eventName.slice(1).toLowerCase()}
                </Text>
              )}
              <Text style={EventDetailStyle.price}>
                ${eventDetails?.eventPrice}
              </Text>
            </View>
            <View style={EventDetailStyle.detailSecond}>
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
                  eventUser?.photo
                    ? {uri: eventUser?.photo}
                    : Images.profileLogo
                }
                style={EventDetailStyle.profileImage}
              />
              <Text style={EventDetailStyle.profileTitle}>
                {eventUser?.name}
              </Text>
            </View>
            <View>
              <Text style={EventDetailStyle.mapText}>Map</Text>
              <View style={EventDetailStyle.mapView}>
                <View style={{flex: 1}}>
                  <WebView
                    source={{
                      html: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d435519.2274176662!2d74.00472264497051!3d31.483103659723337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1708342896793!5m2!1sen!2s" width="100%" height="100%" style="border:0; border-radius: 50px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
                    }}
                  />
                  <TouchableOpacity style={EventDetailStyle.mapLogo} onPress={openMap}>
                    <Image
                      source={Images.directMapLogo}
                      height={35}
                      width={110}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View>
              {hasPurchasedTicket ? (
                <TouchableOpacity
                  style={EventDetailStyle.BuyBtn}
                  onPress={() => {
                    navigation.navigate('DetailTicket', {
                      ticketId: eventDetails?.uid,
                    });
                  }}>
                  <Text style={EventDetailStyle.BuyText}>
                    Show Ticket Detail
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={EventDetailStyle.BuyBtn}
                  onPress={HandleBuyTicket}>
                  <Text style={EventDetailStyle.BuyText}>Buy Ticket</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
