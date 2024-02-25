import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/Colors';

const EventDetailStyle = StyleSheet.create({
  BuyText: {
    fontWeight: '600',
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  BuyBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 50,
  },
  mapLogo: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  mapText: {
    fontWeight: '600',
    fontSize: 16,
    color: 'black',
    marginVertical: 7,
  },
  mapView: {
    width: 335,
    height: 140,
    backgroundColor: colors.secondary,
    borderRadius: 20,
    marginVertical: 5,
  },
  profileTitle: {
    color: 'black',
    marginHorizontal: 10,
  },
  profileDetail: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    marginTop: 5,
    marginRight: 5,
    height: 30,
    width: 30,
    borderRadius: 50,
  },
  eventAbout: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
  },
  aboutHeading: {
    fontWeight: '600',
    fontSize: 12,
    color: 'black',
    lineHeight: 15.3,
  },
  participants: {
    fontWeight: '600',
    color: 'black',
    marginHorizontal: 6,
  },
  Date: {
    marginHorizontal: 6,
  },
  detailSecond: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 18,
    color: 'black',
  },
  card: {
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
    flex: 1,
  },
  backgroundImage: {
    backgroundColor: 'white',
    flex: 1,
    resizeMode: 'cover',
    height: 180,
    width: 335,
  },
  cardDetail: {
    padding: 5,
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: 30,
  },

  price: {
    color: colors.primary,
    backgroundColor: colors.lightGray,
    padding: 6,
    borderRadius: 15,
  },
  eventView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 32,
    width: 302,
  },
});

export default EventDetailStyle;
