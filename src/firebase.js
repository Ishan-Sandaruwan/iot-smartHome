// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue,set  } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYvkm2R2_vl7OpVJl5_yP4MOj7LiDgX_w",
  authDomain: "esp32-ede4f.firebaseapp.com",
  databaseURL: "https://esp32-ede4f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "esp32-ede4f",
  storageBucket: "esp32-ede4f.appspot.com",
  messagingSenderId: "213452313844",
  appId: "1:213452313844:web:5f7996d297af8679f9faa1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue, set  };
