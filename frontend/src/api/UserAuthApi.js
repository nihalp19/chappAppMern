export async function sendUserData(userData) {
    try{
        const response = await fetch("http://localhost:4000/user/register",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(userData)
        })

        if(!response.ok){
            console.log("err response",response)
        }

        const responseData = await response.json()
        return {success : true,data: responseData}
    }catch(err){
        console.log("err while registration :",err.message);
    }  
}

export async function sendUserLoginApi(userData) {
    try{
        const response = await fetch("http://localhost:4000/user/login",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(userData)
        })

        if(!response.ok){
            console.log("err response",response)
        }

        const responseData = await response.json()
        return {success : true,data: responseData}
    }catch(err){
        console.log("err while login :",err.message);
    }  
}

export async function sendVerificationToken(userData) {
    try{
        const response = await fetch("http://localhost:4000/user/verify-user",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({userData})
        })

        if(!response.ok){
            console.log("err response",response)
        }

        const responseData = await response.json()
        return {success : true,data: responseData}
    }catch(err){
        console.log("err while verification:",err.message);
    }  
}

export async function forgetPassoword(userData) {
    try{
        const response = await fetch("http://localhost:4000/user/forget-password",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(userData)
        })

        if(!response.ok){
            console.log("err response",response)
        }

        const responseData = await response.json()
        return {success : true,data: responseData.user}
    }catch(err){
        console.log("err while verification:",err.message);
    }  
}