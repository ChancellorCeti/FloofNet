// Import the functions you need from the SDKs you need
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

const ring=document.getElementById("loading")
const mainc=document.getElementById('mainc')
document.addEventListener("DOMContentLoaded",(e)=>{
    console.log("e")
    ring.classList.add("faded")
    setTimeout(()=>{
        loading.style.zIndex='-1';
        mainc.style.opacity="100%";
        ring.innerHTML=""
        document.body.style.backgroundColor='#00008B'
    },1000)
})
let uname;
let channelid;
const namefield=document.getElementById("name")
const namesel=document.getElementById('namesel');
const channelsel=document.getElementById("channel")
namesel.addEventListener("click",(e)=>{
    mainc.style.color="#0068f0"
    uname=namefield.value;
    channelid=channelsel.value;
    mainc.innerHTML="";
    mainc.innerHTML+="<div id='myModal' class='modal'> <div class='modal-content'><span class='close'>&times;</span> <p>127.0.0.1:5500/?channel=testroom</p></div></div>"
    let navbut=document.createElement('span');
    let navdiv=document.createElement('div');
    navdiv.id="mySidenav"
    navdiv.classList.add("sidenav")
    mainc.appendChild(navdiv)
    
    let delnav=document.createElement("a")
    delnav.id="delnav"
    delnav.innerHTML="&times;"
    delnav.classList.add('closebtn')
    delnav.href="javascript:void(0)"
    delnav.setAttribute("onclick","closeNav()")
    navdiv.appendChild(delnav)
    let addServ=document.createElement("a")
    addServ.id='addserv'
    addServ.innerHTML="add a server"
    addServ.href="/add.html"
    navdiv.appendChild(addServ)
    let shareR=document.createElement("a")
    shareR.id='myBtn'
    shareR.innerHTML="Share this channel with a friend!"
    shareR.href="#"
    navdiv.appendChild(shareR)
    navbut.innerHTML="&#9776; open"
    navbut.setAttribute("onclick","openNav()")

    navbut.style.cursor="pointer"
    mainc.appendChild(navbut)
    mainc.style.display="flex";
    // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
    /*let navbar=document.createElement('div');
    navbar.id="navbar";
    mainc.appendChild(navbar);
    mainc.style.display="flex";
    let navbarsel=document.getElementById("navbar")
    let addServ=document.createElement("a")
    addServ.id='addserv'
    addServ.innerHTML="add a server"
    addServ.href="#"
    navbarsel.appendChild(addServ)*/
    getMsgs(channelid)
    const msginp=document.createElement("input");
    msginp.id="msginp";
    document.body.appendChild(msginp)
    document.body.style.width="1000px"
    document.body.style.height="800px"
    $(document).on("keypress", "input", function(e){
        
      if(e.which == 13){
          
        var dbref=collection(db,channelid)
        
        setDoc(doc(db, channelid, Math.round(Math.random()*10000000000).toString()), {
          sender:uname,
          msg:msginp.value,
          time:Date.now()
        })
          msginp.value=''
      }})
})
function getStartOfToday() {
    const now = new Date()
    now.setHours(5, 0, 0, 0) // +5 hours for Eastern Time
    const timestamp =  now.getTime()/1000;
    return timestamp // ex. 1631246400
  }
 async function getMsgs(channeli){
  const channelRefd=collection(db,channeli);
  const q23=query(channelRefd,orderBy("time"),limit(100))
  const q234 = await getDocs(q23);
console.log(q234.docs.length)

  if(q234.docs.length==0){
    alert("Server does not exist");
    window.onclick=function(event){
      console.log('reee')
      window.location.href=window.location.href
    }
    //mainc.innerHTML=""
    
    
  }
  var msgdiv=document.createElement('div');
  msgdiv.id="msgdiv"
  mainc.appendChild(msgdiv)
   const divsel=document.getElementById("msgdiv")
    const channelRef=collection(db,channeli);
    console.log(channelRef)
    const curtime=Date.now()

    let start = new Date();
    let end=getStartOfToday();
    console.table(curtime,start)
    let en=new Date('2022-5-1')

    /*const q2=query(channelRef,orderBy("time","desc"),limit(100))
    const q = query(channelRef,where("time",">",en))
    const querySnapshot = await getDocs(q2);
    
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      console.log(doc.data().time.seconds);
      var p=document.createElement("p")
      p.innerHTML=doc.data().sender+": "+doc.data().msg
      divsel.appendChild(p)
      mainc.style.marginTop="5%"
    });*/
    const q2=query(channelRef,orderBy("time"),limit(100))
    const unsubscribe = onSnapshot(q2, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            console.log("New city: ", change.doc.data());
            myEventsQ.push([change.doc.data().sender,change.doc.data().msg]);
        }
        if (change.type === "modified") {
            console.log("Modified city: ", change.doc.data());
        }
        if (change.type === "removed") {
            console.log("Removed city: ", change.doc.data());
        }
      });
    });
}

/*console.log(change.doc.data().time.seconds);
      var p=document.createElement("p")
      p.innerHTML=change.doc.data().sender+": "+change.doc.data().msg
      divsel.appendChild(p)
      mainc.style.marginTop="5%" */
      function processQ(el) {
        // ... this will be called on each .push
        const divsel=document.getElementById("msgdiv")
        document.body.style.width="100%";
        mainc.style.height="100%";
        mainc.style.marginTop="5%";
        msgdiv.style.backgroundColor="#424345";
        document.body.style.backgroundColor="#2c2d2e"
        console.log(el[0][1])
        let p2=document.createElement('p')
        p2.classList.add("msge")
        p2.innerHTML=el[0][0]+": "+el[0][1]
        divsel.appendChild(p2);
     }
     
     
     myEventsQ.push = function() { Array.prototype.push.apply(this, arguments);  processQ(arguments);};
     
