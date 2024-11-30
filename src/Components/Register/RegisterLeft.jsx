import React, { useContext, useState } from 'react'
import { ContextUserData } from '../../ContextCrm/ContextUser'

const RegisterLeft = () => {

    const { registerApi } = useContext(ContextUserData)

    const [registerInput, setregisterInput] = useState({})
    const [error, seterror] = useState({})

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setregisterInput({ ...registerInput, [name]: value })
    }

    const validateInputs = () => {
        const newErrors = {};

        // Name validasyonu: En az 3 karakter
        if (!registerInput.name || registerInput.name.length < 3 || !/^[a-zA-Z\s]+$/.test(registerInput.name)) {
            newErrors.name = 'Name should be at least 3 letters and contain only letters';
        }

        // Company name validasyonu
        if (!registerInput.surname || registerInput.surname.length < 4) {
            newErrors.surname = 'Name should be at least 3 letters and contain only letters';
        }

        // Company name validasyonu
        if (!registerInput.companyName || registerInput.companyName.length < 3) {
            newErrors.companyName = 'Company name should be at least 3 letters';
        }

        // Email validasyonu
        if (!registerInput.email || !/^\S+@\S+\.\S+$/.test(registerInput.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validasyonu 
        const azerbaijanPhoneRegex = /^\+994(50|55|70|77|51|99|099|010|10|051|050|055|070|077)\d{7}$/;

        if (!registerInput.phone || !azerbaijanPhoneRegex.test(registerInput.phone)) {
            newErrors.phone = 'Please enter a valid Azerbaijan phone number';
        }

        // surname validasyonu: En az 3 karakter
        if (!registerInput.surname || registerInput.surname.length < 4 || !/^[a-zA-Z\s]+$/.test(registerInput.surname)) {
            newErrors.surname = 'surname should be at least 4 letters and contain only letters';
        }

        // companyDomain validasyonu: En az 3 karakter
        if (!registerInput.companyDomain || registerInput.companyDomain.length < 4 || !/^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/.test(registerInput.companyDomain)) {
            newErrors.companyDomain = 'Please enter a valid domain (e.g., example.com) with at least 4 characters.';
        }

        // password validasyonu: En az 3 karakter

        if (!registerInput.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(registerInput.password)) {
            newErrors.password = 'Password must be 8+ chars, with uppercase, lowercase, number, and symbol.';
        }

        return newErrors;
    };


    return (
        <div className='basis-1/2'>
            <div >
                <p className='text-[40px] text-[#000000] pb-[10px]'>Create your account</p>
            </div>

            <div className='flex space-x-2 w-full'>
                <div className='w-[50%]'>
                    <div className='pt-[30px] flex flex-col'>
                        <label className='text-[#031225] pb-[10px]' htmlFor="">Name</label>
                        <input
                            name='name'
                            onChange={handleChangeInput}
                            value={registerInput.name || ''}
                            type="text"
                            className={`w-[350px] h-[44px] px-4 py-2 gap-2 rounded border   focus:outline-none ${registerInput.name ? error.name ? 'border-red-500' : 'border-blue-500' : 'border-[#D2D2D5]'}`} placeholder='Enter your name'
                        />
                        {
                            error.name ? <p className='text-red-500 text-[13px] pt-[7px] h-[25px]'>{error.name}</p> : ''
                        }
                    </div>
                    <div className='pt-[30px] flex flex-col'>
                        <label className='text-[#031225] pb-[10px]' htmlFor="">Company name</label>
                        <input
                            name='companyName'
                            onChange={handleChangeInput}
                            value={registerInput.companyName || ''}
                            type="text"
                            className={`w-[350px] h-[44px] px-4 py-2 gap-2 rounded border    focus:outline-none ${registerInput.companyName ? error.companyName ? 'border-red-500' : 'border-blue-500' : 'border-[#D2D2D5] '}`} placeholder='Enter your company name'
                        />
                        {
                            error.companyName ? <p className='text-red-500 text-[13px] pt-[7px] h-[25px]'>{error.companyName}</p> : ''
                        }
                    </div>
                    <div className='pt-[30px] flex flex-col'>
                        <label className='text-[#031225] pb-[10px]' htmlFor="">Email</label>
                        <input
                            name='email'
                            onChange={handleChangeInput}
                            value={registerInput.email || ''}
                            type="email"
                            className={`w-[350px] h-[44px] px-4 py-2 gap-2 rounded border   focus:outline-none ${registerInput.email ? error.email ? 'border-red-500' : 'border-blue-500' : 'border-[#D2D2D5] '}`} placeholder='Email'
                        />
                        {
                            error.email ? <p className='text-red-500 text-[13px] pt-[7px] h-[25px]'>{error.email}</p> : ''
                        }
                    </div>
                    <div className='pt-[30px] flex flex-col'>
                        <label className='text-[#031225] pb-[10px]' htmlFor="">Phone</label>
                        <input
                            name='phone'
                            onChange={handleChangeInput}
                            value={registerInput.phone || ''}
                            type="tel"
                            className={`w-[350px] h-[44px] px-4 py-2 gap-2 rounded border     focus:outline-none ${registerInput.phone ? error.phone ? 'border-red-500' : 'border-blue-500' : 'border-[#D2D2D5]'}`} placeholder='+994'
                        />
                        {
                            error.phone ? <p className='text-red-500 text-[13px] pt-[7px] h-[25px]'>{error.phone}</p> : ''
                        }
                    </div>
                </div>

                <div className='w-[50%]'>
                    <div className='pt-[30px] flex flex-col'>
                        <label className='text-[#031225] pb-[10px]' htmlFor="">Surname</label>
                        <input
                            name="surname"
                            onChange={handleChangeInput}
                            value={registerInput.surname || ''}
                            type="text"
                            className={`w-[350px] h-[44px] px-4 py-2 gap-2 rounded border     focus:outline-none ${registerInput.surname ? error.surname ? 'border-red-500' : "border-blue-500" : 'border-[#D2D2D5]'}`} placeholder='Enter your surname'
                        />
                        {
                            error.surname ? <p className='text-red-500 text-[13px] pt-[7px] h-[25px]'>{error.surname}</p> : ''
                        }
                    </div>
                    <div className='pt-[30px] flex flex-col'>
                        <label className='text-[#031225] pb-[10px]' htmlFor="">Company domain</label>
                        <input
                            name='companyDomain'
                            onChange={handleChangeInput}
                            value={registerInput.companyDomain || ''}
                            type="text"
                            className={`w-[350px] h-[44px] px-4 py-2 gap-2 rounded border    focus:outline-none ${registerInput.companyDomain ? error.companyDomain ? 'border-red-500' : 'border-blue-500' : 'border-[#D2D2D5] '}`} placeholder='Enter your company domain'
                        />
                        {
                            error.companyDomain ? <p className='text-red-500 text-[13px] pt-[7px] h-[25px]'>{error.companyDomain}</p> : ''
                        }
                    </div>
                    <div className='pt-[30px] flex flex-col'>
                        <label className='text-[#031225] pb-[10px]' htmlFor="">Password</label>
                        <input
                            name='password'
                            onChange={handleChangeInput}
                            value={registerInput.password || ''}
                            type="password"
                            className={`w-[350px] h-[44px] px-4 py-2 gap-2 rounded border  focus:outline-none ${registerInput.password ? error.password ? "border-red-500" : "border-blue-500" : 'border-[#D2D2D5]'}`} placeholder='Enter at least 8 characters'
                        />
                        {
                            error.password ? <p className='text-red-500 text-[13px] pt-[7px] h-[25px]'>{error.password}</p> : ''
                        }
                    </div>
                    <div className="pt-[30px] flex flex-col">
                        <label
                            className='text-[#031225] pb-[10px]'
                            htmlFor="small_size"
                        >
                            Profile Picture
                        </label>
                        <input
                            className="w-[350px] h-[44px] px-4 py-2 gap-2 rounded-lg border border-[#D2D2D5] text-gray-900 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0073e6] placeholder-gray-400 cursor-pointer text-sm"
                            id="small_size"
                            type="file"
                        />
                    </div>
                </div>
            </div>

            <div className='pt-[20px]'>
                <button
                    onClick={() => {
                        const validationErrors = validateInputs();
                        seterror(validationErrors);

                        if (Object.keys(validationErrors).length === 0) {
                            registerApi(registerInput);
                        }
                    }}
                    className="w-[220px] h-[44px] px-4 py-2 gap-2 rounded bg-[#1971F6] text-white border "
                >
                    Continue
                </button>
            </div>
        </div>
    )
}

export default RegisterLeft