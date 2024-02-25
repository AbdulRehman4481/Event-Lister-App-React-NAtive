import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/Colors';

const DetailStyles = StyleSheet.create({
  barCode: {
    width: 303,
    height: 82,
    backgroundColor: '#D9D9D9',
    marginLeft: 20,
    marginTop: 30,
  },
  fourthView: {},
  thirdView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D9D9D9',
    width: 256,
  },
  circle: {
    width: 38,
    height: 38,
    backgroundColor: colors.darBlue,
    borderRadius: 50,
    position: 'relative',
    right: 20,
  },
  circle2: {
    width: 38,
    height: 38,
    backgroundColor: colors.darBlue,
    borderRadius: 50,
    position: 'relative',
    left: 20,
  },
  eventView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 32,
    width: 302,
  },
  secondView: {
    backgroundColor: 'white',
    width: 335,
    marginVertical: 50,
    marginHorizontal: 12,
    borderRadius: 20,
  },
  mainView: {
    backgroundColor: colors.darBlue,
  },
  card: {
    borderColor: 'black',
    borderRadius: 16,
    backgroundColor: 'white',
    padding: 6,
  },
  imageView: {
    flex: 1,
  },
  backgroundImage: {
    backgroundColor: 'white',
    flex: 1,
    resizeMode: 'cover',
    width: 323,
    height: 160,
  },
  cardTitle: {
    color: colors.darBlue,
    fontFamily: 'Poppins',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 18,
    marginVertical: 3,
  },
  cardDetail: {
    padding: 5,

    marginVertical: 10,
    marginHorizontal: 10,
  },
  detailHeading: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileImage: {
    marginTop: 5,
    marginRight: 5,
    height: 30,
    width: 30,
    borderRadius: 50,
  },
  imageText: {
    backgroundColor: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 10,
    margin: 10,
    alignSelf: 'flex-start',
  },
  price: {
    color: colors.primary,
    backgroundColor: colors.lightGray,
    padding: 6,
    borderRadius: 15,
  },
  profileTitle: {
    color: 'black',
    fontWeight: 'bold',
  },
  cardDate: {
    marginVertical: 10,
  },
  hr: {
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default DetailStyles;
