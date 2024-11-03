import React, { useContext, useState } from 'react'
import Logo from "../../Assets/Img/Logo.svg"
import GoogleLogo from "../../Assets/Img/GoogleLogo..svg"
import { Link } from 'react-router-dom'
import { ContextUserData } from '../../ContextCrm/ContextUser'
const Left = () => {
    const { loginApi } = useContext(ContextUserData)

    const [loginInput, setloginInput] = useState({})
    const [error, seterror] = useState({})


    const handleChangeloginInput = (e) => {
        const { name, value } = e.target
        setloginInput({ ...loginInput, [name]: value })
    }

    const validateInputs = () => {
        const newErrors = {};

        // Email validasyonu
        if (!loginInput.email || !/^\S+@\S+\.\S+$/.test(loginInput.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // password validasyonu
        if (!loginInput.password || loginInput.password.length < 8) {
            newErrors.password = 'Password must be 8+ chars, with uppercase, lowercase, number, and symbol.';
        }

        return newErrors;

    }

    return (
        <div className='basis-1/2 flex flex-col items-center h-[580px]'>
            <div className='w-[58px]'>
                <img className='w-full' src={Logo} alt="" />
            </div>
            <div className='pt-[20px]'>
                <p className='text-[32px] font-light '>Welcome to <span className='font-medium'>Lead2B!</span></p>
            </div>
            <div className='pt-[20px]'>
                <p className='text-[24px] font-light'>Streamline workflows and gain clear visibility across teams.</p>
            </div>

            <div className='flex flex-col mx-auto py-[40px] justify-center items-center  w-[520px]'>
                <div>

                    <div className='pt-[30px] flex flex-col'>
                        <label className='text-[#031225] pb-[10px]' htmlFor="">Email</label>
                        <input
                            name='email'
                            value={loginInput.email || ''}
                            onChange={handleChangeloginInput}
                            type="email"
                            className={`w-[432px] h-[44px] px-4 py-2 gap-2 rounded border  focus:outline-none ${loginInput.email ? error.email ? 'border-red-500' : 'border-blue-500' : 'border-[#D2D2D5]'}`}
                            placeholder='name@example.com'
                        />
                        {
                            error.email ? <p className='text-red-500 text-[13px] pt-[7px] h-[25px]'>{error.email}</p> : ''
                        }
                    </div>

                    <div className='pt-[30px] flex flex-col'>
                        <label className='text-[#031225] pb-[10px]' htmlFor="">Password</label>
                        <input
                            name='password'
                            value={loginInput.password || ''}
                            onChange={handleChangeloginInput}
                            type="password"
                            className={`w-[432px] h-[44px] px-4 py-2 gap-2 rounded border    focus:outline-none
                ${loginInput.password ? error.password ? 'border-red-500' : 'border-blue-500' : 'border-[#D2D2D5] '}
                `} placeholder='Enter your password'
                        />
                        {
                            error.password ? <p className='text-red-500 text-[13px] pt-[7px] h-[25px]'>{error.password}</p> : ''
                        }
                    </div>

                    <div className='pt-[10px] flex justify-end'>
                        <Link to="/Forget-Password" className=' text-[#1971F6] border-b border-[#1971F6]'>Forgot your password?</Link>
                    </div>

                    <div className='pt-[20px]'>
                        <button
                            onClick={() => {
                                const validationErrors = validateInputs();
                                seterror(validationErrors);

                                if (Object.keys(validationErrors).length === 0) {
                                    loginApi(loginInput)
                                }
                            }}
                            className="w-[432px] h-[44px] px-4 py-2 gap-2 rounded bg-[#1971F6] text-white border "
                        >
                            Log in
                        </button>
                    </div>

                    <div className='pt-[10px]'>
                        <div className='pt-[5px] flex flex-col justify-center items-center '>
                            <p className='text-[#031225] pt-[10px]'>Create New account <Link to="/Register" className='font-medium text-[#1971F6]'>Register</Link></p>
                            <p className='text-[#686868] font-normal pt-[10px]'>By signing up, you agree to our <span className='text-[#031225]  font-medium'>Terms</span> & <span className='text-[#031225] font-medium'>Privacy</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Left