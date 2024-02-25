import { StyleSheet } from "react-native";
import { colors } from "../../../constants/Colors";

const DiscoveryStyle = StyleSheet.create({
    inputView: {
      alignItems: 'center',
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 50,
      paddingHorizontal: 10,
      borderColor: colors.lightGray,
      marginVertical: 20,
      width:335,
      marginHorizontal: 12,
    },
    mainHeading: {
      fontFamily: 'Poppins',
      fontSize: 22,
      fontStyle: 'normal',
      fontWeight: '700',
      color: 'black',
      padding:20
    },
    smallCard: {
      width: 305,
      marginVertical: 10,
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
      width: 200,
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
      // marginLeft:30
    },
  });

  export default DiscoveryStyle;