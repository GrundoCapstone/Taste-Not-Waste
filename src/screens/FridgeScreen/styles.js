import { StyleSheet } from 'react-native';
import { Kalam_400Regular } from '@expo-google-fonts/kalam';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // margin: 5,
    backgroundColor: '#FFBABE',
  },
  formContainer: {
    flexDirection: 'row',
    height: 80,
    marginTop: 40,
    marginBottom: 20,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    marginHorizontal: 10,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: '#788eec',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  listContainer: {
    marginTop: 20,
    padding: 20,
  },
  text: {
    color: 'black',
    marginTop: 500,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
    fontFamily: 'Kalam',
  },
  totalList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 15,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  itemColumnName: {
    fontSize: 20,
  },
  expiresColumnName: {
    fontSize: 20,
  },
  infoColumnName: {
    fontSize: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderColor: 'black',
    padding: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 186, 190, .85)',
    borderWidth: 0.5,
  },
  foodName: {
    fontSize: 18,
    color: '#333333',
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'Kalam',
  },
  foodExpiration: {
    fontSize: 20,
    color: '#333333',
    fontWeight: '200',
    textAlign: 'center',
  },
  foodDetails: {
    fontSize: 20,
    color: '#333333',
  },
  foodTile: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#6ED8BE',
  },
  tileContent: {
    height: 50,
    marginTop: 50,
    marginBottom: 50,
  },
  expired: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  unkown: {
    color: 'red',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
