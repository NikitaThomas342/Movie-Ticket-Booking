import React ,{useState}from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router'
import { CloseButton } from 'react-bootstrap'
import { useSelector , useDispatch } from 'react-redux'
import { logout , logout_auth } from '../../../../actions'


const BookmarkSub = ({item}) => {

    const token = useSelector(state=>state.token)

    const dispatch = useDispatch()
    const history = useHistory()

    const type = item.type
    const id = item.item_id

    const [bookmark,setBookmark] = useState([])

    useEffect(()=>{
        if(type==='tv'){
            axios.get('https://api.themoviedb.org/3/tv/'+ id +'?api_key=a1c34846e3b8867dfa62cbc29a53950e&language=en-US').then((response)=>{
                setBookmark(response.data)
            })
        }else{
            axios.get('https://api.themoviedb.org/3/movie/'+id+'?api_key=a1c34846e3b8867dfa62cbc29a53950e&language=en-US').then((response)=>{
                setBookmark(response.data)
            })
        }
    },[])

    const onDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
            }).then((result) => {
            if (result.isConfirmed) {
                
                
                axios.post('http://localhost:5000/api/get-user',{},{
                    headers:{
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + token
                    }
                }).then((response)=>{
                    if(response.status===200){
                        
                    axios.delete(`http://localhost:5000/api/delete_bookmark/${id}`).then((response)=>{
                        if(response.status===200){
                            Swal.fire({
                                icon: 'success',
                                title: 'Item Deleted.',
                                timer: 1500
                            })
                            history.push('/')
                            history.push('/bookmark')
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
            
            }
        })
    }

    if(type==='movie'){
        return(
            <div className="p-3 shadow mx-2 my-3" style={{borderRadius:'10px',width:'300px',height:'550px'}}>
                <div className="d-flex flex-column justify-content-around align-items-center">
                    <CloseButton onClick={()=>{onDelete(item.id)}} style={{marginRight:'-250px'}}/>
                    <div className="p-2">
                        <Link to={`/movie/${bookmark.id}`}>
                            <a className="shadow">
                                <img style={{borderRadius:'10px'}} src={'https://www.themoviedb.org/t/p/w220_and_h330_face'+bookmark.poster_path} alt="..."/>
                            </a>
                        </Link>
                        
                    </div>
                    
                    <div className="p-1" style={{height:'90px'}}>
                        <Link to={`/movie/${bookmark.id}`} style={{textDecoration:'none'}}>
                            <b className="text-black nav-link">
                                <h4>
                                    {bookmark.original_title}
                                </h4>
                            </b>
                        </Link>
                    </div>
                    <h6 class="text-muted">Rating: {bookmark.vote_average}/10</h6>
                    <h6 class="text-muted">{bookmark.release_date}</h6>
                </div>
            </div>
        )
    }else{
        return(
            <div className="p-3 shadow mx-2 my-3" style={{borderRadius:'10px',width:'300px',height:'550px'}}>
                    <div className="d-flex flex-column justify-content-around align-items-center">
                        <CloseButton onClick={()=>{onDelete(item.id)}} style={{marginRight:'-250px'}}/>
                        <div className="p-2">
                            <Link to={`/tvshow/${bookmark.id}`}>
                            <a className="shadow">
                                <img style={{borderRadius:'10px'}} src={'https://www.themoviedb.org/t/p/w220_and_h330_face'+bookmark.poster_path} alt="..."/>
                            </a>
                            </Link>
                        </div>
                        <div className="p-1" style={{height:'90px'}}>
                            <Link to={`/tvshow/${bookmark.id}`} style={{textDecoration:'none'}}>
                                <b className="text-black nav-link">
                                    <h4>
                                        {bookmark.name}
                                    </h4>
                                </b>
                            </Link>
                        </div>
                        <h6 class="text-muted">Rating: {bookmark.vote_average}/10</h6>
                        <h6 class="text-muted">{bookmark.release_date}</h6>
                    </div>
            </div>
        )
    }
    
}

export default BookmarkSub