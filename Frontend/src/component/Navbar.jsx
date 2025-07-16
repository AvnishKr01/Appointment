import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'

const Navbar = () => {

    const{token, setToken, navigate, userData} = useAuth();

    const [showMenu, setShowMenu] = useState()

    const logout = () => {
            setToken('')
            localStorage.removeItem('token')
    }


    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
            <img className='w-44 cursor-pointer' src={assets.logo} alt="logo" />
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'>
                    <li className='py-1'>Home</li>
                    <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/doctors'>
                    <li className='py-1'>All Doctor</li>
                    <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='about'>
                    <li className='py-1'>About</li>
                    <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='contact'>
                    <li className='py-1'>Contact</li>
                    <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden' />
                </NavLink>
            </ul>
            <div className="flex items-center gap-4">
                {token && userData ?
                    <div className='flex items-center gap-2 cursor-pointer group relative'>
                        <img className='w-10 h-10 rounded-full bg-gray-200' src={userData.Image} alt="profile" />
                        {/* <img className='w-2.5' src={assets.dropdown_icon} alt="profile" /> */}
                        <div className='absolute top-0 right-0 pt-14.5 text-md font-medium text-gray-600 z-20 hidden group-hover:block'>
                            <div className='min-w-38 bg-stone-100 rounded flex flex-col gap-3  p-3'>
                                <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                <p onClick={() => navigate('/my-appointment')} className='hover:text-black cursor-pointer'>My Appointment</p>
                                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                            </div>
                        </div>
                    </div>
                    :
                    <button onClick={() => navigate('/login')} className='bg-[#5f6FFF] text-white px-4 py-2 rounded-full font-light hidden md:block'>Create Account</button>
                }
                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="menu icon" />
             {/*------------------------- Mobile Menu ----------------- */}
             <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden bottom-0 right-0 top-0 z-20 overflow-hidden bg-white transition-all `}>
                <div className='flex items-center justify-between px-5 py-6'>
                    <img className='w-36' src={assets.logo} alt="logo" />
                    <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="cross icon" />
                </div>
                <ul className='flex flex-col gap-2 items-center mt-5 px-6 text-lg font-medium'>
                    <NavLink className={'px-4 py-2 rounded-full inline-block'} onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
                    <NavLink className={'px-4 py-2 rounded-full inline-block'} onClick={() => setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>All Doctor</p></NavLink>
                    <NavLink className={'px-4 py-2 rounded-full inline-block'} onClick={() => setShowMenu(false)} to='/about' ><p className='px-4 py-2 rounded inline-block'>About</p></NavLink>
                    <NavLink className={'px-4 py-2 rounded-full inline-block'} onClick={() => setShowMenu(false)} to='/contact' ><p className='px-4 py-2 rounded inline-block'>Contact</p></NavLink>
                </ul>
             </div>
            </div>
        </div>
    )
}

export default Navbar