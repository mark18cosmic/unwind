import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAUeyPkOal-1SxHybOfh86WSOCkKCi_Hf4",
    authDomain: "unwind-2d548.firebaseapp.com",
    projectId: "unwind-2d548",
    storageBucket: "unwind-2d548.firebasestorage.app",
    messagingSenderId: "900844911526",
    appId: "1:900844911526:web:028326ac6d7a23680fad67"
  };

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
