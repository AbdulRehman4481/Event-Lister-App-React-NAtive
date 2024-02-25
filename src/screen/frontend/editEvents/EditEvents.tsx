import React from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Images from '../../../constants/Images';
import GlobalStyle from '../../../css/GlobalStyle';
import useEditEvents from '../../../hooks/useEditEvents';
import AddEventsStyles from '../addEvents/AddEventsStyles';
import EditEventsStyles from './EditEventsStyles';

export default function EditEvents({route}: any) {
  const {eventId} = route.params;
  const {
    options,
    handleSelect,
    setIsModalVisible,
    openCamera,
    handleUpdatePost,
    handleChange,
    isModalVisible,
    selectedOption,
    open,
    setOpen,
    eventDetails,
    setEventDetails,
  } = useEditEvents(eventId);

  return (
    <ScrollView style={EditEventsStyles.mainView}>
      <View>
        <Text style={EditEventsStyles.eventHeading}>Edit An Event</Text>
      </View>
      <View>
        <Text style={EditEventsStyles.labels}>Event Name</Text>
        <TextInput
          style={EditEventsStyles.inputs}
          placeholder="Event Name"
          keyboardType="default"
          value={eventDetails?.eventName}
          onChangeText={val => {
            handleChange('eventName', val);
          }}
        />
      </View>
      <View>
        <Text style={EditEventsStyles.labels}>Ticket Price</Text>
        <TextInput
          style={EditEventsStyles.inputs}
          placeholder="$0.00"
          keyboardType="number-pad"
          value={eventDetails?.eventPrice}
          onChangeText={val => {
            handleChange('eventPrice', val);
          }}
        />
      </View>
      <View>
        <Text style={EditEventsStyles.labels}>Event Date</Text>
        <TouchableOpacity
          style={EditEventsStyles.inputs}
          onPress={() => setOpen(true)}>
          <Text>{eventDetails?.eventDate.toDateString()}</Text>
          {open && (
            <DatePicker
              modal
              mode={'date'}
              open={open}
              date={new Date()}
              onConfirm={date => {
                setOpen(false);
                if (date) {
                  setEventDetails({...eventDetails, eventDate: date});
                }
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          )}
        </TouchableOpacity>
      </View>
      <View>
        <Text style={EditEventsStyles.labels}>Event Type</Text>
        <View style={{marginVertical: 2}}>
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            style={GlobalStyle.globalInput}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: 10,
              }}>
              <Text style={AddEventsStyles.selectedOptionText}>
                {selectedOption}
              </Text>
              <Image width={20} height={20} source={Images.arrowLogo} />
            </View>
          </TouchableOpacity>
          <Modal
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
              setIsModalVisible(false);
            }}>
            <TouchableWithoutFeedback
              onPress={() => {
                setIsModalVisible(false);
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={AddEventsStyles.modalContainer}>
                  {options.map((option: string) => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => handleSelect(option)}>
                      <View style={AddEventsStyles.optionContainer}>
                        <Text style={AddEventsStyles.optionText}>{option}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
        {/* <Picker
          selectedValue={eventDetails?.eventType}
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
        </Picker> */}
      </View>
      <View>
        <Text style={EditEventsStyles.labels}>Event Location</Text>
        <TextInput
          style={EditEventsStyles.inputs}
          placeholder="Event Location"
          keyboardType="default"
          value={eventDetails?.eventLocation}
          onChangeText={val => {
            handleChange('eventLocation', val);
          }}
        />
      </View>
      <View>
        <Text style={EditEventsStyles.labels}>Google Map Url</Text>
        <TextInput
          style={EditEventsStyles.inputs}
          placeholder="Url"
          keyboardType="default"
          value={eventDetails?.eventMapUrl}
          onChangeText={val => {
            handleChange('eventMapUrl', val);
          }}
        />
      </View>
      <View>
        <Text style={EditEventsStyles.labels}>Event Media</Text>
        <TouchableOpacity onPress={openCamera}>
          <View style={EditEventsStyles.mediaBox}>
            {eventDetails?.eventImage ? (
              <Image
                source={{
                  uri:
                    typeof eventDetails?.eventImage === 'string'
                      ? eventDetails?.eventImage
                      : eventDetails?.eventImage,
                }}
                style={{width: '100%', borderRadius: 10, height: '100%'}}
              />
            ) : (
              <Text style={EditEventsStyles.uploadText}>Upload Image</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={EditEventsStyles.resultBtn}
        onPress={handleUpdatePost}>
        <Text style={EditEventsStyles.textStyle}>Edit Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
