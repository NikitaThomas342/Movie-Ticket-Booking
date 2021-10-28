import React from 'react'
import { GoogleLogout } from 'react-google-login'

const  clientId = '371109756681-599bu64ani7nu12av4m8ieruiq8c3f34.apps.googleusercontent.com'

const Logoutt = () => {
    const onSuccess = () => {
        alert('Logout Success')
    }

    return(
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logoutt