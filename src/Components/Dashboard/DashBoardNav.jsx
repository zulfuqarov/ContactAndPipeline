import React from 'react'
import { useContext } from 'react'
import { ContextCrm } from '../../ContextCrm/ContextCrm'

const DashBoardNav = () => {

    const { userData } = useContext(ContextCrm)

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className='px-[40px] py-[40px]'>
            <p className='text-[32px] text-[#031225] font-medium'>Welcome back, {userData && userData.name}!</p>
            <span className='text-[20px] text-[#7C838B]'>{formattedDate}</span>
        </div>
    )
}

export default DashBoardNav
