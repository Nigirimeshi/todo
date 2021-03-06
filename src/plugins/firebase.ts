import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import { firebaseConfig } from '@/../firebase.config.ts';

firebase.initializeApp(firebaseConfig);
firebase.analytics();

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const todosCollection = db.collection('todos');
const profilesCollection = db.collection('profiles');
const groupsCollection = db.collection('groups');
const userGroupCollection = db.collection('userGroup');

// export utils/refs
export { db, auth, todosCollection, profilesCollection, groupsCollection, userGroupCollection };
