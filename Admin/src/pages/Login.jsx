import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useAdmin } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDoctor } from '../context/DoctorContext';

const Login = () => {

    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setDToken } = useDoctor()

    const { setAtoken, backendUrl } = useAdmin();

    const onSubmitHandle = async (e) => {
        e.preventDefault();
        try {
            if (state === 'Admin') {
                const { data } = await axios.post(`${backendUrl}/api/admin/adminlogin`, { email, password })
                if (data.success) {
                    localStorage.setItem('atoken', data.token)
                    setAtoken(data.token)
                    toast.success("Login successfully")
                } else {
                    toast.error(data.message);
                }
            } else {
                const {data} = await axios.post(`${backendUrl}/api/doctor/login-doctor`, {email, password})
                if(data.success){
                    localStorage.setItem('dToken', data.token)
                    setDToken(data.token)
                    toast.success(data.message)
                }else{
                    toast.error(data.message)
                }
            }
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <form onSubmit={onSubmitHandle} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96  rounded-xl text-[#5E5E5E] text-sm shadow-2xl'>
                <p className='text-2xl font-medium m-auto '>{state} <span className='text-[#5f5FFF]'>Login</span></p>
                <div className='w-full'>
                    <p>Email</p>
                    <input className='border border-[#DADADA] rounded w-full p-2 mt-1 outline-gray-300' type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input className='border border-[#DADADA] rounded w-full p-2 mt-1 outline-gray-300' type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                </div>
                <button type='submit' className='bg-[#5f6FFF] w-full border rounded-sm text-white py-2 text-base font-semibold hover:scale-101 transition-all duration-300'>Login</button>
                {
                    state === 'Admin' ?
                        <p>Doctor login? <span className='cursor-pointer underline text-[#5f6FFF]' onClick={() => setState('Doctor')}>Click here</span></p>
                        :
                        <p>Admin login? <span className='cursor-pointer underline text-[#5f6FFF]' onClick={() => setState('Admin')}>Click here</span></p>
                }
            </div>
        </form>
    )
}

export default Login