import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ResetPassword() {

    const { id } = useParams()
    const [ID, setId] = useState("")



    useEffect(() => {
        const fetchResetToken = async () => {
            try {
                const response = await fetch("http://localhost:4000/user/fetchData", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id })
                })

                if (!response.ok) {
                    console.log("err while fetching data:", response);
                }

                const data = await response.json()
                setId(data.resetTokenid)
                console.log("ID", ID);
            } catch (err) {
                console.log("err while fetching resetToken", err.message);
            }
        }
        fetchResetToken()
    }, [])


    return (
        <div className='w-full min-h-screen flex overflow-hidden'>
            {ID === id ? (<div className='flex-1   w-full min-h-screen flex justify-center items-center'>
                <form className=' flex flex-col w-[35%]  p-8 border-[2px] rounded-md'>
                    <h3 className='text-center text-2xl mb-8'>Reset Password</h3>
                    <input type="email" placeholder='example@gmail.com' className='border p-2  mb-8 rounded-md' />
                    <input type="password" placeholder='password . . . . . . . . ' className='border p-2  mb-8 rounded-md' />
                    <input type="password" placeholder='confirm password . . . . . . .' className='border p-2  mb-4 rounded-md' />
                    <button className='bg-white p-2 rounded-md border'>Reset Password</button>
                </form>
            </div>) : (<span>404 not found</span>)}

        </div>
    )
}

export default ResetPassword