import React from 'react'
import RegisterLeft from '../Components/Register/RegisterLeft'
import RegisterRight from '../Components/Register/RegisterRight'
import Logo from "../Assets/Img/Logo.svg"

const Register = () => {
    return (
        <div className='h-[100vh]'>
            <div className='flex h-[10%] items-center'>
                <div className='w-[48px]'>
                    <img className='w-full' src={Logo} alt="" />
                </div>
                <p className='pl-[10px] text-[26px]'>Lead2b</p>
            </div>
            <div className='flex justify-center items-center h-[90%] px-[20px]'>
                <RegisterLeft />
                <RegisterRight />
            </div>
        </div>
    )
}

export default Register
