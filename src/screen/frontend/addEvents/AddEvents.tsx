import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AddEventsStyles from './AddEventsStyles';
import useAddEvents from '../../../hooks/useAddEvents';
import DatePicker from 'react-native-date-picker';

export default function AddEvents() {
  const {
    isloading,
    eventImage,
    openCamera,
    handleChange,
    eventInfo,
    handlePostEvent,
    setOpen,
    open,
    setEventInfo,
  } = useAddEvents();

  return (
    <ScrollView style={AddEventsStyles.mainView}>
      <>
        <Text style={AddEventsStyles.eventHeading}>Create An Event</Text>
      </>
      <>
        <Text style={AddEventsStyles.labels}>Event Name</Text>
        <TextInput
          style={AddEventsStyles.inputs}
          placeholder="Event Name"
          keyboardType="default"
          onChangeText={val => {
            handleChange('eventName', val);
          }}
          value={eventInfo.eventName}
        />
      </>
      <>
        <Text style={AddEventsStyles.labels}>Ticket Price</Text>
        <TextInput
          style={AddEventsStyles.inputs}
          placeholder="$0.00"
          keyboardType="number-pad"
          onChangeText={val => {
            handleChange('eventPrice', val);
          }}
          value={eventInfo.eventPrice.toString()}
        />
      </>
      <View>
        <Text style={AddEventsStyles.labels}>Event Date And Time</Text>

        <Pressable style={AddEventsStyles.inputs} onPress={() => setOpen(true)}>
          <Text>{eventInfo.eventDate.toDateString()}</Text>
          {open && (
            <DatePicker
              modal
              mode={'date'}
              open={open}
              date={eventInfo.eventDate}
              onConfirm={date => {
                setOpen(false);
                setEventInfo({...eventInfo, eventDate: date});
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          )}
        </Pressable>
      </View>
      <View>
        <Text style={AddEventsStyles.labels}>Event Type</Text>

        <Picker
          selectedValue={eventInfo.eventType}
          onValueChange={(itemValue, itemIndex) =>
            handleChange('eventType', itemValue)
          }
          style={{backgroundColor: 'white'}}>
          <Picker.Item label="Select Event Type" />
          <Picker.Item label="Exhibition" value="Exhibition" />
          <Picker.Item label="Workshop" value="Workshop" />
          <Picker.Item label="Conference" value="Conference" />
          <Picker.Item label="Festival" value="Festival" />
          <Picker.Item label="Game" value="Game" />
          <Picker.Item label="Premiere" value="Premiere" />
          <Picker.Item label="Concert" value="Concert" />
          <Picker.Item label="Charity Auction" value="Charity Auction" />
          <Picker.Item label="Show" value="Show" />
          <Picker.Item label="Gala" value="Gala" />
          <Picker.Item label="Fair" value="Fair" />
          <Picker.Item label="Comedy" value="Comedy" />
        </Picker>
      </View>
      <View>
        <Text style={AddEventsStyles.labels}>Event Location</Text>
        <TextInput
          style={AddEventsStyles.inputs}
          placeholder="Event Location"
          keyboardType="default"
          onChangeText={val => {
            handleChange('eventLocation', val);
          }}
          value={eventInfo.eventLocation}
        />
      </View>
      <View>
        <Text style={AddEventsStyles.labels}>Google Map Url</Text>
        <TextInput
          style={AddEventsStyles.inputs}
          placeholder="Paste Google Map URL"
          keyboardType="default"
          onChangeText={val => {
            handleChange('eventMapUrl', val);
          }}
          value={eventInfo.eventMapUrl}
        />
      </View>
      <View>
        <Text style={AddEventsStyles.labels}>Event Media</Text>

        <Pressable onPress={openCamera}>
          <View style={AddEventsStyles.mediaBox}>
            {eventImage ? (
              <Image
                source={{
                  uri:
                    typeof eventImage === 'string'
                      ? eventImage
                      : eventImage.assets[0].uri,
                }}
                style={{width: '100%', borderRadius: 10, height: '100%'}}
              />
            ) : (
              <Image source={require('../../../assets/logo/Upload.png')} />
            )}
          </View>
        </Pressable>
      </View>
      <Pressable style={AddEventsStyles.resultBtn} onPress={handlePostEvent}>
        {isloading && <ActivityIndicator size={'small'} color={'white'} />}
        <Text style={AddEventsStyles.textStyle}>Post Event</Text>
      </Pressable>
    </ScrollView>
  );
}
