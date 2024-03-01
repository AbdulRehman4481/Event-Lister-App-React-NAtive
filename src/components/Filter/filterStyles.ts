import {StyleSheet} from 'react-native';
import {colors} from '../../constants/Colors';

const FilterStyles = StyleSheet.create({
  hr: {
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  customMarker: {
    borderWidth: 4,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 16,
    width: 16,
    borderColor: colors.primary,
    marginTop: 23,
  },
  markerText: {
    color: '#000000',
  },

  inputLabel: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    color: 'black',
    marginVertical: 10,
  },
  inputz: {
    borderRadius: 50,
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    paddingLeft: 16,
    marginVertical: 6,
  },
  rangeTitle: {
    fontSize: 14,
    fontFamily: 'Poppins',
    lineHeight: 40,
    fontWeight: '600',
    color: 'black',
  },
  restText: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    color: colors.primary,
  },
  filterText: {
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    color: 'black',
    lineHeight: 23,
  },
  firstView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 22,
  },
  modalView: {
    width: '100%',
    height: 490,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    height: 52,
    borderRadius: 28,
    // padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: colors.primary,
    marginVertical: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  imageContainer: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#EFF0F9',
    borderRadius: 50,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 20,
    width: 20,
  },
  selectedOptionContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: 200,
    borderRadius: 5,
  },
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
});
export default FilterStyles;
