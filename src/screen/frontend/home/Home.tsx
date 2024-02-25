import dayjs from 'dayjs';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Filter from '../../../components/filter/Filter';
import { colors } from '../../../constants/Colors';
import Images from '../../../constants/Images';
import { DetailTicketScreenProp } from '../../../constants/Types';
import useHome from '../../../hooks/useHome';
import HomeStyle from './HomeStyle';


export default function Home({navigation}: DetailTicketScreenProp) {
  const {
    sortedEventsGet,
    isLoading,
    todayEvent,
    allEvents,
    filterData,
    showSorted,
    setShowSorted,
    searchQuery,
    setSearchQuery,
  } = useHome();

  return (
    <ScrollView style={HomeStyle.mainViewScroll}>
      <View>
        <View style={HomeStyle.HomeMain}>
          <TouchableOpacity onPress={() => setShowSorted(false)}>
            <Text style={HomeStyle.mainHeading}>Recent Events</Text>
          </TouchableOpacity>
          <View>
            <Filter onFilterChange={sortedEventsGet} />
          </View>
        </View>
        <View style={HomeStyle.inputView}>
          <Image source={Images.searchLogo} />
          <TextInput
            placeholder="Search"
            onChangeText={text => setSearchQuery(text)}
            value={searchQuery}
          />
        </View>
        {searchQuery !== '' ? (
          <View>
            {isLoading ? (
              <ActivityIndicator color={colors.primary} size={'large'} />
            ) : (
              <FlatList
                accessibilityElementsHidden
                scrollEnabled={false}
                nestedScrollEnabled
                data={filterData} 
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
                          <Text style={HomeStyle.imageText}>
                            {item.eventType.charAt(0).toUpperCase() +
                              item.eventType.slice(1).toLowerCase()}
                          </Text>
                        </ImageBackground>
                      </TouchableOpacity>
                    </View>
                    <View style={HomeStyle.cardDetail}>
                      <View>
                        <Text style={HomeStyle.cardTitle}>
                          {item.eventName.slice(0, 15).charAt(0).toUpperCase() +
                            item.eventName.slice(1).toLowerCase()}
                        </Text>
                        <View style={HomeStyle.profileDetail}>
                          <Image
                            source={
                              item.createdBy.photoURL
                                ? {uri: item.createdBy.photoURL}
                                : Images.profileLogo
                            }
                            style={HomeStyle.profileImage}
                          />
                          <Text style={HomeStyle.profileTitle}>
                            {item.createdBy.name}
                          </Text>
                        </View>
                      </View>

                      <Text style={HomeStyle.price}>${item.eventPrice}</Text>
                    </View>
                    <View style={HomeStyle.hr} />
                    <Text style={HomeStyle.cardDate}>
                      {dayjs(item.eventDate).format('YYYY/MM/DD')}
                    </Text>
                  </View>
                )}
              />
            )}
          </View>
        ) : (
          <>
            {showSorted ? (
              <>
                {isLoading ? (
                  <ActivityIndicator color={colors.primary} size={'large'} />
                ) : (
                  <FlatList
                    accessibilityElementsHidden
                    scrollEnabled={false}
                    nestedScrollEnabled
                    data={filterData}
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
                              <Text style={HomeStyle.imageText}>
                                {item.eventType.charAt(0).toUpperCase() +
                                  item.eventType.slice(1).toLowerCase()}
                              </Text>
                            </ImageBackground>
                          </TouchableOpacity>
                        </View>
                        <View style={HomeStyle.cardDetail}>
                          <View>
                            <Text style={HomeStyle.cardTitle}>
                              {item.eventName
                                .slice(0, 15)
                                .charAt(0)
                                .toUpperCase() +
                                item.eventName.slice(1).toLowerCase()}
                            </Text>
                            <View style={HomeStyle.profileDetail}>
                              <Image
                                source={
                                  item.createdBy.photoURL
                                    ? {uri: item.createdBy.photoURL}
                                    : Images.profileLogo
                                }
                                style={HomeStyle.profileImage}
                              />
                              <Text style={HomeStyle.profileTitle}>
                                {item.createdBy.name}
                              </Text>
                            </View>
                          </View>

                          <Text style={HomeStyle.price}>
                            ${item.eventPrice}
                          </Text>
                        </View>
                        <View style={HomeStyle.hr} />
                        <Text style={HomeStyle.cardDate}>
                          {dayjs(item.eventDate).format('YYYY/MM/DD')}
                        </Text>
                      </View>
                    )}
                  />
                )}
              </>
            ) : (
              <View>
                <View style={HomeStyle.secondView}>
                  <Text style={HomeStyle.onText}>On Going Events</Text>
                  <Text style={HomeStyle.seeText}>See All</Text>
                </View>
                {isLoading ? (
                  <ActivityIndicator color={colors.primary} size={'large'} />
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
                              <Text style={HomeStyle.imageText}>
                                {item.eventType.charAt(0).toUpperCase() +
                                  item.eventType.slice(1).toLowerCase()}
                              </Text>
                            </ImageBackground>
                          </TouchableOpacity>
                        </View>
                        <View style={HomeStyle.cardDetail}>
                          <View>
                            <Text style={HomeStyle.cardTitle}>
                              {item.eventName
                                .slice(0, 15)
                                .charAt(0)
                                .toUpperCase() +
                                item.eventName.slice(1).toLowerCase()}
                            </Text>
                            <View style={HomeStyle.profileDetail}>
                              <Image
                                source={
                                  item.createdBy.photoURL
                                    ? {uri: item.createdBy.photoURL}
                                    : Images.profileLogo
                                }
                                style={HomeStyle.profileImage}
                              />
                              <Text style={HomeStyle.profileTitle}>
                                {item.createdBy.name}
                              </Text>
                            </View>
                          </View>

                          <Text style={HomeStyle.price}>
                            ${item.eventPrice}
                          </Text>
                        </View>
                        <View style={HomeStyle.hr} />
                        <Text style={HomeStyle.cardDate}>
                          {dayjs(item.eventDate).format('YYYY/MM/DD')}
                        </Text>
                      </View>
                    )}
                  />
                )}

                <View style={[HomeStyle.secondView, HomeStyle.secondViewExtra]}>
                  <Text style={HomeStyle.onText}>Other Events</Text>
                  <Text style={HomeStyle.seeText}>See All</Text>
                </View>
                {isLoading ? (
                  <ActivityIndicator color={colors.primary} size={'large'} />
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
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('EventDetail', {
                                eventId: item.uid,
                              });
                            }}>
                            <Image
                              source={{
                                uri:
                                  item.eventImage || Images.greyBackgroundLogo,
                              }}
                              style={HomeStyle.smallImage}
                              borderRadius={16}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={HomeStyle.smallCardDetail}>
                          <View>
                            <Text style={HomeStyle.smallType}>
                              {item.eventType.charAt(0).toUpperCase() +
                                item.eventType.slice(1).toLowerCase()}
                            </Text>
                            <Text style={HomeStyle.smallTitle}>
                              {item.eventName.length > 11
                                ? item.eventName
                                    .slice(0, 15)
                                    .charAt(0)
                                    .toUpperCase() +
                                  item.eventName.slice(1).toLowerCase()
                                : item.eventName.charAt(0).toUpperCase() +
                                  item.eventName.slice(1).toLowerCase()}
                            </Text>
                            <Text style={HomeStyle.smallType}>
                              {dayjs(item.eventDate).format('YYYY-MM-DD')}
                            </Text>
                          </View>

                          <View style={{alignItems: 'flex-end'}}>
                            <Text style={HomeStyle.smallPrice}>
                              ${item.eventPrice}
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}
                  />
                )}
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}
