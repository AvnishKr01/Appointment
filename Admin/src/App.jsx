import React from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { useAdmin } from './context/AdminContext';
import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AddDoctor from './pages/Admin/AddDoctor';
import AllAppointment from './pages/Admin/AllAppointment';
import DoctorList from './pages/Admin/DoctorList';
import { useDoctor } from './context/DoctorContext';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {

  const { atoken } = useAdmin();
  const { dToken } = useDoctor();

  return atoken || dToken ? (
    <div className='bg-[#F9F8FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* Admin Routes */}
          <Route path='/' element={<></>} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/adddoctor' element={<AddDoctor />} />
          <Route path='/allappointment' element={<AllAppointment />} />
          <Route path='/doctorlist' element={<DoctorList />} />

          {/* Doctor Routes */}
          <Route path='/doctor-appointment' element={<DoctorAppointment/>} />
          <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
          <Route path='/doctor-profile' element={<DoctorProfile/>} />
        </Routes>
      </div>
    </div>
  )
    :
    (
      <>
        <Login />
        <ToastContainer />
      </>
    )
}

export default App