import {StyleSheet} from 'react-native';

const HomeStyle = StyleSheet.create({
  mainViewScroll: {
    marginHorizontal: 15,
    marginVertical: 20,
    padding: 10,
  },
  HomeMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainHeading: {
    fontFamily: 'Poppins',
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'black',
  },
  inputView: {
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    borderColor: 'rgba(146, 146, 146, 0.19)',
    marginVertical: 20,
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
    fontFamily: 'Poppins',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
    color: 'black',
  },
  seeText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#6F3DE9',
  },
  secondView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  card: {
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 6,
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 4,
  },
  imageView: {
    flex: 1,
  },
  backgroundImage: {
    backgroundColor: 'white',
    flex: 1,
    resizeMode: 'cover',
    height: 180,
  },
  cardTitle: {
    color: '#171B2E',
    fontFamily: 'Poppins',
    fontSize: 18,
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
    color: '#6F3DE9',
    backgroundColor: 'rgba(146, 146, 146, 0.19)',
    padding: 6,
    borderRadius: 15,
  },
  profileTitle: {
    color: 'black',
  },
  cardDate: {
    marginVertical: 10,
  },
  hr: {
    borderBottomColor: 'rgba(146, 146, 146, 0.19)',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  secondViewExtra: {
    marginVertical: 20,
  },
  smallCard: {
    width:305,
    marginVertical:10,
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
  smallIamge: {
    backgroundColor: 'white',
    flex: 1,
    resizeMode: 'cover',
    height: 80,
    width: 80,
  },
  smallCardDetail:{
    width:200,
    flexDirection:"row",
    marginHorizontal:8,
    justifyContent:"space-between"
    
    
    
  },
  smallTitle:{
    color:"black",
    fontSize:16,
    fontWeight:"700",
    marginVertical:8,   
  }
  ,
  smallPrice:{
    color: '#6F3DE9',
    backgroundColor: 'rgba(146, 146, 146, 0.19)',
    padding: 6,
    borderRadius: 15,
    // marginLeft:30

  },
  
});

export default HomeStyle;
