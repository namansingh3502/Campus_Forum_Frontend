import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAVtLAwxP1GoVjE-ceIvnwAzDU60yBQd8E",
  authDomain: "forum-image-storage.firebaseapp.com",
  projectId: "forum-image-storage",
  storageBucket: "forum-image-storage.appspot.com",
  messagingSenderId: "953034613348",
  appId: "1:953034613348:web:2b1034598336bd17d43571",
  measurementId: "G-LZHLJRL8S3"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app };