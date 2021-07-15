import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#B8E0D2',
  },
  title: {
    fontSize: 30,
    marginTop: 18,
    fontFamily: 'Kalam',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Kalam',
  },
  userEmail: {
    fontSize: 20,
    fontFamily: 'Kalam',
  },
  iconLogo: {
    resizeMode: 'contain',
    height: 150,
    marginTop: 20,
    marginBottom: 10,
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
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Kalam',
  },
  buttonClose: {
    backgroundColor: '#EAC4D5',
    borderWidth: 1,
    borderColor: 'black',
  },
  button: {
    backgroundColor: '#EAC4D5',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  textStyle: {
    color: 'black',
    fontFamily: 'Kalam',
    textAlign: 'center',
  },
  checkBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
  }
});
