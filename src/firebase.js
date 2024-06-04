
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {addDoc, collection, getFirestore} from "firebase/firestore"
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyAiKr472M_ec25Qtzal-LdcL9UFczKwyk4",
  authDomain: "netflix-clone-1a557.firebaseapp.com",
  projectId: "netflix-clone-1a557",
  storageBucket: "netflix-clone-1a557.appspot.com",
  messagingSenderId: "918505085287",
  appId: "1:918505085287:web:4bd13adafd4469108bf7c2",
  measurementId: "G-LW0PR9B6DM"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app);
const db=getFirestore(app);

const signup =async (name,email,password)=>{
    try {
       const res= await createUserWithEmailAndPassword(auth,email,password);
       const user=res.user;
       await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
       })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
             
    }

}
const login=async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
       console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(" "))
    }

}
const logout=()=>{
  signOut(auth)
}
export {auth,db,login,signup,logout};