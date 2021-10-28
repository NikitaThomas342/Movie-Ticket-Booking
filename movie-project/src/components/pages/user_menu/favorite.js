import React ,{useState}from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import FavoriteSub from './sub/favorite'

const Favorite = () => {

    const [favorites, setFavorites] = useState([])
    const user_data = useSelector(state=>state.user)

    useEffect(()=>{
        let user_id = user_data.id
        axios.post('http://localhost:5000/api/get_favorite',{
            user_id:user_id
        }).then((response)=>{
            setFavorites(response.data.data)
        })
    },[])

    return(
        <>
            <div className="d-flex flex-row justify-content-center my-1 flex-wrap">
                {favorites.length>0 ? (
                    <>
                        {favorites.map((data)=>{
                            return(
                                <FavoriteSub key={data.id} item={data}/>
                            )
                        })}
                    </>
                ):(
                    <>
                     No items
                    </>
                )}
            </div>
        </>
    )

}

export default Favorite