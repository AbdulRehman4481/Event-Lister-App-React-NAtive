import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/Colors';

const SignInStyle = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, 
  },
  imageContainer: {
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainHeading: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 150,
  },
  inputs: {
    borderRadius: 50,
    backgroundColor: colors.secondary,
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
    backgroundColor: colors.primary,
    marginVertical: 40,
    
    
  },

  signText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    marginHorizontal: 10,
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: 10,
    fontWeight:"bold"
  },
  image: {
    width: 40,
    height: 40,
    backgroundColor: colors.lightGray,
    borderRadius: 50,
  },
  insteadBtn: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    
  },
});

export default SignInStyle;
