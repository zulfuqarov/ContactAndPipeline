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
    <div className='px-[20px] pt-[20px] '>
      <div className='flex  items-center'>
        <div className='w-[48px]'>
          <img className='w-full' src={Logo} alt="" />
        </div>
        <p className='pl-[10px] text-[26px]'>Lead2b</p>
      </div>
      <div className='flex flex-col mx-auto py-[40px] justify-center items-center bg-white w-[520px]'>
        <div className='flex flex-col justify-center items-center w-[300px] text-center'>
          <p className='text-[40px] text-[#000000] pb-[10px]'>Log <span className='text-[#031225]'>in</span></p>
          <span className='text-[#031225] text-[16px] '>Enter your credentials to securely log into your account.</span>
        </div>

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

          <div className='pt-[10px]'>
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
        </div>

        <div className='pt-[30px]'>
          <div className='mb-[20px] w-[432px] flex relative items-center'>
            <div className='flex-grow border border-[#D2D2D5]'></div>
            <span className='mx-2'>Or</span>
            <div className='flex-grow border border-[#D2D2D5]'></div>
          </div>
          <button class="flex  items-center justify-center w-[432px] h-[44px] bg-white border border-[#D2D2D5] rounded-lg px-4 py-2 hover:bg-gray-100 transition duration-200">
            <img src={GoogleLogo} alt="Google Logo" class="h-5 mr-2" />
            <span class="text-gray-700">Continue with Google</span>
          </button>
        </div>

      </div>
    </div>
  )
}

export default Left
