import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/Colors';

const AddEventsStyles = StyleSheet.create({
  selectedOptionText: {
    fontSize: 16,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '80%',
    width: '80%',
    marginLeft: 10,
    marginTop: 10,
  },
  optionContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 6,
    width: 200,
    borderRadius: 10,
    marginVertical: 5,
  },
  optionText: {
    color: 'black',
    fontSize: 16,
  },
  resultBtn: {
    marginVertical: 20,
    backgroundColor: colors.primary,
    borderRadius: 28,
    padding: 13,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
  mediaBox: {
    borderWidth: 2,
    borderRadius: 12,
    borderStyle: 'dashed',
    height: 161,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    marginHorizontal: 20,
  },
  eventHeading: {
    color: 'black',
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '600',
    textAlign: 'center',
    margin: 25,
  },
  labels: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 10,
  },
  loadingIndicator: {
    color: 'black',
  },
});

export default AddEventsStyles;
