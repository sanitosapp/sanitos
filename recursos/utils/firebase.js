import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQU8tVOozkIoz2kMD_e5hMkqHzDSUsp_M",
  authDomain: "sanitosapp-d0b5f.firebaseapp.com",
  databaseURL: "https://sanitosapp-d0b5f.firebaseio.com",
  projectId: "sanitosapp-d0b5f",
  storageBucket: "sanitosapp-d0b5f.appspot.com",
  messagingSenderId: "891797980558",
  appId: "1:891797980558:web:14530c00938b7d5b3150df",
  measurementId: "G-41286CD976",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
};

export { firebase };
/* 
Fire.shared = new Fire()
export default Fire; */
