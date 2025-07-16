import { useState } from "react";
import { createContext, useContext } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const [appointment, setAppointment] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    const getDoctorAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/appointment-doctor`, { headers: { token: dToken } })
            if (data.success) {
                setAppointment(data.appointments)
                // console.log(data.appointments);

            } else {
                toast.error("appointment not found");
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)

        }
    }

    const appointmentComplete = async (appointmentId) => {
        try {
                const {data} = await axios.post(`${backendUrl}/api/doctor/appointment-complete`, {appointmentId}, {headers: {token: dToken}})
                if(data.success){
                    toast.success(data.message)
                    getDoctorAppointments();
                }else{
                    toast.error(data.message)
                }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const appointmentCancel = async (appointmentId) => {
        try {
            const {data} = await axios.post(`${backendUrl}/api/doctor/appointment-cancel`, {appointmentId}, {headers: {token: dToken}})
            if(data.success){
                toast.success(data.message)
                getDoctorAppointments();
            }else{
                 toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const dashboardDoctor = async () => {
        try {

            const {data} = await axios.get(`${backendUrl}/api/doctor/dashboard-doctor`, {headers: {token: dToken}})
            if(data.success){
                setDashData(data.dashData)
                console.log(data.dashData);
                
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getProfileData = async () => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/doctor/profile-doctor`, {headers: {token: dToken}})
            if(data.success){
                setProfileData(data.profileData)
                console.log(data.profileData);
                
            }else{
                toast.error(data.message)
            }
        } catch (error) {
              console.log(error);
            toast.error(error.message)
        }
    }

    const value = {
        backendUrl,
        dToken,
        setDToken,
        appointment,
        setAppointment,
        getDoctorAppointments,
        appointmentComplete,
        appointmentCancel,
        setDashData,
        dashData,
        dashboardDoctor,
        setProfileData,
        profileData,
        getProfileData
    }

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    )
}

export const useDoctor = () => {
    const DoctorContextValue = useContext(DoctorContext)
    if (!DoctorContextValue) {
        throw new Error("DoctorProvider wrap properly");
    }
    return DoctorContextValue
}