import React ,{useState}from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const FavoriteSub = ({item}) => {

    const type = item.type
    const id = item.item_id

    const [favorite,setFavorite] = useState([])

    useEffect(()=>{
        if(type==='tv'){
            axios.get('https://api.themoviedb.org/3/tv/'+ id +'?api_key=a1c34846e3b8867dfa62cbc29a53950e&language=en-US').then((response)=>{
                setFavorite(response.data)
            })
        }else{
            axios.get('https://api.themoviedb.org/3/movie/'+id+'?api_key=a1c34846e3b8867dfa62cbc29a53950e&language=en-US').then((response)=>{
                setFavorite(response.data)
            })
        }
    },[])


    if(type==='movie'){
        return(
            <div className="p-3 shadow mx-2 my-3" style={{borderRadius:'10px',width:'300px',height:'530px'}}>
                <div className="d-flex flex-column justify-content-around align-items-center">
                    
                    <div className="p-2">
                        <Link to={`/movie/${favorite.id}`}>
                            <a className="shadow">
                                <img style={{borderRadius:'10px'}} src={'https://www.themoviedb.org/t/p/w220_and_h330_face'+favorite.poster_path} alt="..."/>
                            </a>
                        </Link>
                        
                    </div>
                    
                    <div className="p-1" style={{height:'90px'}}>
                        <Link to={`/movie/${favorite.id}`} style={{textDecoration:'none'}}>
                            <b className="text-black nav-link">
                                <h4>
                                    {favorite.original_title}
                                </h4>
                            </b>
                        </Link>
                    </div>
                    <h6 class="text-muted">Rating: {favorite.vote_average}/10</h6>
                    <h6 class="text-muted">{favorite.release_date}</h6>
                </div>
            </div>
        )
    }else{
        return(
            <div className="p-3 shadow mx-2 my-3" style={{borderRadius:'10px',width:'300px',height:'530px'}}>
                    <div className="d-flex flex-column justify-content-around align-items-center">
                        
                        <div className="p-2">
                            <Link to={`/tvshow/${favorite.id}`}>
                            <a className="shadow">
                                <img style={{borderRadius:'10px'}} src={'https://www.themoviedb.org/t/p/w220_and_h330_face'+favorite.poster_path} alt="..."/>
                            </a>
                            </Link>
                        </div>
                        <div className="p-1" style={{height:'90px'}}>
                            <Link to={`/tvshow/${favorite.id}`} style={{textDecoration:'none'}}>
                                <b className="text-black nav-link">
                                    <h4>
                                        {favorite.name}
                                    </h4>
                                </b>
                            </Link>
                        </div>
                        <h6 class="text-muted">Rating: {favorite.vote_average}/10</h6>
                        <h6 class="text-muted">{favorite.release_date}</h6>
                    </div>
            </div>
        )
    }
    
}

export default FavoriteSub