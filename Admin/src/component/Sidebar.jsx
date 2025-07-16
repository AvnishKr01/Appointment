import React from 'react'
import { useAdmin } from '../context/AdminContext'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useDoctor } from '../context/DoctorContext';

const Sidebar = () => {

  const { atoken } = useAdmin();
  const {dToken} = useDoctor();
  return (
    <div className='min-h-screen bg-white border-r '>

        {/******************************* Admin Sidebar *********************************/}

      {atoken && <ul className='text-[#515151] mt-5'>
        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-60 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]' : ''}`} to={'/dashboard'}>
          <img src={assets.home_icon} alt="" />
          <li className='hidden md:block' >DASHBOARD</li>
        </NavLink>

        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-60 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]' : ''}`} to={'/allappointment'}>
          <img src={assets.appointment_icon} alt="" />
          <li className='hidden md:block' >All Appointment</li>
        </NavLink>

        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-60 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]' : ''}`} to={'/adddoctor'}>
          <img src={assets.add_icon} alt="" />
          <li className='hidden md:block' >Add Doctor</li>
        </NavLink>

        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-60 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]' : ''}`} to={'/doctorlist'}>
          <img src={assets.people_icon} alt="" />
          <li className='hidden md:block' >Doctor List</li>
        </NavLink>

      </ul>
      }

      {/******************************* Doctor Sidebar *********************************/}

      {dToken && <ul className='text-[#515151] mt-5'>
        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-60 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]' : ''}`} to={'/doctor-dashboard'}>
          <img src={assets.appointment_icon} alt="" />
          <li className='hidden md:block' >Dashboard</li>
        </NavLink>

        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-60 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]' : ''}`} to={'/doctor-appointment'}>
          <img src={assets.home_icon} alt="" />
          <li className='hidden md:block' >Appointment</li>
        </NavLink>

        <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-60 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]' : ''}`} to={'/doctor-profile'}>
          <img src={assets.add_icon} alt="" />
          <li className='hidden md:block' >Profile</li>
        </NavLink>

      </ul>
      }
    </div>
  )
}

export default Sidebar