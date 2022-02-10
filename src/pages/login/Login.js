import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/context';
import {validation} from './validation'
import './Login.css'
import axios from 'axios';
import Loading from '../../components/loading/Loading'
function Login() {
  const [loginData,setLoginData]=useState({email:'',password:''})
  const [apiMsg, setApiMsg] = useState({apiFail: "" });
  const {loginSuccess,startLogin,loginFail,state}=useGlobalContext()
  const [error, setError] = useState({});
  
  const handleChange=(e)=>{
  const {name,value}=e.target
  setLoginData({...loginData,[name]:value})
}
const handleSubmit=async(e)=>{
startLogin()
e.preventDefault()
  setError(validation(loginData));
try {
  const res=await axios.post('https://myblog-1997.herokuapp.com/api/auth/login',loginData)
  loginSuccess(res.data.user)
  window.location.replace('/')
} catch (error) {
  loginFail()
  setApiMsg({apiFail:error.response.data})
  
}

}
if(state.isFetching){
return <Loading/>
}

  return <section className='loginContainer'>
      <div className='loginArticle'>
          <h2 className='loginHead'>Login</h2>
          <hr />
          <form onSubmit={handleSubmit}>
              <div className='loginEmail'>
              <label htmlFor="email">Email</label>
              <input className={error.email && "errorInput"} value={loginData.email} onChange={handleChange}  name='email' type="text" id='email' />
          <p style={{color:'red',fontStyle:'italic'}}>{error.email}</p>
          </div>
            <div className='loginPassword'>
            <label htmlFor="password">password</label>
            <input  className={error.password && "errorInput"} value={loginData.password} onChange={handleChange} name='password' type="password" id='password' />
          <p style={{color:'red',fontStyle:'italic'}}>{error.password}</p>
         
          </div>
        <button className='LoginBtn' type='submit'>Login</button>
        <p style={{color:'red',textAlign:'center',marginTop:'5px'}}>{apiMsg.apiFail}</p>
      </form>
      </div>
      <Link to={'/register'}>
        <button className='Loginregister'>register</button>
      </Link>

  </section>;
}

export default Login;



