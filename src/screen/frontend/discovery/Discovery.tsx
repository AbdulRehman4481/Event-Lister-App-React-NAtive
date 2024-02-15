import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import dayjs from 'dayjs';
import useDiscovery from '../../../hooks/useDiscovery';
import DiscoveryStyle from './DiscoveryStyles';

const Discovery: React.FC = () => {
  const {searchQuery, isLoading, myPostEvents, searchEvents, setSearchQuery} =
    useDiscovery();

  return (
    <ScrollView style={DiscoveryStyle.main}>
      <View style={DiscoveryStyle.secondView}>
        <Text style={DiscoveryStyle.mainHeading}>My Posting Events</Text>
      </View>
      <View style={DiscoveryStyle.inputView}>
        <Image source={require('../../../assets/logo/Search.png')} />
        <TextInput
          placeholder="Search"
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        {isLoading && <ActivityIndicator color={'purple'} size={'large'} />}
        {searchQuery ? (
          <>
            {searchEvents.length > 0 ? (
              <FlatList
                accessibilityElementsHidden
                scrollEnabled={false}
                nestedScrollEnabled
                data={searchEvents}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View style={DiscoveryStyle.smallCard}>
                    <Image
                      source={{uri: item.eventImage}}
                      style={DiscoveryStyle.smallIamge}
                      borderRadius={16}
                    />
                    <View style={DiscoveryStyle.smallCardDetail}>
                      <View>
                        <Text>{item.eventType}</Text>
                        <Text style={DiscoveryStyle.smallTitle}>
                          {item.eventName.length > 11
                            ? item.eventName.slice(0, 15)
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
            {
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
                      style={DiscoveryStyle.smallIamge}
                      borderRadius={16}
                    />
                    <View style={DiscoveryStyle.smallCardDetail}>
                      <View>
                        <Text>{item.eventType}</Text>
                        <Text style={DiscoveryStyle.smallTitle}>
                          {item.eventName.length > 11
                            ? item.eventName.slice(0, 15)
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
            }
          </>
        )}
      </View>
    </ScrollView>
  );
};



export default Discovery;
