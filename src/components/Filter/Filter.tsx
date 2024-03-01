import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { colors } from '../../constants/Colors';
import Images from '../../constants/Images';
import GlobalStyle from '../../css/GlobalStyle';
import FilterStyles from './filterStyles';

const Filter = ({
  onFilterChange,
}: {
  onFilterChange: (values: number[], selectedValue: string, date: any) => void;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [values, setValues] = useState([0, 5000]);
  const [selectedOption, setSelectedOption] = useState('Select an option');
  const handleValuesChange = (newValues: number[]) => {
    setValues(newValues);
  };

  const handleReset = () => {
    setValues([0, 5000]);
    setDate(new Date());
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const options = [
    'Exhibition',
    'Workshop',
    'Conference',
    'Festival',
    'Game',
    'Premiere',
    'Concert',
    'Charity Auction',
    'Show',
    'Gala',
    'Fair',
    'Comedy',
  ];

  const handleFilter = () => {
    const selectedCategory = selectedOption;
    onFilterChange(values, selectedCategory, date);
    setModalVisible(!modalVisible);
  };

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsModalVisible(false);
  };

  const renderCustomMarker = (props: any) => (
    <>
      <View style={FilterStyles.customMarker}></View>
      <Text style={FilterStyles.markerText}>${props.currentValue}</Text>
    </>
  );

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableWithoutFeedback
          onPress={() => setModalVisible(!modalVisible)}>
          <View style={FilterStyles.centeredView}>
            <View style={FilterStyles.modalView}>
              <View style={FilterStyles.firstView}>
                <Text style={FilterStyles.filterText}>Filters</Text>
                <TouchableOpacity onPress={handleReset}>
                  <Text style={FilterStyles.restText}>Reset</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={FilterStyles.rangeTitle}>Price Range</Text>
              </View>
              <View style={{marginTop: 10, marginBottom: 24}}>
                <MultiSlider
                  values={values}
                  sliderLength={300}
                  onValuesChange={handleValuesChange}
                  min={0}
                  max={5000}
                  step={2}
                  allowOverlap
                  snapped
                  selectedStyle={{
                    backgroundColor: colors.primary,
                    height: 2,
                  }}
                  unselectedStyle={{
                    backgroundColor: 'lightgray',
                  }}
                  containerStyle={{
                    height: 30,
                  }}
                  customMarker={renderCustomMarker}
                />
              </View>
              <View style={FilterStyles.hr} />
              <View>
                <Text style={FilterStyles.inputLabel}>Sorted By Date</Text>
                <TouchableOpacity
                  onPress={() => setOpen(true)}
                  style={GlobalStyle.globalInput}>
                  <Text style={{paddingHorizontal: 10}}>
                    {date.toDateString()}
                  </Text>
                </TouchableOpacity>
                {open && (
                  <DatePicker
                    modal
                    mode={'date'}
                    open={open}
                    date={date}
                    onConfirm={date => {
                      setOpen(false);
                      setDate(date);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                )}
              </View>
              <View>
                <Text style={FilterStyles.inputLabel}>Sorted By Category</Text>
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
                      <Text style={FilterStyles.selectedOptionText}>
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
                        <View style={FilterStyles.modalContainer}>
                          {options.map((option: string) => (
                            <TouchableOpacity
                              key={option}
                              onPress={() => handleSelect(option)}>
                              <View style={FilterStyles.optionContainer}>
                                <Text style={FilterStyles.optionText}>
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
              <View style={FilterStyles.hr} />

              <TouchableOpacity
                style={[FilterStyles.button, FilterStyles.buttonClose]}
                onPress={handleFilter}>
                <Text style={FilterStyles.textStyle}>Show Result</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <TouchableOpacity
        style={FilterStyles.imageContainer}
        onPress={() => setModalVisible(true)}>
        <Image
          source={require('../../assets/logo/FilterIcon.png')}
          style={FilterStyles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Filter;
