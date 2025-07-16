import React, { useEffect } from 'react'
import { useDoctor } from '../../context/DoctorContext'
import { assets } from '../../assets/assets';
import { useApp } from '../../context/AppContext';

const DoctorDashboard = () => {

  const {dashData, setDashData, dashboardDoctor, dToken, appointmentCancel, appointmentComplete} = useDoctor();
  const {slotDateFormat, currency} = useApp();

  useEffect(() => {
    if(dToken){
      dashboardDoctor();
    }
  },[dToken])
  return dashData && (
    <div className='m-5'>
          <div className='flex flex-wrap gap-3'>
    
            <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300'>
              <img className='w-14' src={assets.earning_icon} alt="doctor_icon" />
              <div>
                <p className='text-xl font-semibold text-gray-600'>{currency} {dashData.earning}</p>
                <p className='text-gray-400'>Earning</p>
              </div>
            </div>
    
            <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300'>
              <img className='w-14' src={assets.appointments_icon} alt="doctor_icon" />
              <div>
                <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
                <p className='text-gray-400'>Appointments</p>
              </div>
            </div>
    
            <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300'>
              <img className='w-14' src={assets.patients_icon} alt="doctor_icon" />
              <div>
                <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
                <p className='text-gray-400'>Patients</p>
              </div>
            </div>
    
          </div>
    
          <div className='bg-white'>
    
            <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-200'>
              <img src={assets.list_icon} alt="list-icon" />
              <p className='font-semibold'>Latest Booking</p>
            </div>
    
            <div className='pt-4 border  border-gray-300'>
              {
                dashData.latestAppointments.map((item, index) => (
                  <div className='flex items-center px-6 py-3 gap-3 border-b border-gray-100 hover:bg-gray-100' key={index}>
                    <img className='w-10 h-10 rounded-full bg-gray-200' src={item.userData.Image} alt="" />
                    <div className='flex-1 text-sm'>
                      <p className='text-gray-800 font-medium'>{item.userData.name}</p> 
                      <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                    </div>
                     {
                                    item.cancelled ? <p className='text-sm font-medium text-red-400'>Cancelled</p> : item.isCompleted ? <p className='text-sm font-medium text-green-500'>Completed</p>
                                    :
                                  <div className='flex'>
                                    <img onClick={() => appointmentCancel(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="cancel icon" />
                                    <img onClick={() => appointmentComplete(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="tick icon" />
                                  </div>
                                  }
                  </div>
                ))
              }
            </div>
    
          </div>
    
        </div>
  )
}

export default DoctorDashboard