import React ,{ useState , useEffect }from 'react'
import axios from 'axios'
import Item from '../sub-comp/cardForPeople'

const Movies = () => {

    const [peoples, setPeoples] = useState([])
    const [page, setPage] = useState(1)

    useEffect(()=>{
        axios.get('https://api.themoviedb.org/3/person/popular?api_key=a1c34846e3b8867dfa62cbc29a53950e&language=en-US&page=' + page).then((response)=>{
            setPeoples(response.data.results)
        })
    },[])

    console.log(peoples)

    return(
        <>
            <div className="d-flex flex-row justify-content-center my-1 flex-wrap">
                {peoples.map((data)=>(
                    <div>
                        <Item key={data.id} item={data}/>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Movies