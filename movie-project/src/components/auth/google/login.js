import React from 'react'
import { GoogleLogin } from 'react-google-login'

const  clientId = '371109756681-599bu64ani7nu12av4m8ieruiq8c3f34.apps.googleusercontent.com'

const Loginn = () => {
    const onSuccess = (res) => {
        console.log('[Login success] currentUser:', res.profileObj)
    }

    const onFailure = (res) => {
        console.log('[Login failed] res:', res)
    }

    return (
        <div>
            <GoogleLogin
                clientId = {clientId}
                buttonText = "Login"
                onSuccess = { onSuccess }
                onFailure = { onFailure }
                cookiePolicy = {'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default Loginn