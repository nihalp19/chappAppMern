import React, { useState } from 'react'
import hulk from "../assets/hulk.jpg"
import { sendUserData } from '../api/UserAuthApi'
import {useNavigate,Link} from "react-router-dom"

function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const UserData = {name,email,password}
        const response = await sendUserData(UserData)
        if(!response.success){
            console.log("err response is not success",response.success)
            return
        }
        console.log("Data:",response.data);
        setName("")
        setEmail("")
        setPassword("")
        navigate("/login")
    }

    return (
        <div className='w-full min-h-screen flex overflow-hidden'>
            <div className='flex-1  w-full min-h-screen flex justify-center items-center'>
                <form className=' flex flex-col w-[50%]  p-8 border-[2px] rounded-md'>
                    <h3 className='text-center text-2xl mb-8'>Register</h3>
                    <input type="text" placeholder='John Doe' className='border p-2 mb-8 rounded-md' value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder='example@gmail.com' className='border p-2  mb-8 rounded-md' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='password. . . .' className='border p-2  mb-8 rounded-md' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='bg-white p-2 rounded-md border' onClick={handleSubmit}>Register</button>
                    <div className='text-center text-sm mt-4'>
                        <span className='text-blue-600'><Link to="/login">Already Registered??</Link></span>
                    </div>
                </form>
            </div>
            <div className='flex-1 '>
                <img src={hulk} className='w-full min-h-full object-cover' alt="lund mera" />
            </div>
        </div>
    )
}

export default Register