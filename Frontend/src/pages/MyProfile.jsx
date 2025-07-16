import React, { useState } from 'react'
import { useAuth } from '../context/auth'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify';
import axios from 'axios'

const Myprofile = () => {
  const { userData, setUserData, token, backendUrl, loadUserData } = useAuth();
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(null)

  const updateProfileImage = async () => {
    try {
      const formData = new FormData();

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('gender', userData.gender)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('dob', userData.dob)

      image && formData.append('image', image)

      const { data } = await axios.post(`${backendUrl}/api/user/updateprofile`, formData, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        await loadUserData();
        setIsEdit(false)
        setImage(false)
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>

      {
        isEdit ?
          <label htmlFor="image">
            <div className='inline-block relative cursor-pointer'>
              <img className='w-36 border border-gray-800 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.Image} alt="" />
              <img className='w-10 absolute bottom-12 right-12' src={image ? " " : assets.upload_icon} alt="" />
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden/>
          </label>
          :
          <img className='w-30 h-30 rounded-full bg-gray-200 ' src={userData.Image} alt='userData image' />
      }
      {isEdit ? (
        <input
          className='bg-slate-50 text-3xl font-medium max-w-60 mt-4 outline-none'
          type='text'
          value={userData.name}
          onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
        />
      ) : (
        <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      )}
      <hr className='h-[1px] border-none' />
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
          <p className='text-[#5f6FFF]'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {isEdit ? (
            <input className='bg-slate-100 max-w-28 text-center px-2 outline-none'
              type='number'
              value={userData.phone}
              onChange={e =>
                setUserData(prev => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className='text-[#5f6FFF]'>{userData.phone}</p>
          )}
          <p className='font-medium'>Address:</p>
          {isEdit ? (
            <p>
              <input className='bg-slate-100 max-w-40 px-1 outline-none'
                type='text'
                value={userData.address.line1}
                onChange={e =>
                  setUserData(prev => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value }
                  }))
                }
              />
              <br />
              <input className='bg-slate-100 max-w-40 px-1 outline-none'
                type='text'
                value={userData.address.line2}
                onChange={e =>
                  setUserData(prev => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value }
                  }))
                }
              />
            </p>
          ) : (
            <p className='text-[#5f6FFF]'>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {isEdit ? (
            <select className='max-w-20'
              value={userData.gender}
              onChange={e =>
                setUserData(prev => ({ ...prev, gender: e.target.value }))}>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
          ) : (
            <p className='text-gray-500'>{userData.gender}</p>
          )}
          <p className='font-medium'>Date Of Birth:</p>
          {isEdit ? (
            <input className='max-w-28 bg-slate-100 outline-none'
              type='date'
              value={userData.dob}
              onChange={e =>
                setUserData(prev => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className='text-gray-500'>{userData.dob}</p>
          )}
        </div>
      </div>
      <div className='mt-10'>
        {isEdit ? (
          <button className='border border-[#5f6FFF] px-8 py-2 rounded hover:bg-[#5f6FFF] hover:text-white transition-all duration-500' onClick={updateProfileImage}>Save Information</button>
        ) : (
          <button className='border border-[#5f6FFF] px-8 py-2 rounded hover:bg-[#5f6FFF] hover:text-white transition-all duration-500' onClick={() => setIsEdit(true)}>Edit</button>
        )}
      </div>
    </div>
  )
}

export default Myprofile
