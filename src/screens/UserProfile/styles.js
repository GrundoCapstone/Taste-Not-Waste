import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      marginTop: 15,
    },
    logo: {
      flex: 1,
      height: 120,
      width: 90,
      alignSelf: 'center',
      margin: 30,
    },
    input: {
      height: 48,
      borderRadius: 5,
      overflow: 'hidden',
      backgroundColor: 'white',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 30,
      marginRight: 30,
      paddingLeft: 16,
    },
    button: {
      backgroundColor: '#A9EBDB',
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 48,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
    },
    buttonTitle: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'normal',
    },
    smallButton: {
      backgroundColor: '#A9EBDB',
      height: 20,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 1,
      width: 75,
      marginLeft: 12,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      marginTop: '50%',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
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
    input: {
      height: 48,
      borderRadius: 5,
      overflow: 'hidden',
      backgroundColor: 'white',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 30,
      marginRight: 30,
      paddingLeft: 16,
    },
    editName: {
      borderRadius: 5,
      backgroundColor: 'white',
      padding: 5,
      width: 100,
    },
    editDate: {
      borderRadius: 5,
      backgroundColor: 'white',
      padding: 5,
    },
    orderDate: {
      fontSize: 16,
      flexDirection: 'row',
    },
    totalList: {
      flexDirection: 'column',
      width: 350,
    },
    tableHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      marginBottom: 5,
      borderBottomColor: 'black',
      borderBottomWidth: 2,
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      marginBottom: 5,
    },
    itemColumn: {
      flexDirection: 'column',
    },
    expirationColumn: {
      flexDirection: 'column',
    },
    datePickerStyle: {
      width: 200,
      marginTop: 20,
    },
    addItemButton: {
      backgroundColor: '#A9EBDB',
      borderRadius: 5,
      padding: 5,
      width: 100,
      marginTop: 5,
      alignItems: 'center',
    },
    iconLogo: {
        resizeMode: "contain",
        height: 100
    }
  });
  