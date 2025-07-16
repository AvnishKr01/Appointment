import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth';
import { useParams } from 'react-router-dom';

const Doctors = () => {
  const {speciality} = useParams()
  const {doctors, navigate} = useAuth();
  const [filters, setFilters] = useState([]);
  const [showFilter, setShowFilter] = useState(false) 

  const applyFilters = () => {
    if(speciality) {
      setFilters(doctors.filter(doc => doc.speciality === speciality))
    }else{
      setFilters(doctors); 
    }
  }

  useEffect(() => {
    applyFilters()
  },[doctors, speciality])
  return ( 
    <div>
      <p className='text-gray-600'>Browser through for doctors specialities</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-6'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-[#5f6FFF] text-white" : " "}`} onClick={() => setShowFilter(prev => !prev)}>Filter</button>
        {/*----------------- Filter side -------------------*/}
        <div  className={`flex flex-col gap-4 text-gray-600 text-sm ${ showFilter ? 'flex' : "hidden sm:flex"}`}>
          <p onClick={() => speciality === 'General Physician' ? navigate('/doctors') : navigate('/doctors/General Physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General Physician" ? "bg-indigo-100 text-black" : ""}`}>General Physician</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
          <p onClick={() => speciality === 'Prediatricians' ? navigate('/doctors') : navigate('/doctors/Prediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Prediatricians" ? "bg-indigo-100 text-black" : ""}`}>Prediatricians</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
          <p onClick={() => speciality === 'Gestroenterologist' ? navigate('/doctors') : navigate('/doctors/Gestroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer not-last: ${speciality === "Gestroenterologist" ? "bg-indigo-100 text-black" : ""}`}>Gestroenterologist</p>
        </div>
        {/*----------------- Doctors side -------------------*/}
        <div className='w-full grid [grid-template-columns:repeat(auto-fill,minmax(180px,1fr))] gap-4 gap-y-6 px-3 sm:px-0'>
        {
          filters.map((item, index) => (
             <div onClick={() => navigate(`/appointment/${item._id}`)} key={index} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
                            <img className='bg-blue-50' src={item.image} alt="image" />
                            <div className='p-4'>
                               <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-600'} `}>
                                    <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-800'}  rounded-full`}></p>
                                    <p>{item.available ? 'Available' : 'Not Available'}</p>
                                </div>
                                <p className='text-gray-900 text-md font-medium'>{item.name}</p>
                                <p className='text-gray-600 text-sm'>{item.speciality}</p>
                            </div>
                        </div>
          ))
        }
        </div>
      </div>
    </div>
  )
}

export default Doctors