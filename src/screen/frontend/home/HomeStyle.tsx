import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/Colors';

const HomeStyle = StyleSheet.create({
  mainViewScroll: {
    backgroundColor: 'white',
  },
  HomeMain: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainHeading: {
    fontFamily: 'Poppins',
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '600',
    color: 'black',
  },
  inputView: {
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    borderColor: colors.lightGray,
    margin: 20,
  },
  image: {
    height: 20,
    width: 20,
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
  onText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    // fontStyle: 'normal',
    fontWeight: '600',
    color: 'black',
    lineHeight: 23.4,
  },
  seeText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    color: colors.primary,
  },
  secondView: {
    width: 335,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  card: {
    width: 335,
    marginHorizontal: 12,
    marginBottom: 10,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 6,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 2,
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
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 18,
    marginVertical: 3,
    marginHorizontal: 10,
  },
  cardDetail: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: 12,
    fontWeight: '400',
    color: 'black',
  },
  cardDate: {
    color: 'rgba(182, 197, 205, 0.3)',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  hr: {
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,

  },
  secondViewExtra: {
    marginVertical: 10,
  },
  smallCard: {
    width: 335,
    marginVertical: 10,
    marginHorizontal: 13,
    flexDirection: 'row',
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 4,
  },
  smallImage: {
    backgroundColor: 'white',
    flex: 1,
    resizeMode: 'cover',
    height: 80,
    width: 80,
  },
  smallCardDetail: {
    width: 230,
    flexDirection: 'row',
    marginHorizontal: 8,
    justifyContent: 'space-between',
  },
  smallTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 8,
  },
  smallPrice: {
    color: colors.primary,
    backgroundColor: colors.lightGray,
    padding: 6,
    borderRadius: 15,
  },
  smallType:{
    color:"rgba(148, 150, 165, 1)"
  }
});

export default HomeStyle;
