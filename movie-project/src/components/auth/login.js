import React from 'react'
import { Container , Form , Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { login , login_auth } from '../../actions'
import Swal from 'sweetalert2'
import Loginn from './google/login'

const Login = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const onLogin = async() => {
        
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value

        if(email!==null&&password!==null){

            try{

                await axios.post('http://localhost:5000/api/login',{
                    email:email,
                    password:password
                }).then((response)=>{
                    
                    if(response.status===200){
                        let token = response.data.token
                        
                        dispatch(login_auth(token))

                        axios.post('http://localhost:5000/api/get-user',{},{
                        headers:{
                            'Content-Type': 'application/json',
                            'authorization': 'Bearer ' + token
                        }
                        }).then((response)=>{
                            if(response.status===200){

                                let user_data = response.data.data
                                
                                dispatch(login(user_data))

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
                                    text: 'Invalid Credentials!',
                                })
                            }
                        })
                        
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Field Empty!',
                        })
                    }
                })

            }catch(err){
                throw err
            }

        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Field Empty!',
            })
            history.push('/register')
        }

    }

    return(
        <>
            
            <Container className="my-5 bg-dark p-5 shadow-lg" style={{width:'500px',borderRadius:"20px"}}>
                <Form>
                    <h3 className="text-white"><b>Login</b></h3>

                    <Form.Group className="my-3">
                        <Form.Label className="text-white"><b>Email address</b></Form.Label>
                        <Form.Control type="email" id="email" className="form-control" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="my-3">
                        <Form.Label className="text-white"><b>Password</b></Form.Label>
                        <Form.Control type="password" id="password" className="form-control" placeholder="Enter password" />
                    </Form.Group>
                    <div className="d-flex flex-row">

                        <Button variant="primary" onClick={()=>{onLogin()}} className="my-3" style={{height:'42px',width:'94px'}}>
                            <b>Submit</b>
                        </Button>
                        <div className="my-3 mx-3">
                            <Loginn/>
                        </div>
                    </div>
                    
                    
                    <b>
                        <p className="forgot-password text-right my-3">
                            <Link to="/forgetpassword" style={{textDecoration:'none'}}>
                                <div className="d-flex flex-row">
                                    <div className="text-white">Don't have an account yet? </div><a className="mx-2" style={{textDecoration:'none'}}>Register</a>
                                </div>
                            </Link>
                        </p>
                    </b>
                    <b>
                        <p className="forgot-password text-right my-3">
                            <Link to="/forgetpassword" style={{textDecoration:'none'}}>
                                <div className="d-flex flex-row">
                                    <div className="text-white">Forgot </div><a className="mx-2" style={{textDecoration:'none'}}>password?</a>
                                </div>
                            </Link>
                        </p>
                    </b>
                </Form>
            </Container>
        </>
    )
}

export default Login