import React from 'react'
import { useContext } from 'react'
import { ContextCrm } from '../../ContextCrm/ContextCrm'

const DashBoardNav = () => {

    const { userData } = useContext(ContextCrm)

    return (
        <div className='px-[70px] py-[40px]'>
            <p className='text-[32px] text-[#031225] font-medium'>Welcome back, {userData && userData.name}!</p>
            <span className='text-[20px] text-[#7C838B]'>27 October, 2024</span>
        </div>
    )
}

export default DashBoardNav
