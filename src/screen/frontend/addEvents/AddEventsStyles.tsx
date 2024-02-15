import { StyleSheet } from "react-native";
import { colors } from "../../../components/constants/constants";

const AddEventsStyles = StyleSheet.create({
    resultBtn: {
      marginVertical:20,
      backgroundColor: colors.primary,
      borderRadius:22,
      padding:13,
      flexDirection:"row",
      justifyContent:"center"
    },
    textStyle: {
      textAlign:"center",
      color:"white",
      fontSize:16,
      fontWeight:"bold",
      
      
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
    inputs: {
      borderRadius: 50,
      backgroundColor: colors.secondry,
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
    loadingIndicator:{
      color:"black"
    }
  });

  export default AddEventsStyles;