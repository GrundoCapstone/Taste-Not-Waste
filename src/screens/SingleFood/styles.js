import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  screenContainer: {
    height: '100%',
    backgroundColor: '#EAC4D5',
    width: '100%',
  },
  body: {
    marginTop: 30,
    width: '90%',
    marginLeft: '5%',
  },
  foodInfo: {
    width: '70%',
    textAlign: 'center',
    marginLeft: '15%',
    marginRight: '15%',
  },
  title: {
    fontFamily: 'Kalam',
    fontSize: 35,
    marginBottom: 0,
    padding: 0,
    textAlign: 'center',
  },
  date: {
    fontFamily: 'Kalam',
    fontSize: 15,
    marginTop: 0,
    marginBottom: 5,
    textAlign: 'center',
  },
  deleteButton: {
    padding: 2,
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#B8E0D2',
    width: '70%',
    marginLeft: '15%',
    marginRight: '15%',
    marginBottom: 10,
  },
  delete: {
    textAlign: 'center',
    fontFamily: 'Kalam',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#B8E0D2',
  },
  recipesScroll: {
    height: '70%',
    marginBottom: 100,
  },
  recipesTitle: {
    fontFamily: 'Kalam',
    fontSize: 25,
  },
  text: {
    fontFamily: 'Kalam',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#757575',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailButton: {
    marginLeft: 5,
    borderWidth: 1,
    borderRadius: 5,
    padding: 4,
    backgroundColor: '#FFBABE',
    fontFamily: 'Kalam',
  },
  tinyLogo: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  backButton: {
    backgroundColor: '#B8E0D2',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 1,
    width: 65,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 700,
    marginTop: 30,
  },
  exitIcon: {
    marginRight: 10,
    color: '#757575',
    marginLeft: 5
  },
  detailButton: {
    alignContent: 'center',
    flexDirection: 'column'
  },
  detailText: {
    fontFamily: 'Kalam',
    color: '#757575',
    marginRight: 10
  }
});
