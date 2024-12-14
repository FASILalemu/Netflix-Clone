
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCOeJ29maz3cKmMYQFSrZ0cySGYT5u1y6o",
  authDomain: "fasil-s-netflix---clone.firebaseapp.com",
  projectId: "fasil-s-netflix---clone",
  storageBucket: "fasil-s-netflix---clone.firebasestorage.app",
  messagingSenderId: "905389145992",
  appId: "1:905389145992:web:212e49749f720ce7f7043d",
  measurementId: "G-2LT65BG0MF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signUp = async(name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword
        (auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'user'), {
            uid: user.uid,
            name,
            authprovider: "local",
            email
        })

    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/'[1].split('-').join)(' '))
        
    }
}
const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/'[1].split('-').join)(' '))
        
    }
}
const logout = ()=>{
    signOut(auth);
}
const analytics = getAnalytics(app);
export {auth, db, login, signUp, logout};