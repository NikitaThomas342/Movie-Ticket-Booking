import React ,{useState}from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import BookmarkSub from './sub/bookmark'

const Bookmark = () => {

    const [bookmarks, setBookmarks] = useState([])
    const user_data = useSelector(state=>state.user)

    useEffect(()=>{
        let user_id = user_data.id
        axios.post('http://localhost:5000/api/get_bookmark',{
            user_id:user_id
        }).then((response)=>{
            setBookmarks(response.data.data)
        })
    },[])

    return(
        <>
            <div className="d-flex flex-row justify-content-center my-1 flex-wrap">
                {bookmarks.length>0 ? (
                    <>
                        {bookmarks.map((data)=>{
                            return(
                                <BookmarkSub key={data.id} item={data}/>
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

export default Bookmark