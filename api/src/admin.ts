import * as admin from 'firebase-admin';
import * as firebaseConfig from "../firebase-admin.json";

const firebase = admin.apps.length === 0
    ? admin.initializeApp({
        credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount)
    })
    : admin.app();
export = firebase;
