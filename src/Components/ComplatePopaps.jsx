import React, { useContext } from 'react'
import ComplateLogo from "../Assets/Img/ComplateLogo.svg"
import { ContextCrm } from '../ContextCrm/ContextCrm'
const ComplatePopaps = () => {

    const { succesPopaps, setsuccesPopaps } = useContext(ContextCrm)

    if (succesPopaps) {
        setTimeout(() => {
            setsuccesPopaps(false)
        }, 2500)
    }

    return (

        succesPopaps ?

            <div className='w-full h-full fixed z-50 flex justify-center items-center'>
                <div className='text-center animate-fall'>
                    <img src={ComplateLogo} alt="" />
                    <div className='bg-[#FFFFFF] p-4 rounded-lg shadow-lg'>
                        <p className='text-[20px] text-[#7C838B]'>Go, go, go! <br />
                            Congrats for your first deal!</p>
                    </div>
                </div>
            </div> : null
    )
}

export default ComplatePopaps
