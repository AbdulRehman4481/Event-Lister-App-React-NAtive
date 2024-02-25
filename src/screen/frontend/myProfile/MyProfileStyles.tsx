import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/Colors';

const MyProfileStyles = StyleSheet.create({
  btnView: {
    justifyContent: 'flex-end',
    height: 200,
  },
  resetText: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.primary,
    textAlign: 'center',
  },
  ResetBtn: {
    borderWidth: 4,
    borderColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 50,
    marginVertical: 10,
  },
  UpdateText: {
    fontWeight: '600',
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  UpdateBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 50,
  },
  titleView: {
    backgroundColor: colors.secondary,

    width: 335,
    height: 52,
    borderRadius: 20,
  },
  emailView: {
    borderRadius: 20,
    width: 335,
    height: 52,
    backgroundColor: colors.secondary,
  },
  profileTitle: {
    fontSize: 14,
    fontWeight: '400',
    padding: 15,
  },
  profileEmail: {
    fontSize: 14,
    fontWeight: '400',
    padding: 15,
  },
  labels: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 10,
  },
  frameEdit: {
    width: 20,
    height: 20,
    position: 'relative',
    bottom: 29,
    left: 45,
  },
  thirdView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  imageView: {
    borderWidth: 1,
    borderRadius: 100,
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
  },
  profileImage: {
    width: 125,
    height: 125,
    borderRadius: 100,
    borderWidth: 1,
    // borderStyle: 'd',
  },
  mainHeading: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  mainView: {
    marginHorizontal: 12,
    marginVertical: 20,
  },
  secondView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoutBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginLeft: 40,
    borderRadius: 30,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default MyProfileStyles;
