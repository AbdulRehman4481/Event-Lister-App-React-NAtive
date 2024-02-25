import React from 'react';
import {
  ActivityIndicator,
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
import useAddEvents from '../../../hooks/useAddEvents';
import AddEventsStyles from './AddEventsStyles';

export default function AddEvents() {
  const {
    isLoading,
    eventImage,
    openCamera,
    handleChange,
    eventInfo,
    handlePostEvent,
    setOpen,
    open,
    setEventInfo,
    options,isModalVisible,setIsModalVisible,
    handleSelect,selectedOption
  } = useAddEvents();

  return (
    <ScrollView style={AddEventsStyles.mainView}>
      <>
        <Text style={AddEventsStyles.eventHeading}>Create An Event</Text>
      </>
      <>
        <Text style={AddEventsStyles.labels}>Event Name</Text>
        <TextInput
          style={[GlobalStyle.globalInput,{paddingVertical:12}]}
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
          style={[GlobalStyle.globalInput,{paddingVertical:12}]}
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

        <TouchableOpacity
          style={GlobalStyle.globalInput}
          onPress={() => setOpen(true)}>
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
        </TouchableOpacity>
      </View>
      <View>
        <Text style={AddEventsStyles.labels}>Event Type</Text>
        <View style={{marginVertical:2}}>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(true)}
                  style={GlobalStyle.globalInput}>
                  <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginRight:10}}> 
                    <Text style={AddEventsStyles.selectedOptionText}>
                      {selectedOption}
                    </Text>
                    <Image 
                    width={20}
                    height={20}
                    source={Images.arrowLogo}
                    />
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
                              <Text  style={AddEventsStyles.optionText}>
                                {option}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </Modal>
              </View>
      </View>
      <View>
        <Text style={AddEventsStyles.labels}>Event Location</Text>
        <TextInput
          style={[GlobalStyle.globalInput,{paddingVertical:12}]}
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
          style={[GlobalStyle.globalInput,{paddingVertical:12}]}
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

        <TouchableOpacity onPress={openCamera}>
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
            ) : (<>
              <Image source={Images.uploadLogo} />
              <Text style={AddEventsStyles.uploadText}>Upload Image</Text></>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={AddEventsStyles.resultBtn}
        onPress={handlePostEvent}>
        {isLoading && <ActivityIndicator size={'small'} color={'white'} />}
        <Text style={AddEventsStyles.textStyle}>Publish Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
