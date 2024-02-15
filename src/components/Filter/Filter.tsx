import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {
  Alert,
  Modal,
  Text,
  Pressable,
  View,
  Image,
  TextInput,
} from 'react-native';
import FilterStyles from './FilterStyles';

const Filter = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('java');

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={FilterStyles.centeredView}>
          <View style={FilterStyles.modalView}>
            <View style={FilterStyles.firstView}>
              <Text style={FilterStyles.filterText}>Fiters</Text>
              <Text style={FilterStyles.restText}>Reset</Text>
            </View>
            <View>
              <Text style={FilterStyles.rangeTitle}>Price Range</Text>
            </View>
            <View>
              <Text style={{height: 80}}>Range</Text>
            </View>
            <View>
              <Text style={FilterStyles.inputLabel}>Sorted By Date</Text>
              <TextInput
                style={FilterStyles.inputz}
                placeholder="Selete Date Range"
              />
            </View>
            <View>
              <Text style={FilterStyles.inputLabel}>Sorted By Category</Text>
              <View>
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                  }

                  // mode="dropdown"
                >
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                  <Picker.Item label="Python" value="python" />
                  <Picker.Item label="C#" value="csharp" />
                </Picker>
              </View>
            </View>
            <Pressable
              style={[FilterStyles.button, FilterStyles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={FilterStyles.textStyle}>Show Result</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={FilterStyles.imageContainer}
        onPress={() => setModalVisible(true)}>
        <Image
          source={require('../../assets/logo/FilterIcon.png')}
          style={FilterStyles.image}
        />
      </Pressable>
    </View>
  );
};

export default Filter;
