import {
  View,
  Text,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamsLists} from '..';
import {ScrollView} from 'react-native-gesture-handler';
import DetailTicketStyles from './DetailTicketStyles';

interface DetailTicketScreenProp {
  navigation: StackNavigationProp<RootStackParamsLists, 'DetailTicket'>;
}

export default function DetailTicket({navigation}: DetailTicketScreenProp) {
  return (
    <ScrollView style={DetailTicketStyles.mainView}>
      <View style={DetailTicketStyles.secondView}>
        <View style={DetailTicketStyles.card}>
          <View style={DetailTicketStyles.imageView}>
            <ImageBackground
              source={require('../../../assets//images/audience.jpg')}
              style={DetailTicketStyles.backgroundImage}
              borderRadius={16}>
              <Text style={DetailTicketStyles.imageText}>Concert</Text>
            </ImageBackground>
          </View>
          <View style={DetailTicketStyles.cardDetail}>
            <View style={DetailTicketStyles.eventView}>
              <Text style={DetailTicketStyles.cardTitle}>Radiohead Concert</Text>
              <Text style={DetailTicketStyles.price}>$400</Text>
            </View>
            <View style={DetailTicketStyles.detailheading}>
              <Text>Ticket Holder</Text>
              <Text>Date</Text>
            </View>
            <View style={DetailTicketStyles.profileDetail}>
              <Text style={DetailTicketStyles.profileTitle}>Radiohead Concert</Text>
              <Text style={DetailTicketStyles.profileTitle}>22 Oct 2023 8:00 Am</Text>
            </View>
            <View style={{marginTop: 20}}>
              <Text>Location</Text>
              <Text style={DetailTicketStyles.profileTitle}>
                Gojra , 281 Dawakhari
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
          <Text style={{textAlign:"center",marginVertical:10}} >Scan Barcode</Text>
        </View>
      </View>
    </ScrollView>
  );
}
