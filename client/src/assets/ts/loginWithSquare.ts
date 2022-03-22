import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentSnapshot,
  getFirestore,
  onSnapshot,
  setDoc,
  Timestamp,
  Unsubscribe
} from 'firebase/firestore'
import cryptoJS from 'crypto-js'
import PromiseHandler from './promiseHandler'

export default async (
  scopes: Array<never>,
  callback: (snapshot: DocumentSnapshot<DocumentData>, unsubscribe: Unsubscribe) => void
) => {
  // Join the scopes into a string separated by a plus sign
  const scopesString = squareScopes(scopes)

  // Use node env to determine if we are running in development or production
  const basePath =
    process.env.NODE_ENV === 'production' ? 'https://connect.squareup.com' : 'https://connect.squareupsandbox.com'

  // Get client id
  const clientID = 'sandbox-sq0idb-WjWY5SRQV11zuh4tTxF1cg'

  // Create random string to use as state
  const state = String(cryptoJS.MD5(String(Date.now())))

  // Create firebase oauth document
  const [, error] = await PromiseHandler(createFirebaseOauth(state))

  // Check for error
  if (error) throw new Error(error)

  // Build the URL to redirect to
  const redirectUrl = `${basePath}/oauth2/authorize?client_id=${clientID}&response_type=code&scope=${scopesString}&state=${state}`

  // Start snapshot listener
  createFirebaseSnapshot(state, callback)

  // Open the URL in a new window
  window.open(redirectUrl, '_blank', 'location=yes,height=570,width=520,scrollbars=no,status=yes')

  // Return the URL
  return redirectUrl
}

const squareScopes = (scopes: Array<never>) => {
  return scopes.join('+')
}

async function createFirebaseOauth(state: string) {
  // Get firebase firestore instance
  const db = getFirestore()

  // Get collection path
  const ref = collection(db, 'oauth')

  // Create new oauth document
  const docRef = doc(ref, state)

  // Set the document
  const document = await setDoc(docRef, {
    state: state,
    createdAt: Timestamp.now()
  })

  // Return void
  return document
}

async function createFirebaseSnapshot(
  state: string,
  callback: (snapshot: DocumentSnapshot<DocumentData>, unsubscribe: Unsubscribe) => void
) {
  // Get firebase firestore instance
  const db = getFirestore()

  // Get collection path
  const ref = collection(db, 'oauth')

  // Get document reference
  const docRef = doc(ref, state)

  // Get document snapshot
  const unsub = onSnapshot(docRef, (snapshot) => {
    callback(snapshot, () => {
      deleteDoc(docRef)
      unsub()
    })
  })
}
