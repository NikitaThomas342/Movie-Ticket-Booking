import React ,{ useState , useEffect }from 'react'
import axios from 'axios'
import Item from '../../sub-comp/cardForTV'

const Tvshows = () => {

    const [tvshows, setTvshows] = useState([])

    useEffect(()=>{
        axios.get('https://api.themoviedb.org/3/discover/tv?api_key=a1c34846e3b8867dfa62cbc29a53950e&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate').then((response)=>{
            setTvshows(response.data.results)
        })
    },[])

    return(
        <>
            <div className="d-flex flex-row justify-content-center my-1 flex-wrap">
                {tvshows.map((data)=>{
                    if(data.original_name!==undefined){
                        return(<div>
                            <Item key={data.id} item={data}/>
                        </div>)
                    }
                })}
            </div>
        </>
    )
}

export default Tvshows