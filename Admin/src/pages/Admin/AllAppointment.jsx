import React from 'react'
import { useAdmin } from '../../context/AdminContext'
import { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {assets} from '../../assets/assets'

const AllAppointment = () => {

  const { appointment, setAppointment, getAllAppointment, atoken, appointmentCancel} = useAdmin();
  const {calculateAge, slotDateFormat, currency} = useApp();

  useEffect(() => {
    if (atoken) {
      getAllAppointment();
    }
  }, [atoken])
  return (
    <div className='w-full max-w-6xl m-5 '>
      <p className='mb-3 text-lg font-medium'>All Appointment</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctors</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {
          appointment.map((item, index) => (
            <div className='flex flex-wrap justify-between max-sm:gap-4 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100' key={index}>
              <p className='max-sm:hidden'>{index+1}</p>

              <div className='flex items-center gap-2'>
                <img className='w-10 h-10 rounded-full' src={item.userData.Image} alt="image" /> <p>{item.userData.name} </p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)} </p>
              <p>{slotDateFormat(item.slotDate)} , {item.slotTime}</p>
                 <div className='flex items-center gap-2'>
                <img className='w-10 h-10 rounded-full bg-gray-200' src={item.docData.image} alt="image" /> <p>{item.docData.name} </p>
              </div>
              <p>{currency}{item.amount}</p>
              {
                item.cancelled
                ? <p className='text-red-400 text-sm font-medium'>Cancelled</p>
                : item.isCompleted 
                ? <p className='text-green-500 text-sm font-medium'>Completed</p> 
                : <img onClick={() => appointmentCancel(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="cancel icon" />
              }
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default AllAppointment