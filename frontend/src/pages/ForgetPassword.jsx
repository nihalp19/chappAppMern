import React, { useState } from 'react'
import { forgetPassoword } from '../api/UserAuthApi'

function ForgetPassword({ value }) {

    const { id, setID } = value

    const [email, setEmail] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const emailObj = { email }
        const response = await forgetPassoword(emailObj)
        if (!response.success) {
            console.log("response :", response);
            return
        }
        setID(response.data.resetPasswordToken)
        console.log("id: ", response.data.resetPasswordToken);
        console.log("Data :", response.data);
        setEmail('')
    }

    return (
        <div className='w-full min-h-screen flex overflow-hidden'>
            <div className='flex-1   min-h-screen flex justify-center items-center'>
                <form className=' flex flex-col p-8 border-[2px] rounded-md'>
                    <h3 className='text-center text-2xl mb-8'>Forget Password</h3>
                    <input type="email" placeholder='example@gmail.com' className='border p-2  mb-4 rounded-md' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button className='bg-white p-2 rounded-md border' onClick={handleSubmit}>Forget Password</button>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword