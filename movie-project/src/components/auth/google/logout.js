import React from 'react'
import { GoogleLogout } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { logout , logout_auth } from '../../../actions'
import { useHistory } from 'react-router'
import Swal from 'sweetalert2'

const  clientId = '371109756681-599bu64ani7nu12av4m8ieruiq8c3f34.apps.googleusercontent.com'

const Logoutt = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const onSuccess = () => {
        dispatch(logout())
        dispatch(logout_auth())
        Swal.fire({
            icon: 'success',
            title: 'Logged out',
            timer: 1500
        })
        history.push('/')
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