import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, About, Contact, Login, Doctors, Appointment, Myprofile, MyAppointment, Navbar, Footer } from './pages/Index'
import { ToastContainer } from 'react-toastify';


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]' >
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/my-appointment' element={<MyAppointment />} />
        <Route path='/my-profile' element={<Myprofile />} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App