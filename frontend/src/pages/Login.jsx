import React, { useState } from 'react'
import hulk from "../assets/hulk.jpg"
import { Link, useNavigate } from 'react-router-dom'
import { sendUserLoginApi } from '../api/UserAuthApi'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userData = { email, password }
        const response = await sendUserLoginApi(userData)
        if (!response.success) {
            console.log("err while logging in", response.success)
            return
        }
        console.log("Data:", response.data)
        setEmail('')
        setPassword('')
        navigate('/home')
    }


    return (
        <div className='w-full min-h-screen flex overflow-hidden'>
            <div className='flex-1   w-full min-h-screen flex justify-center items-center'>
                <form className=' flex flex-col w-[50%]  p-8 border-[2px] rounded-md'>
                    <h3 className='text-center text-2xl mb-8'>Login</h3>
                    <input type="email" placeholder='example@gmail.com' className='border p-2  mb-8 rounded-md' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='. . . . . . . . . . . . .' className='border p-2  mb-8 rounded-md' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='bg-white p-2 rounded-md border' onClick={handleSubmit}>Login</button>
                    <div className='text-center text-sm mt-4'>
                        <span className='text-blue-600'><Link to="/forget-password">forget password??</Link></span>
                    </div>
                </form>
            </div>
            <div className='flex-1 '>
                <img src={hulk} className='w-full min-h-full object-cover' alt="" />
            </div>
        </div>
    )
}

export default Login