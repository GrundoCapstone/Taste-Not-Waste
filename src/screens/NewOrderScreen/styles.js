import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#B8E0D2',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 60,
    fontFamily: 'Kalam',
    marginBottom: 50
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
    backgroundColor: '#EAC4D5',
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginBottom: 20
  },
  buttonTitle: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Kalam',
  },
  help: {
    flexDirection: 'row',
    marginTop: 200,
    marginBottom: 30
  },
  helpTitle: {
    fontSize: 18,
    fontFamily: 'Kalam',
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
});
