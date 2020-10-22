importScripts('https://www.gstatic.com/firebasejs/7.21.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.21.1/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '625457327244',
  projectId: "sms-app-2e429",
  apiKey: "AIzaSyDKw-aCA0hkDoiXi_EAE4r4-uho6RKdrHA",
  appId: "1:625457327244:web:eb0e7efa68346b17211fa9",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


messaging.setBackgroundMessageHandler(function(payload) {
  // Customize notification here
  return handleNewNotification(payload);
});

function handleNewNotification(payload) {
  return new Promise((resolve, reject) => { 
    const notificationTitle = payload.data.message;
    const notificationOptions = {
      body: `${payload.data.message} from ${payload.data.origin}`,
      icon: '/antara-logo.png',
      requireInteraction: true,
      silent: false,
      vibrate: [200, 100, 200, 100, 200, 100, 200],
      actions: []
    };
    
    const newStorageItem = {
      message: payload.data.message,
      origin: payload.data.origin,
      createdAt: new Date().getTime()
    }
  
    const commLibDBReq = indexedDB.open('commLibDB', 1);
    commLibDBReq.onsuccess = function(event) {
      const CommDB = event.target.result;
      const transaction = CommDB.transaction('notificationItems', 'readwrite');
      const store = transaction.objectStore('notificationItems');
      store.add(newStorageItem);
      self.registration.showNotification(notificationTitle,
        notificationOptions
      );
      resolve(true)
    }
  })
}
