import { createContext, useContext, useEffect, useState } from "react";
// import { doctors } from '../assets/assets'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const [userData, setUserData] = useState(false)

    const navigate = useNavigate();
    const currency = '$';
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getDoctorData = async () => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/doctor/list`)
            if(data.success) {
                setDoctors(data.doctors);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const loadUserData = async () => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/user/profile`, {headers: {token}})
            if(data.success){
                setUserData(data.userData);
                // console.log(data.userData);
                
            }else{
                toast.error(data.message)
            }
        } catch (error) {
                 console.log(error);
            toast.error(error.message)
        }
    }

    const value = {
        doctors,
        getDoctorData,
        navigate,
        currency,
        backendUrl,
        setToken,
        token,
        userData,
        setUserData,
        loadUserData
    }

    useEffect(()=>{
        getDoctorData();
    },[])

    useEffect(() => {
        if(token){
            loadUserData();
        }else{
            setUserData(false)
        }
    },[token])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const AuthContextValue = useContext(AuthContext)
    if (!AuthContextValue) {
        throw new Error("Auth is not define properly");
    }
    return AuthContextValue
}