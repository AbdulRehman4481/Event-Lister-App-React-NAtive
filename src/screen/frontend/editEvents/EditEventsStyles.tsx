import { StyleSheet } from "react-native";

const EditEventsStyles = StyleSheet.create({
    resultBtn: {
      marginVertical:20,
      backgroundColor: '#6F3DE9',
      borderRadius:22,
      padding:13
    },
    textStyle: {
      textAlign:"center",
      color:"white",
      fontSize:16,
      fontWeight:"bold"
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
  });
  
  export default EditEventsStyles;