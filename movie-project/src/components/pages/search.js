import React,{ useState , useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import Item from '../sub-comp/cardForMovie'
import Itemtv from '../sub-comp/cardForTV'
import Itempeople from '../sub-comp/cardForPeople'

const Search = () => {

    const [results, setResults] = useState([])

    const { query } = useParams()

    useEffect(()=>{
        axios.get('https://api.themoviedb.org/3/search/multi?api_key=a1c34846e3b8867dfa62cbc29a53950e&language=en-US&page=1&include_adult=false&query=' + query).then((response)=>{
            setResults(response.data.results)
        })
    },[])

    return(
        <>
            
                {results!==undefined&&results!==null ? (
                    <div class="d-flex flex-row flex-wrap">

                        {results.map((data)=>{
                                if(data.title!==undefined){
                                    if(data.poster_path!==null){
                                        return(
                                            <div>
                                                <Item key={data.id} item={data}/>
                                            </div>
                                        )
                                    }
                                }else if(data.profile_path!==undefined){
                                    if(data.profile_path!==null){
                                        return(
                                            <div>
                                                <Itempeople key={data.id} item={data}/>
                                            </div>
                                        )
                                    }
                                }else{
                                    if(data.poster_path!==null){
                                        return(   
                                            <div>
                                                <Itemtv key={data.id} item={data}/>
                                            </div>
                                        )
                                    }
                                }
                            })
                        }

                    </div>
                ):(
                    <div>No results</div>
                )}
                
            
        </>
    )
}

export default Search