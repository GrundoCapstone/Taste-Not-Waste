// const firebase = require("./config");
// // Required for side-effects
// require("firebase/firestore");
// Initialize Cloud Firestore through Firebase
import {firebase} from './src/firebase/config';

var db = firebase.firestore();
var menu =[
    {
       "name":"Butter",
       "expirationTime":"60 days",
    },
    {
        "name":"Butter Milk",
        "expirationTime":"14 days",
    },
    {
        "name":"Cheddar Cheese",
       "expirationTime":"180 days",
    }
 ]
menu.forEach(function(obj) {
    db.collection("food").add({
        name: obj.name,
        expirationTime: obj.expirationTime,
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
});
