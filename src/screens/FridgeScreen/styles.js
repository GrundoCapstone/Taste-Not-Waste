import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#EAC4D5',
  },
  scrollView: {
    marginHorizontal: 10,
  },
  text: {
    color: 'black',
    marginTop: 500,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 18,
    fontFamily: 'Kalam',
  },
  totalList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-evenly',
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
    backgroundColor: '#B8E0D2',
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
  button: {
    backgroundColor: '#B8E0D2',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: 70,
    marginRight: 70,
    marginTop: 10,
    marginBottom: 30,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Kalam',
    fontSize: 20,
  }
});
