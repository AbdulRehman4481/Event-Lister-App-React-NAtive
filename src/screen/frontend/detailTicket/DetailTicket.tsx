import dayjs from 'dayjs';
import React from 'react';
import {
  ImageBackground,
  Text,
  View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Images from '../../../constants/Images';
import useTicketDetail from '../../../hooks/useTicketDetail';
import DetailTicketStyles from './DetailTicketStyles';
export default function DetailTicket({route}: any) {
  const {ticketId} = route.params;
  const {ticketDetails} = useTicketDetail(ticketId);

  return (
    <>
      <ScrollView style={DetailTicketStyles.mainView}>
        <View style={DetailTicketStyles.secondView}>
          <View style={DetailTicketStyles.card}>
            <View style={DetailTicketStyles.imageView}>
              <ImageBackground
                source={
                  ticketDetails?.eventImage
                    ? {uri: ticketDetails.eventImage}
                    : Images.greyBackgroundLogo
                }
                style={DetailTicketStyles.backgroundImage}
                borderRadius={16}>
                <Text style={DetailTicketStyles.imageText}>
                  {(ticketDetails?.eventType ?? 'DefaultEvent')
                    .charAt(0)
                    .toUpperCase() +
                    (ticketDetails?.eventType ?? 'DefaultEvent')
                      .slice(1)
                      .toLowerCase()}
                </Text>
              </ImageBackground>
            </View>
            <View style={DetailTicketStyles.cardDetail}>
              <View style={DetailTicketStyles.eventView}>
                <Text style={DetailTicketStyles.cardTitle}>
                  {(ticketDetails?.eventName ?? 'DefaultEvent')
                    .charAt(0)
                    .toUpperCase() +
                    (ticketDetails?.eventName ?? 'DefaultEvent')
                      .slice(1)
                      .toLowerCase()}
                </Text>
                <Text style={DetailTicketStyles.price}>
                  ${ticketDetails?.eventPrice}
                </Text>
              </View>
              <View style={DetailTicketStyles.detailHeading}>
                <Text>Ticket Holder</Text>
                <Text>Date</Text>
              </View>
              <View style={DetailTicketStyles.profileDetail}>
                <Text style={DetailTicketStyles.profileTitle}>
                  {ticketDetails?.userName}
                </Text>
                <Text style={DetailTicketStyles.profileTitle}>
                  {dayjs(ticketDetails?.eventDate).format('DD MMM YYYY')}
                </Text>
              </View>
              <View style={{marginTop: 20}}>
                <Text>Location</Text>
                <Text style={DetailTicketStyles.profileTitle}>
                  {ticketDetails?.eventLocation}
                </Text>
              </View>
            </View>
          </View>
          <View style={DetailTicketStyles.thirdView}>
            <View style={DetailTicketStyles.circle} />
            <View style={DetailTicketStyles.divider} />
            <View style={DetailTicketStyles.circle2} />
          </View>
          <View style={DetailTicketStyles.fourthView}>
            <View style={DetailTicketStyles.barCode}></View>
          </View>
          <View>
            <Text style={{textAlign: 'center', marginVertical: 10}}>
              Scan Barcode
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
