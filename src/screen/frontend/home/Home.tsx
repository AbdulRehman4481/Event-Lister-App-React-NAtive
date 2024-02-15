import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, {useEffect} from 'react';
import HomeStyle from './HomeStyle';
import Filter from '../../../components/Filter/Filter';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamsLists} from '..';
import dayjs from 'dayjs';
import {
  fetchEvents,
  fetchTodayEvents,
} from '../../../store/reducer/eventFetchReducer';
import {RootState} from '../../../store/store';
import {useAppDispatch, useAppSelector} from '../../../store/storeHook';

interface DetailTicketScreenProp {
  navigation: StackNavigationProp<RootStackParamsLists, 'DetailTicket'>;
}
export default function Home({navigation}: DetailTicketScreenProp) {
  const dispatch = useAppDispatch();
  const allEvents = useAppSelector(
    (state: RootState) => state.events.eventData,
  );
  const todayEvent = useAppSelector(
    (state: RootState) => state.events.todayEvent,
  );
  const isLoading = useAppSelector(
    (state: RootState) => state.events.isLoading,
  );

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchTodayEvents());
  }, [dispatch]);

  return (
    <ScrollView style={HomeStyle.mainViewScroll}>
      <View style={HomeStyle.HomeMain}>
        <View>
          <Text style={HomeStyle.mainHeading}>Recent Events</Text>
        </View>
        <View>
          <Filter />
        </View>
      </View>
      <View>
        <View style={HomeStyle.inputView}>
          <Image source={require('../../../assets/logo/Search.png')} />
          <TextInput placeholder="Search" />
        </View>
      </View>
      <View style={HomeStyle.secondView}>
        <Text style={HomeStyle.onText}>On Going Events</Text>
        <Text style={HomeStyle.seeText}>See All</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator color={'#6F3DE9'} size={'large'} />
      ) : (
        <FlatList
          accessibilityElementsHidden
          scrollEnabled={false}
          nestedScrollEnabled
          data={todayEvent}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={HomeStyle.card}>
              <View style={HomeStyle.imageView}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('EventDetail', {
                      eventId: item.uid,
                    });
                  }}>
                  <ImageBackground
                    source={{uri: item.eventImage}}
                    style={HomeStyle.backgroundImage}
                    borderRadius={16}>
                    <Text style={HomeStyle.imageText}>{item.eventType}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              <View style={HomeStyle.cardDetail}>
                <View>
                  <Text style={HomeStyle.cardTitle}>{item.eventName}</Text>
                  <View style={HomeStyle.profileDetail}>
                    <Image
                      source={
                        item.createdBy.photoURL
                          ? {uri: item.createdBy.photoURL}
                          : require('../../../assets/images/profilePic.png')
                      }
                      style={HomeStyle.profileImage}
                    />
                    <Text style={HomeStyle.profileTitle}>
                      {item.createdBy.name}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('DetailTicket')}>
                  <Text style={HomeStyle.price}>${item.eventPrice}</Text>
                </TouchableOpacity>
              </View>
              <View style={HomeStyle.hr} />
              <Text style={HomeStyle.cardDate}>
                {dayjs(item.eventDate).format('YYYY/MM/DD')}
              </Text>
            </View>
          )}
        />
      )}

      {/* <ScrollView> */}
      <View style={[HomeStyle.secondView, HomeStyle.secondViewExtra]}>
        <Text style={HomeStyle.onText}>Other Events</Text>
        <Text style={HomeStyle.seeText}>See All</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator color={'#6F3DE9'} size={'large'} />
      ) : (
        <FlatList
          accessibilityElementsHidden
          scrollEnabled={false}
          nestedScrollEnabled
          data={allEvents}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={HomeStyle.smallCard}>
              <View>
                <Pressable
                  onPress={() => {
                    navigation.navigate('EventDetail', {
                      eventId: item.uid,
                    });
                  }}>
                  <Image
                    source={{uri: item.eventImage || 'hjdfjdgfhjgjhg'}}
                    style={HomeStyle.smallIamge}
                    borderRadius={16}
                  />
                </Pressable>
              </View>
              <View style={HomeStyle.smallCardDetail}>
                <View>
                  <Text>{item.eventType}</Text>
                  <Text style={HomeStyle.smallTitle}>
                    {item.eventName.length > 11
                      ? item.eventName.slice(0, 15)
                      : item.eventName}
                  </Text>
                  <Text>{dayjs(item.eventDate).format('YYYY-MM-DD')}</Text>
                </View>
                <Pressable onPress={() => navigation.navigate('DetailTicket')}>
                  <View style={{alignItems: 'flex-end'}}>
                    <Text style={HomeStyle.smallPrice}>${item.eventPrice}</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          )}
        />
      )}
    </ScrollView>
  );
}
