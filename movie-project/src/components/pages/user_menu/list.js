import React ,{useState}from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import ListsSub from './sub/list'

const List = () => {

    const [lists, setLists] = useState([])
    const user_data = useSelector(state=>state.user)

    useEffect(()=>{
        let user_id = user_data.id
        axios.post('http://localhost:5000/api/get_list',{
            user_id:user_id
        }).then((response)=>{
            setLists(response.data.data)
        })
    },[])

    return(
        <>
            <div className="d-flex flex-row justify-content-center my-1 flex-wrap">
                {lists.length>0 ? (
                    <>
                        {lists.map((data)=>{
                            return(
                                <ListsSub key={data.id} item={data}/>
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

export default List