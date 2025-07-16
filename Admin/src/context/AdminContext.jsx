import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {

    const [atoken, setAtoken] = useState(localStorage.getItem('atoken') ? localStorage.getItem('atoken') : '')
    const [doctor, setDoctor] = useState([])
    const [appointment, setAppointment] = useState([])
    const [dashData, setDashData] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllDoctor = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/admin-all`, {}, { headers: { atoken } });
            if (data.success) {
                setDoctor(data.doctors);
                // console.log(data.doctors);

            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/availability`, { docId }, { headers: { atoken } })
            if (data.success) {
                toast.success(data.message);
                getAllDoctor();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)

        }
    }

    const getAllAppointment = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/appointment`, { headers: { atoken } })
            if (data.success) {
                setAppointment(data.appointments)
                console.log(data.appointments);

            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const appointmentCancel = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/cancel-appointment`, { appointmentId }, { headers: { atoken } })
            if (data.success) {
                toast.success(data.message)
                getAllAppointment();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const dashboardData = async () => {
        try {

            const {data} = await axios.get(`${backendUrl}/api/admin/dashboard-data`, {headers: {atoken}})
            if(data.success){
                setDashData(data.dashData)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const value = {
        atoken,
        setAtoken,
        backendUrl,
        doctor,
        getAllDoctor,
        changeAvailability,
        appointment,
        setAppointment,
        getAllAppointment,
        appointmentCancel,
        dashData,
        setDashData,
        dashboardData
    }

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = () => {
    const AdminContextValue = useContext(AdminContext)
    if (!AdminContextValue) {
        throw new Error("AdminProvider wrap properly");
    }
    return AdminContextValue
}