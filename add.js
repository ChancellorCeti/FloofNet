import {} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js'

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import {where, getFirestore, collection, getDocs,doc,addDoc,query,setDoc,orderBy,limit,onSnapshot} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
//import { getAuth, onAuthStateChanged,GoogleAuthProvider,signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
var myEventsQ = [];
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCivSxGwzv-aotq1LF4azxbD_HXcTivHLc",

    authDomain: "floofchat.firebaseapp.com",
  
    databaseURL: "https://floofchat-default-rtdb.firebaseio.com",
  
    projectId: "floofchat",
  
    storageBucket: "floofchat.appspot.com",
  
    messagingSenderId: "1047492047204",
  
    appId: "1:1047492047204:web:84208a32ad78996a5cca71"
  
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app)
const db=getFirestore(app)
console.log(db)

const name=document.getElementById("name")
const sub=document.getElementById("sub");
sub.addEventListener("click",(e)=>{
    console.log(e)
    setDoc(doc(db, name.value, Math.round(Math.random()*10000000000).toString()), {
        sender:"FloofBot",
        msg:"Welcome to your brand-new server!",
        time:Date.now()
      });
})