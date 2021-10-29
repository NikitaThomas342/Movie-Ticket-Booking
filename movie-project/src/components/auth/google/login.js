import React from 'react'
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router'
import { login , login_auth } from '../../../actions'

const  clientId = '371109756681-599bu64ani7nu12av4m8ieruiq8c3f34.apps.googleusercontent.com'

const Loginn = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const onSuccess = (res) => {
        let email = res.profileObj.email
        
        axios.post('http://localhost:5000/api/login_check',{
            email:email
        }).then((response)=>{

            if(!response.data.error){
                let user_data = response.data.user
                let token = response.data.token

                dispatch(login(user_data))
                dispatch(login_auth(token))

                Swal.fire({
                    icon: 'success',
                    title: 'Login Success',
                    timer: 1500
                })

                history.push('/')
                
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text:'User Not Found'
                    })
                    history.push('/register')
                }

        })

        
    }

    const onFailure = (res) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops... Something went wrong.',
            text:res
        })
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