import {
    View,
    Text,
    ScrollView,
    
    TextInput,
    Image,
    Pressable,
  } from 'react-native';
  import React, {useState} from 'react';
  import {Picker} from '@react-native-picker/picker';
import EditEventsStyles from "./EditEventsStyles"

  
  export default function EditEvents() {
    const [selectedValue, setSelectedValue] = useState('java');
  
    return (
      <ScrollView scrollEnabled={false} style={EditEventsStyles.mainView}>
        <View>
          <Text style={EditEventsStyles.eventHeading}>Edit An Event</Text>
        </View>
        <View>
          <Text style={EditEventsStyles.labels}>Event Name</Text>
          <TextInput
            style={EditEventsStyles.inputs}
            placeholder="Event Name"
            keyboardType="default"
          />
        </View>
        <View>
          <Text style={EditEventsStyles.labels}>Ticket Price</Text>
          <TextInput
            style={EditEventsStyles.inputs}
            placeholder="$0.00"
            keyboardType="number-pad"
          />
        </View>
        <View>
          <Text style={EditEventsStyles.labels}>Event Date</Text>
          <TextInput
            style={EditEventsStyles.inputs}
            placeholder="Select Date"
            keyboardType="default"
          />
        </View>
        <View>
          <Text style={EditEventsStyles.labels}>Event Type</Text>
  
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            // mode="dropdown"
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
            <Picker.Item label="Python" value="python" />
            <Picker.Item label="C#" value="csharp" />
          </Picker>
        </View>
        <View>
          <Text style={EditEventsStyles.labels}>Event Location</Text>
          <TextInput
            style={EditEventsStyles.inputs}
            placeholder="Event Location"
            keyboardType="default"
          />
        </View>
        <View>
          <Text style={EditEventsStyles.labels}>Google Map Url</Text>
          <TextInput
            style={EditEventsStyles.inputs}
            placeholder="Url"
            keyboardType="default"
          />
        </View>
        <View>
          <Text style={EditEventsStyles.labels}>Event Media</Text>
          <View style={EditEventsStyles.mediaBox}>
            <Image source={require('../../assets/logo/Upload.png')} />
            <Text style={EditEventsStyles.uploadText}>Upload Image</Text>
          </View>
        </View>
        <Pressable style={EditEventsStyles.resultBtn}>
          <Text style={EditEventsStyles.textStyle}>Edit Event</Text>
        </Pressable>
      </ScrollView>
    );
  }
  