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
});
