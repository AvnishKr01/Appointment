import React from 'react'
import { assets } from '../assets/assets'

const About = () => {

  return (
    <div>
      <div className='text-2xl text-center pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium '>US</span></p>
      </div>
      <div className='flex flex-col my-10 sm:flex-row  gap-12'>
        <img className='w-full md:max-w-[370px]' src={assets.about_image} alt="about image" />
        <div className='flex flex-col justify-center gap-4 md:w-2/4 text-md text-gray-600'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente quibusdam debitis, deserunt nihil error aliquid deleniti quod rerum illo suscipit provident nam. Iusto, consectetur obcaecati neque ducimus adipisci natus repellat!</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente quibusdam debitis, deserunt nihil error aliquid deleniti quod rerum illo suscipit provident nam. Iusto, consectetur obcaecati neque ducimus adipisci natus repellat!</p>
          <b className='text-gray-800'>Our Vission</b>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente quibusdam debitis, deserunt nihil error aliquid deleniti quod rerum illo suscipit provident nam. Iusto, consectetur obcaecati neque ducimus adipisci natus repellat!</p>
        </div>
      </div>

      <div className='text-xl my-4 text-gray-500'>
        <p>WHY <span className='text-gray-700 font-semibold '>CHOOSE US</span></p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border border-gray-200 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EEFICIENCY:</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className='border border-gray-200  px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>CONVENIENCE:</b>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
        </div>
        <div className='border border-gray-200  px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>PERSONALIZATION:</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
    </div>
  )
}

export default About