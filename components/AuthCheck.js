import { useRouter } from 'next/router';
import Loading from './Loading.js';
import { useJwt } from "react-jwt";

let user = null;

const isUserLoggedIn = ()=>{
    const token = localStorage.getItem('token');
    if(!token){
        return false;
    }
    const { decodedToken, isExpired } = useJwt(token);
    if(isExpired){
        return false;
    }
    user = decodedToken;
    console.log("userrrrrrrrrrrrrrrrrrrr", user);
    return true;
};

const AuthCheck = (props) => {
  const router = useRouter()
    isUserLoggedIn(); 

  // you need to implement this. In this example, undefined means things are still loading, null means user is not signed in, anything truthy means they're signed in
  if (typeof window !== 'undefined'|| user === null) router.push('/')

  if(!user) return <Loading /> // a loading component that prevents the page from rendering
   
  return props.children
}

export default AuthCheck;