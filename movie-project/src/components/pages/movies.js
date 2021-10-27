import React ,{ useState , useEffect }from 'react'
import axios from 'axios'
import Item from '../sub-comp/cardForMovie'

const Movies = () => {

    const [movies, setMovies] = useState([])

    useEffect(()=>{
        axios.get('https://api.themoviedb.org/3/discover/movie?api_key=a1c34846e3b8867dfa62cbc29a53950e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate').then((response)=>{
            setMovies(response.data.results)
        })
    },[])

    return(
        <>
            <div className="d-flex flex-row justify-content-center my-1 flex-wrap">
                {movies.map((data)=>{
                    if(data.title!==undefined){
                        return(<div>
                            <Item key={data.id} item={data}/>
                        </div>)
                    }
                })}
            </div>
        </>
    )
}

export default Movies