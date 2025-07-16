import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='md:mx-10 cursor-pointer'>
            <div className="flex felx-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                {/* ------------------- Left Side --------------------- */}
                <div className="">
                    <img className='mb-4 w-35' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptatum nesciunt corrupti cumque quo laudantium,
                        blanditiis soluta ab commodi exercitationem!
                    </p>
                </div>
                {/* ------------------- middle --------------------- */}
                <div className="">
                    <p className='text-lg text-gray-800 font-medium mb-4'>Company</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                {/* ------------------- Right Side --------------------- */}
                <div className="">
                <p className='text-lg text-gray-800 font-medium mb-4'>Get In Touch</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91 93788-73522</li>
                    <li>Avnish011kuamr@gmail.com</li>
                </ul>
                </div>
            </div>
                {/*--------------------- Copy Right ------------- */}
            <div>
                <hr />
                <p className='pt-5 text-sm text-center'>Copyright 2@25 Appointment -All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer