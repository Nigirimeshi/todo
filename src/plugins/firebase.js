import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import {firebaseConfig} from "../../firebase.config";


firebase.initializeApp(firebaseConfig);
firebase.analytics();

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const projectsCollection = db.collection('projects')

// export utils/refs
export {
  db,
  auth,
  projectsCollection,
};
