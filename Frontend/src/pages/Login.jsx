import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth';
import axios from 'axios';
import { toast } from 'react-toastify';


const Login = () => {

  const {token, setToken, backendUrl, navigate} = useAuth();
  

  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    try {
      if(state === 'Sign Up'){
        const {data} = await axios.post(`${backendUrl}/api/user/register`, {name, email, password})
        if(data.success){
          localStorage.setItem('token', data.token)
          setToken(data.token);
          toast.success(data.message)
        }else{
          toast.error(data.message)
        }
      }else{
        const {data} = await axios.post(`${backendUrl}/api/user/userlogin`, {email, password})
        if(data.success){
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success(data.message);
        }else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    if(token){
      navigate('/')
    }
  },[token, navigate])

  return (
    <form onSubmit={onSubmitHandle} className='min-h-[80vh] flex items-center w-full'>
      <div className='flex flex-col gap-4  m-auto items-start p-8 min-w-[340px] sm:min-w-[96px] border-gray-600 rounded-xl text-zinc-600 text-sm bg-white drop-shadow-xl lg:w-1/3'>
        <p className='text-2xl font-semibold w-full text-center'>
          {state === 'Sign Up' ? "Create account" : "Login"}
        </p>
        <p className='w-full text-center'>Please {state === 'Sign Up' ? 'Sign Up' : 'Login'} to book appointment</p>
        {
          state === 'Sign Up' && 
        <div className='w-full'>
          <p>Full Name</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1 outline-none' type="text" onChange={(e) => setName(e.target.value)} value={name} />
        </div>
        }
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1 outline-none'  type="email"  onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1 outline-none'  type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <button type='submit' className='bg-[#5f6FFF] text-white w-full text-base py-2 rounded hover:bg-blue-600 hover:scale-101 transition-all duration-300'>{state === 'Sign Up' ? "Create account" : "Login"}</button>
        {
          state === 'Sign Up' ? 
          <p>Already have an account? <span onClick={() => setState('Login')} className='text-[#5f6FFF] underline cursor-pointer'>Login Here</span></p>
          :
          <p>Create an new account <span onClick={() => setState('Sign Up')} className='text-[#5f6FFF] underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login