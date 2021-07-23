importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js')

firebase.initializeApp({
  apiKey: 'AIzaSyCkntGV9nXdUHu6k5apS1nJ8QE-inqVetY',
  authDomain: 'antara-app.firebaseapp.com',
  databaseURL: 'https://antara-app.firebaseio.com',
  projectId: 'antara-app',
  storageBucket: 'antara-app.appspot.com',
  messagingSenderId: '684998311530',
  appId: '1:684998311530:web:437ab5ded1c97af3229413',
  measurementId: 'G-B8NQXZ82KD',
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  return handleNewNotification(payload)
})

function handleNewNotification(payload) {
  return new Promise((resolve, reject) => {
    const newStorageItem = payload

    const commLibDBReq = indexedDB.open('commLibDB', 1)
    commLibDBReq.onsuccess = function (event) {
      const CommDB = event.target.result
      const transaction = CommDB.transaction('notificationItems', 'readwrite')
      const store = transaction.objectStore('notificationItems')
      store.add(newStorageItem)
      resolve(true)
    }
  })
}
