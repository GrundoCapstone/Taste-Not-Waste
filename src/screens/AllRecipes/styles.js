import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EAC4D5',
  },
  header: {
    marginTop: 60,
    fontFamily: 'Kalam',
    fontSize: 30,
    marginBottom: 0,
    padding: 0,
    textAlign: 'center',
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
    justifyContent: 'space-between',
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    backgroundColor: '#B8E0D2',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Kalam',
    color: '#757575',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    fontFamily: 'Kalam',
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  searchText: {
    fontFamily: 'Kalam',
    fontSize: 16,
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
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  instructions: {
    fontFamily: 'Kalam',
    textAlign: 'center',
    fontSize: 18,
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
