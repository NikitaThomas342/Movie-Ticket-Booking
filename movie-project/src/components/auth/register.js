import React from 'react'
import { Link } from 'react-router-dom'
import { Container , Form , Button } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router'
import Swal from 'sweetalert2'

const Register = () => {

    const history = useHistory()

    const onRegister = async () => {

        let name = document.getElementById('firstname').value + ' ' + document.getElementById('lastname').value
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value

        if(name!==null&&email!==null&&password!==null){

            try{
                await axios.post('http://localhost:5000/api/register', {
                name:name,
                email:email,
                password:password
                }).then((response)=>{
                    console.log(response)
                    if(response.status===201){
                        Swal.fire({
                            icon: 'success',
                            title: 'Register Success, Please Login',
                            timer: 1500
                        })
                        history.push('/login')
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Email Already In Use!',
                        })
                        history.push('/register')
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
                    <h3 className="text-white"><b>Register</b></h3>

                    <Form.Group className="my-3">
                        <Form.Label className="text-white"><b>First name</b></Form.Label>
                        <Form.Control type="text" id="firstname" placeholder="First name" />
                    </Form.Group>

                    <Form.Group className="my-3">
                        <Form.Label className="text-white"><b>Last name</b></Form.Label>
                        <Form.Control type="text" id="lastname" className="form-control" placeholder="Last name" />
                    </Form.Group>

                    <Form.Group className="my-3">
                        <Form.Label className="text-white"><b>Email address</b></Form.Label>
                        <Form.Control type="email" id="email" placeholder="Enter email" width='100px'/>
                    </Form.Group>

                    <Form.Group className="my-3">
                        <Form.Label className="text-white"><b>Password</b></Form.Label>
                        <Form.Control type="password" id="password" placeholder="Enter password" />
                    </Form.Group>

                    <Button variant="primary" onClick={()=>{onRegister()}} className="my-3">
                        <b>Submit</b>
                    </Button>
                    <b>
                        <p className="forgot-password text-right my-3">
                            <Link to="/login" style={{textDecoration:'none'}}>
                                <div className="d-flex flex-row">
                                    <div className="text-white">Already registered </div><a className="mx-2" style={{textDecoration:'none'}}>sign in?</a>
                                </div>
                            </Link>
                        </p>
                    </b>
                </Form>
            </Container>
        </>
    )
}

export default Register