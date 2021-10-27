import React from 'react'
import { Link } from 'react-router-dom'
import { Button , Dropdown } from 'react-bootstrap'
import { useSelector , useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import Swal from 'sweetalert2'
import axios from 'axios'
import { logout , logout_auth } from '../../actions'
import './dropdown.css'

const SimpleCardforjs = ({item}) => {

    const user_data = useSelector(state=>state.user)
    const token = useSelector(state=>state.token)

    const dispatch = useDispatch()
    const history = useHistory()

    const onAddList = async() => {
        if(user_data!==null){
                try{
                    await axios.post('http://localhost:5000/api/get-user',{},{
                    headers:{
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + token
                    }
                }).then((response)=>{
                    if(response.status===200){
                        
                        axios.post('http://localhost:5000/api/add_list',{
                            user_id:user_data.id,
                            item_id:item.id,
                            type:'tv'
                        }).then((response)=>{
                            if(!response.data.error){
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Added To List',
                                    timer: 1500
                                })
                            }else{
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Error!',
                                })
                            }
                        })

                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Session Expired.',
                        })
                        dispatch(logout())
                        dispatch(logout_auth())
                        history.push('/')
                    }
                })
            }catch(err){
                throw err
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Login First!',
            })
        }
    }

    const onAddFav = async() => {
        if(user_data!==null){
                try{
                    await axios.post('http://localhost:5000/api/get-user',{},{
                    headers:{
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + token
                    }
                }).then((response)=>{
                    if(response.status===200){
                        
                        axios.post('http://localhost:5000/api/add_favorite',{
                            user_id:user_data.id,
                            item_id:item.id,
                            type:'tv'
                        }).then((response)=>{
                            if(!response.data.error){
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Added To Favorite',
                                    timer: 1500
                                })
                            }else{
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Error!',
                                })
                            }
                        })

                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Session Expired.',
                        })
                        dispatch(logout())
                        dispatch(logout_auth())
                        history.push('/')
                    }
                })
            }catch(err){
                throw err
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Login First!',
            })
        }
    }

    const onAddBM = async() => {
        if(user_data!==null){
                try{
                    await axios.post('http://localhost:5000/api/get-user',{},{
                    headers:{
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + token
                    }
                }).then((response)=>{
                    if(response.status===200){
                        
                        axios.post('http://localhost:5000/api/add_bookmark',{
                            user_id:user_data.id,
                            item_id:item.id,
                            type:'tv'
                        }).then((response)=>{
                            if(!response.data.error){
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Added To Bookmark',
                                    timer: 1500
                                })
                            }else{
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Error!',
                                })
                            }
                        })

                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Session Expired.',
                        })
                        dispatch(logout())
                        dispatch(logout_auth())
                        history.push('/')
                    }
                })
            }catch(err){
                throw err
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Login First!',
            })
        }
    }

    if(item.original_name!==undefined){
        return(
            <div className="p-3 shadow mx-2 my-3" style={{borderRadius:'10px',width:'300px',height:'530px'}}>
                <div className="d-flex flex-column justify-content-around align-items-center">
                    
                    <div className="p-2">
                        <Dropdown className="d-inline" style={{position:'absolute',right:'5',top:'5'}}>
                            <Dropdown.Toggle id="dropdown-basic" variant="">
                                <Button variant="secondary" style={{borderRadius:'100%',width:'30px',height:'30px'}} id="dropdown-autoclose-true">
                                    <svg style={{marginLeft:'-6px',margintTop:'1px'}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 30 30">
                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                    </svg>
                                </Button>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>onAddList()}>Add To List</Dropdown.Item>
                                <Dropdown.Item onClick={()=>onAddFav()}>Add To Favorite</Dropdown.Item>
                                <Dropdown.Item onClick={()=>onAddBM()}>Add To Bookmark</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        
                        <Link to={`/tvshow/${item.id}`}>
                        <a className="shadow">
                            <img style={{borderRadius:'10px'}} src={'https://www.themoviedb.org/t/p/w220_and_h330_face'+item.poster_path} alt="..."/>
                        </a>
                        </Link>
                    </div>
                    <div className="p-1" style={{height:'90px'}}>
                        <Link to={`/tvshow/${item.id}`} style={{textDecoration:'none'}}>
                            <b className="text-black nav-link">
                                <h4>
                                    {item.name}
                                </h4>
                            </b>
                        </Link>
                    </div>
                    <h6 class="text-muted">Rating: {item.vote_average}/10</h6>
                    <h6 class="text-muted">{item.release_date}</h6>
                </div>
            </div>
        )
    }else{
        return(
            <></>
        )
    }
    
}

export default SimpleCardforjs