import React, { useState, useEffect } from 'react'
import Logo from "../../Assets/Img/Logo.svg"
import { useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { ContextUserData } from '../../ContextCrm/ContextUser';

const ChangePassowrdCenter = () => {

    const { ChangePassword } = useContext(ContextUserData)

    const [searchParams] = useSearchParams();
    const [error, seterror] = useState({})


    const [changePasswordInput, setChangePasswordInput] = useState({
        userId: Number(searchParams.get('userId')) || '',
        token: searchParams.get('token') || '',
    });
    const handeleChangePassowrd = (e) => {
        const { name, value } = e.target
        setChangePasswordInput({ ...changePasswordInput, [name]: value })
    }

    const validateInputs = () => {
        const newErrors = {};

        // password validasyonu
        if (!changePasswordInput.Newpassword || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(changePasswordInput.Newpassword)) {
            newErrors.Newpassword = 'Password must be 8+ chars, with uppercase, lowercase, number, and symbol.';
        }

        // password validasyonu
        if (!changePasswordInput.ReNewpassword || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(changePasswordInput.ReNewpassword)) {
            newErrors.ReNewpassword = 'Password must be 8+ chars, with uppercase, lowercase, number, and symbol.';
        }

        if (changePasswordInput.Newpassword !== changePasswordInput.ReNewpassword) {
            newErrors.password = 'Passwords do not match.';
        }

        return newErrors;

    }

    useEffect(() => {
        setChangePasswordInput({
            userId: Number(searchParams.get('userId')) || '',
            token: searchParams.get('token') || ''
        });
    }, [searchParams]);

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
                        <p className='text-[40px] text-[#000000] pb-[10px]'>Change  <span className='text-[#031225]'>password?</span></p>
                        <span className='text-[#031225] text-[16px] inline-block w-[300px]'>Don’t forget to store your new password securely.</span>
                        {
                            error.password ? <p className='text-red-500 text-[13px] pt-[7px] h-[25px]'>{error.password}</p> : ''
                        }
                    </div>

                    <div>
                        <div className='pt-[30px] flex flex-col'>
                            <label className='text-[#031225] pb-[10px]' htmlFor="">New password</label>
                            <input
                                onChange={handeleChangePassowrd}
                                value={changePasswordInput.Newpassword || ''}
                                name='Newpassword'
                                type="password"
                                className={`w-[432px] h-[44px] px-4 py-2 gap-2 rounded border focus:outline-none
                                ${changePasswordInput.Newpassword ? error.Newpassword ? 'border-red-500' : 'border-blue-500' : 'border-[#D2D2D5]'}
                                    `}
                                placeholder='Enter at least 8 characters'
                            />
                            {
                                error.Newpassword ? <p className='text-red-500 text-[13px] pt-[7px] h-[25px]'>{error.Newpassword}</p> : ''
                            }
                        </div>
                        <div className='pt-[30px] flex flex-col'>
                            <label className='text-[#031225] pb-[10px]' htmlFor="">Confirm new password</label>
                            <input
                                onChange={handeleChangePassowrd}
                                value={changePasswordInput.ReNewpassword || ''}
                                name='ReNewpassword'
                                type="password"
                                className={`w-[432px] h-[44px] px-4 py-2 gap-2 rounded border focus:outline-none
                                    ${changePasswordInput.ReNewpassword ? error.ReNewpassword ? 'border-red-500' : 'border-blue-500' : 'border-[#D2D2D5]'}
                                        `}
                                placeholder='Enter new password'
                            />
                            {
                                error.ReNewpassword ? <p className='text-red-500 text-[13px] pt-[7px] h-[25px]'>{error.ReNewpassword}</p> : ''
                            }
                        </div>

                        <div className='pt-[20px]'>
                            <button
                                onClick={() => {
                                    const validationErrors = validateInputs();
                                    seterror(validationErrors);

                                    if (Object.keys(validationErrors).length === 0) {
                                        ChangePassword(changePasswordInput)
                                    }
                                }}
                                className="w-[432px] h-[44px] px-4 py-2 gap-2 rounded bg-[#1971F6] text-white border "
                            >
                                Change my password
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ChangePassowrdCenter