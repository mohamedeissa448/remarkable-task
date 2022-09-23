import jwt from 'jwt-decode' // import dependency

const  isUserLoggedIn = ()=>{
    const token = localStorage.getItem('token');
    if(!token){
        return false;
    }
    const user=jwt(token);
    const dateNow = new Date();

    if(user.exp < dateNow.getTime()){
        return false;

    }
    console.log("userrrrrrrrrrrrrrrrrrrr", user);
    return true;
};

export default isUserLoggedIn;