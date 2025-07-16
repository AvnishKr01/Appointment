import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useAdmin } from '../../context/AdminContext'
import axios from 'axios';
import { toast } from 'react-toastify'

const AddDoctor = () => {

  const [image, setImage] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General Physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl, atoken } = useAdmin();



  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!image) {
        return toast.error('image not selected')
      }

      const formData = new FormData();

      formData.append('image', image)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

      formData.forEach((value, key) => {
        // console.log(` data: ${key}, ${value}`);

      });

      const { data } = await axios.post(`${backendUrl}/api/admin/admin-add`, formData, { headers: { atoken } });
      if (data.success) {
        toast.success("Doctor Added")
        setImage(false);
        setName('')
        setEmail('')
        setExperience('1 Year')
        setDegree('')
        setAbout('')
        setAddress1('')
        setAddress2('')
        setPassword('')
        setSpeciality('General Physician')
        setFees('')
      }else{
        toast.error(error.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>

      <div className='bg-white px-8 py-8 border-white shadow-lg rounded w-full max-w-4xl max-h-[100vh] overflow-y-scroll'>

        <div className='flex items-center gap-4 mb-8 text-gray-400'>
          <label htmlFor="doc-img">
            <img className='w-16 bg-gray-400 rounded-full cursor-pointer' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="doc-img" hidden />
          <p>Upload Doctor <br /> Picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className='border border-gray-300 outline-none rounded px-2 py-1' type="text" placeholder='Enter your name' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-gray-300 outline-none rounded px-2 py-1' type="email" placeholder='Enter your email' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-gray-300 outline-none rounded px-2 py-1' type="Password" placeholder='Enter your password' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border border-gray-300 outline-none rounded px-2 py-1'>
                <option value="1">1 Year</option>
                <option value="2">2 Year</option>
                <option value="3">3 Year</option>
                <option value="4">4 Year</option>
                <option value="5">5 Year</option>
                <option value="6">6 Year</option>
                <option value="7">7 Year</option>
                <option value="8">8 Year</option>
                <option value="9">9 Year</option>
                <option value="10">10 Year</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className='border border-gray-300 outline-none rounded px-2 py-1' type="number" placeholder='Doctor Fees' required />
            </div>
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border border-gray-300 outline-none rounded px-2 py-1'>
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Prediatricians">Prediatricians</option>
                <option value="Neurologis">Neurologis</option>
                <option value="Gestroenterologist">Gestroenterologist</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Education</p>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border border-gray-300 outline-none rounded px-2 py-1' type="text" placeholder='Doctor Education' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border border-gray-300 outline-none rounded px-2 py-1' type="text" placeholder='Address1' required />
              <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='border border-gray-300 outline-none rounded px-2 py-1' type="text" placeholder='Address2' required />
            </div>

          </div>
        </div>

        <div >
          <p className='mt-4 mb-2'>About Doctor</p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 py-2 border border-gray-300 outline-none rounded' placeholder='write about doctor' rows={5} required />
        </div>
        <button type='submit' className='bg-[#5f6FFF] text-white mt-2 px-10 py-2 rounded-sm'>Add Doctor</button>
      </div>
    </form>
  )
}

export default AddDoctor