import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointment = () => {

  const { token, backendUrl, getDoctorData, navigate } = useAuth();
  const [allAppointment, setAllAppointment] = useState([])
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }


  const getAllAppointment = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/all-appointment`, { headers: { token } })
      if (data.success) {
        setAllAppointment(data.appointments.reverse())
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
        const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, {appointmentId}, {headers:{token}})
        if(data.success){
          toast.success(data.messsage)
          getAllAppointment();
          getDoctorData();
        }
        else{
          toast.error(data.message)
        }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
     const options = {
       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
       amount: order.amount,
       currency: order.currency,
       name: "Appointment Payment",
       description: "Appointment Payment",
       order_id: order.id,
       receipt: order.receipt,
       handler: async (response) => {
        console.log(response); 
        const { data } = await axios.post(`${backendUrl}/api/user/verify-razorpay`, response, {headers: {token}})
        if(data.success){
          getAllAppointment();
          navigate('/my-appointment')
        }
       }
     }

     const rzp = new window.Razorpay(options)
     rzp.open()
  }


  const razorpayPayment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/razorpay`, {appointmentId}, {headers: {token}})
      if(data.success){
        console.log(data.order);
        initPay(data.order)
        
      }
    } catch (error) {
        console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getAllAppointment();
    }
  }, [token])
  return (
    <div >
      <p className='pb-3 mt-10 font-medium text-zinc-700 border-b'>My Appointment</p>
      <div>
        {
          allAppointment.map((item, index) => (
            <div className='grid grid-colos-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img className='w-32 bg-indigo-50' src={item.docData.image} alt="image" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-sm'>{item.docData.address.line1}</p>
                <p className='text-sm'>{item.docData.address.line2}</p>
                <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end '>
                {!item.cancelled && item.payment && !item.isCompleted && <button  className='text-sm text-gray-600 text-center sm:min-w-48 py-2 border border-gray-200 bg-gray-100 rounded ' >Payment Paid</button>}
                {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={() => razorpayPayment(item._id)} className='text-sm text-[#5f6FFF] text-center sm:min-w-48 py-2 border border-[#5f6FFF] rounded hover:bg-[#5f6FFF] hover:text-white transition-all duration-500' >Pay Online</button>}
                {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-sm text-gray-500  text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-500' >Cancel Appointment</button> }
                {item.cancelled && !item.isCompleted && <button className='text-sm text-red-600 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-500' >Appointment Is Cancelled</button> }
                {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointment