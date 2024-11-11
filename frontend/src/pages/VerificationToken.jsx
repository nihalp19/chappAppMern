import React, { useState, useRef } from 'react';

function VerificationToken() {
    const [token, setToken] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);

    const handleSetSubmit = (e, ind) => {
        const value = e.target.value;
        if (isNaN(value) || value === "") return; 

        const updatedToken = [...token];
        updatedToken[ind] = value;
        setToken(updatedToken);

        if (ind < token.length - 1) {
            inputRefs.current[ind + 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tokenString = token.join(''); 
        const response = await sendVerificationToken(tokenString);

        if (!response.success) {
            console.log("response :", response);
            return;
        }

        setToken(["", "", "", "", "", ""]); 
        console.log("Data :", response.data);
    };

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <form className="flex p-6 text-center border-[2px] rounded-md flex-col" onSubmit={handleSubmit}>
                <h1 className="text-3xl mb-8">Email Verification</h1>
                <div>
                    {token.map((t, i) => (
                        <input
                            key={i}
                            className="w-[50px] p-2 m-1"
                            maxLength={1}
                            type="text"
                            placeholder="____"
                            value={t}
                            onChange={(e) => handleSetSubmit(e, i)}
                            ref={(el) => (inputRefs.current[i] = el)} // Create references for each input
                        />
                    ))}
                </div>
                <button className="bg-white p-2 rounded-md border mt-4" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

async function sendVerificationToken(token) {
    // Mock API call for verification
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, data: "Verification successful!" });
        }, 1000);
    });
}

export default VerificationToken;
