import dayjs from 'dayjs';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Images from '../../../constants/Images';
import { DiscoveryScreenProp } from '../../../constants/Types';
import useDiscovery from '../../../hooks/useDiscovery';
import DiscoveryStyle from './DiscoveryStyles';

export default function Discovery({navigation}: DiscoveryScreenProp) {
  const {searchQuery, isLoading, myPostEvents, filterData, setSearchQuery} =
    useDiscovery();
  return (
    <ScrollView>
      <View>
        <Text style={DiscoveryStyle.mainHeading}>My Posting Events</Text>
      </View>
      <View style={DiscoveryStyle.inputView}>
        <Image source={Images.searchLogo} />
        <TextInput
          placeholder="Search"
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        {isLoading ? (
          <ActivityIndicator color={'purple'} size={'large'} />
        ) : (
          <>
            {searchQuery ? (
              <>
                {filterData ? (
                  <FlatList
                    accessibilityElementsHidden
                    scrollEnabled={false}
                    nestedScrollEnabled
                    data={filterData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                      <View style={DiscoveryStyle.smallCard}>
                        <Image
                          source={{uri: item.eventImage}}
                          style={DiscoveryStyle.smallImage}
                          borderRadius={16}
                        />
                        <View style={DiscoveryStyle.smallCardDetail}>
                          <View>
                            <Text>
                              {item.eventType.charAt(0).toUpperCase() +
                                item.eventType.slice(1).toLowerCase()}
                            </Text>
                            <Text style={DiscoveryStyle.smallTitle}>
                              {item.eventName.length > 11
                                ? item.eventName
                                    .slice(0, 15)
                                    .charAt(0)
                                    .toUpperCase() +
                                  item.eventName.slice(1).toLowerCase()
                                : item.eventName}
                            </Text>
                            <Text>
                              {dayjs(item.eventDate).format('YYYY-MM-DD')}
                            </Text>
                          </View>
                          <View style={{alignItems: 'flex-end'}}>
                            <Text style={DiscoveryStyle.smallPrice}>
                              ${item.eventPrice}
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}
                  />
                ) : (
                  <Text>No results found.</Text>
                )}
              </>
            ) : (
              <>
                {myPostEvents.length > 0 ? (
                  <FlatList
                    accessibilityElementsHidden
                    scrollEnabled={false}
                    nestedScrollEnabled
                    data={myPostEvents}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                      <View style={DiscoveryStyle.smallCard}>
                        <Image
                          source={{uri: item.eventImage}}
                          style={DiscoveryStyle.smallImage}
                          borderRadius={16}
                        />
                        <View style={DiscoveryStyle.smallCardDetail}>
                          <View>
                            <Text>
                              {item.eventType.charAt(0).toUpperCase() +
                                item.eventType.slice(1).toLowerCase()}
                            </Text>
                            <Text style={DiscoveryStyle.smallTitle}>
                              {item.eventName.length > 11
                                ? item.eventName
                                    .slice(0, 15)
                                    .charAt(0)
                                    .toUpperCase() +
                                  item.eventName.slice(1).toLowerCase()
                                : item.eventName.charAt(0).toUpperCase() +
                                  item.eventName.slice(1).toLowerCase()}
                            </Text>
                            <Text>
                              {dayjs(item.eventDate).format('YYYY-MM-DD')}
                            </Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'space-between',
                              alignItems: 'flex-end',
                            }}>
                            <Text style={DiscoveryStyle.smallPrice}>
                              ${item.eventPrice}
                            </Text>
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate('EditEvents', {
                                  eventId: item.uid,
                                });
                              }}>
                              <Text style={DiscoveryStyle.smallPrice}>
                                Edit
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    )}
                  />
                ) : (
                  <Text>No Event Add By current user</Text>
                )}
              </>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}
