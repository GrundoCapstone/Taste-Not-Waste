import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#FFBABE'
    },
    title: {
      fontSize: 30,
      marginTop: 15,
    },
    userName: {
      fontSize: 24,
    },
    userEmail: {
      fontSize: 20
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
    iconLogo: {
        resizeMode: "contain",
        height: 100,
        marginTop: 20
    }
  });
  