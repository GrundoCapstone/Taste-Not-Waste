import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
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
  },
  totalList: {
    flexDirection: 'column',
    width: '100%',
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
    fontSize: 20,
    color: '#333333',
    fontWeight: '500',
  },
  foodExpiration: {
    fontSize: 20,
    color: '#333333',
    fontWeight: '200',
  },
  foodDetails: {
    fontSize: 20,
    color: '#333333',
  },
});
