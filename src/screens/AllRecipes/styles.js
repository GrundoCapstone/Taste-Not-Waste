import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
   },
   item: {
     padding: 10,
     fontSize: 18,
     height: 44,
   },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 50,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16
},
button: {
  backgroundColor: '#788eec',
  marginLeft: 30,
  marginRight: 30,
  marginTop: 20,
  height: 48,
  borderRadius: 5,
  alignItems: "center",
  justifyContent: 'center'
},
searchContainer: {
  flex: 1,
  flexDirection: 'row'
},
screenContainer: {
  flex: 1,
  alignItems: 'center'
},
detailButton: {
  marginRight: 30,
  borderWidth: 2,
  padding: 5,
  backgroundColor: 'pink'
}
});
