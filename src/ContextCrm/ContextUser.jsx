import React, { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
export const ContextUserData = createContext()

const apiUrl = import.meta.env.VITE_API_URL;


const ContextUser = ({ children }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [loading, setLoading] = useState(true);


    const registerApi = async (data) => {
        try {
            const response = await axios.post(`${apiUrl}/api/admin/User/register`, {
                ...data,
                imageURL: "https://backloggd-s3.b-cdn.net/1jpmjev5av8p0u145lhv1u2dtghf"
            });
            toast.success('Registration Successful, Please Login')
            navigate('/Login')
        } catch (error) {
            console.log(error)
            toast.error(`${error.response.data[""][1]}`)
        }
        
    }

    const [userIdToken, setuserIdToken] = useState({
        token: JSON.parse(localStorage.getItem("token")),
        userId: JSON.parse(localStorage.getItem("userId"))
    })
    const loginApi = async (data) => {
        setLoading(true)
        try {
            const response = await axios.post(`${apiUrl}/api/admin/User/login`, data)
            console.log(response.data)
            const now = new Date();
            const expirationTime = now.getTime() + 3 * 24 * 60 * 60 * 1000;

            const tokenData = { value: response.data.token, expiresAt: expirationTime };
            const userIdData = { value: response.data.userId, expiresAt: expirationTime };

            localStorage.setItem('token', JSON.stringify(tokenData));
            localStorage.setItem('userId', JSON.stringify(userIdData))
            navigate('/Dashboard')
            setuserIdToken({
                token: tokenData,
                userId: userIdData
            })
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error(`${error.response.data}`)
            setLoading(false)
        }
    }

    const forgetPassword = async (data) => {
        try {
            const response = await axios.post(
                `${apiUrl}/api/admin/User/forgot-password`,
                JSON.stringify(`${data}`),
                {
                    headers: {
                        'Content-Type': 'application/json-patch+json'
                    }
                }
            );
            console.log(response.data)
            toast.success('Please check your email for password reset instructions')
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
        } catch (error) {
            console.log(error)
            toast.error(`${error.response.data}`)
        }
    }

    const ChangePassword = async (data) => {
        try {
            const response = await axios.post(
                `${apiUrl}/api/admin/User/reset-password`, {
                token: data.token,
                userId: data.userId,
                password: data.Newpassword,
                confirmPassword: data.ReNewpassword
            })
            console.log(response.data)
            navigate("/Login")
        } catch (error) {
            console.log(error)
            toast.error(`${error.response.data}`)
        }
    }

    useEffect(() => {
        setLoading(true)
        if (location.pathname === "/Change-Password") {
            setLoading(false)
            return
        }

        const tokenData = JSON.parse(localStorage.getItem('token'));
        const userIdData = JSON.parse(localStorage.getItem('userId'));

        const now = new Date().getTime();

        if (tokenData && tokenData.value && userIdData && userIdData.value) {
            if (now < tokenData.expiresAt && now < userIdData.expiresAt) {
                // navigate('/Dashboard');
                setLoading(false);
            } else {
                navigate('/Login');
                setLoading(false);
            }
        } else {
            navigate('/Login');
            setLoading(false);
        }

    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <ContextUserData.Provider value={{
            registerApi,
            loginApi,
            forgetPassword,
            ChangePassword,
            userIdToken
        }}>
            {children}
        </ContextUserData.Provider>
    )
}

export default ContextUser
