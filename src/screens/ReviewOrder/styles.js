import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FDEAF3',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Kalam',
    marginTop: 60,
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
    backgroundColor: '#6ED8BE',
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
  buttonTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Kalam',
  },
  smallButton: {
    backgroundColor: '#6ED8BE',
    height: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
    width: 75,
    marginLeft: 12,
    borderWidth: 1,
    borderColor: 'black',
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
    backgroundColor: '#6ED8BE',
    borderWidth: 1,
    borderColor: 'black',
  },
  textStyle: {
    color: 'black',
    fontFamily: 'Kalam',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Kalam',
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
    width: 175,
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
    marginRight: 55,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  addItemButton: {
    backgroundColor: '#6ED8BE',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
    width: 100,
    marginTop: 5,
    alignItems: 'center',
    fontFamily: 'Kalam',
  },
  trashIcon: {
    marginRight: 10,
  }
});
