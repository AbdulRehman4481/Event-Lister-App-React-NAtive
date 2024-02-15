import {StyleSheet} from 'react-native';

const PasswordStyle = StyleSheet.create({
  inputs: {
    borderRadius: 50,
    backgroundColor: '#F9F9F9',
    paddingVertical: 15,
    paddingLeft: 16,
  },
  labels: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 10,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 24,
    backgroundColor: '#6F3DE9',
    marginVertical: 40,
  },
  signText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PasswordStyle;
