import { StyleSheet } from "react-native";

const FilterStyles = StyleSheet.create({

    inputLabel: {
      fontSize:14,
      fontStyle:"normal",
      fontWeight:"600",
      color:"black",
      marginVertical:5
    },
    inputz: {
  
      borderRadius: 50,
      backgroundColor: '#F9F9F9',
      paddingVertical: 15,
      paddingLeft: 16,
      marginVertical:6
    },
    rangeTitle: {
      fontSize: 14,
      fontFamily: 'normal',
      fontWeight: '600',
      color: 'black',
    },
    restText: {
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: '500',
      color: '#6F3DE9',
    },
    filterText: {
      fontSize: 18,
      fontStyle: 'normal',
      fontWeight: '600',
      color: 'black',
    },
    firstView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'flex-end',
      marginTop: 22,
    },
    modalView: {
      width: '100%',
      height: '65%',
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 35,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonClose: {
      backgroundColor: '#6F3DE9',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
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
    image: {
      height: 20,
      width: 20,
    },
  });
 export default   FilterStyles