import loginStyles from '../styles/Login.module.css';
import { useRouter } from 'next/router';
import {server} from "../config/index";

export default function LogIn() {
  const router = useRouter();

  const setEmail = (email)=>{
    //do asynchronous validation by fetching api to check if email is unique
  }
  const loginHandler = async(e)=>{
    console.log("e",e)

    e.preventDefault();
  
    if (!e.target.email.value) {
      alert("Email is required");
    }  else if (!e.target.password.value) {
      alert("Password is required");
    }
    console.log(e.target.password.value);
    console.log(e.target.email.value)

    const res = await fetch(`${server}/api/auth/login`,{
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: e.target.password.value,
        email: e.target.email.value
      }) 
    })
    const token= (await res.json()).token;
    localStorage.setItem('token', token );
    router.push('/articles')

  }
    return (
      
        <div className={loginStyles.loginpage}>
          <div className={loginStyles.form} >
            <form onSubmit={loginHandler} >
               <input onChange={e=> setEmail(e.target.value)}name="email" type="text" placeholder="email address"/>
              <input 
                 type="password" name="password" placeholder="password with minimum length is 8 characters"/>
              <button>Login</button>

            </form>
            
          </div>
      </div>
      
    )
  }