import React, { useContext, useState } from 'react'
import Logo from "../../Assets/Img/Logo.svg"
import { ContextUserData } from '../../ContextCrm/ContextUser'
const ForgetPasswordCenter = () => {

    const { forgetPassword } = useContext(ContextUserData)

    const [emailInput, setemailInput] = useState('')
    const [error, seterror] = useState({})

    const handleEmailInput = (e) => {
        setemailInput(e.target.value)
    }

    const validateInputs = () => {
        const newErrors = {};

        // Email validasyonu
        if (!emailInput || !/^\S+@\S+\.\S+$/.test(emailInput)) {
            newErrors.email = 'Please enter a valid email address';
        }

        return newErrors;

    }

    return (
        <div>
            <div className='px-[20px] pt-[20px] '>
                <div className='flex  items-center'>
                    <div className='w-[48px]'>
                        <img className='w-full' src={Logo} alt="" />
                    </div>
                    <p className='pl-[10px] text-[26px]'>Lead2b</p>
                </div>

                <div className='flex flex-col mx-auto py-[40px] justify-center items-center bg-white w-[520px]'>
                    <div className='flex flex-col justify-center items-center w-[408px] text-center'>
                        <p className='text-[40px] text-[#000000] pb-[10px]'>Forgot your <span className='text-[#031225]'>password?</span></p>
                        <span className='text-[#031225] text-[16px] inline-block w-[300px]'>Enter your registered email address to receive a password reset link.</span>
                    </div>

                    <div>
                        <div className='pt-[30px] flex flex-col'>
                            <label className='text-[#031225] pb-[10px]' htmlFor="">Email</label>
                            <input
                                value={emailInput}
                                onChange={handleEmailInput}
                                type="email"
                                className={`w-[432px] h-[44px] px-4 py-2 gap-2 rounded border focus:outline-none ${emailInput ? error.email ? "border-red-500" : "border-blue-500" : "border-[#D2D2D5]"}`} placeholder='name@example.com'
                            />
                            {
                                error.email ? <p className='text-red-500 text-[13px] pt-[7px] h-[25px]'>{error.email}</p> : ''
                            }
                        </div>

                        <div className='pt-[20px]'>
                            <button
                                onClick={() => {
                                    const errors = validateInputs();
                                    seterror(errors);
                                    if (Object.keys(errors).length === 0) {
                                        forgetPassword(emailInput)
                                    }
                                }}
                                className="w-[432px] h-[44px] px-4 py-2 gap-2 rounded bg-[#1971F6] text-white border "
                            >
                                Reset password
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ForgetPasswordCenter
