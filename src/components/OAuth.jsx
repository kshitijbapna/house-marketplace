import React from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import {getAuth,signInWithPopup,GoogleAuthProvider} from 'firebase/auth'
import {doc,setDoc,getDoc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'
function OAuth() {
    const navigate=useNavigate()
    useLocation()
    const onGoogleClick=async ()=>{
        try{
            const auth=getAuth()
            const provider=new GoogleAuthProvider()
            const result=await signInWithPopup(auth,provider)
            const user=result.user
            const docRef=doc(db,'users',user.uid)
            const docSnap=await getDoc(docRef)
            if(!docSnap.exists()){
                await setDoc(doc(db,'users',user.uid),{
                    namex: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }
            navigate("/")
        }catch(err){
            toast.error("Could Not Authorize")
            console.log(err)
        }
    }
    return (
    <div className='socialLogin'>
        <p>Sign {window.location.pathname==='/sign-up'?'Up':'In'} with</p>
        <button className='socialIconDiv' onClick={onGoogleClick}>
            <img className='socialIconImg' src={googleIcon} alt="google" />
        </button>
    </div>
  )
}

export default OAuth