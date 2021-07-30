import firebase from 'firebase/app'
import 'firebase/messaging'
import {
  fetchAll,
  clearTable,
} from '../../comms/resources/localstorage.resources'

export type FCMState = {
  data: any
  notification: {
    title: string
    body: string
  }
}

const NOTIFICATIONTABLE = 'notificationItems'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}
firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

export function fetchAllAndClear(): Promise<Array<FCMState>> {
  return fetchAll<FCMState>(NOTIFICATIONTABLE).then(
    (notifications: Array<FCMState>) => {
      if (notifications.length === 0) {
        return []
      }
      // @ts-ignore
      return clearTable(NOTIFICATIONTABLE).then(() => {
        return notifications
      })
    }
  )
}

export function getRegToken() {
  return messaging
    .getToken({
      vapidKey: process.env.FIREBASE_VAPID_KEY,
    })
    .then((currentToken) => {
      if (currentToken) {
        return currentToken
      }
      return ''
    })
}

export default messaging
