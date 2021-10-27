import React from 'react'
import axios from 'axios'
import { useState , useEffect } from 'react';
import { useParams } from "react-router";

const MovieDetail = () => {
    const { id } = useParams()

    const [tvshow, setTVshow] = useState([])
    const [genre, setGenre] = useState([])

    useEffect(()=>{
        axios.get('https://api.themoviedb.org/3/tv/'+ id +'?api_key=a1c34846e3b8867dfa62cbc29a53950e&language=en-US').then((response)=>{
            setTVshow(response.data)
            setGenre(response.data.genres)
        })
    },[])

    const runCallBack = (cb) => {
        return cb()
    }

    console.log(tvshow)

    return(
        <>
            <div className="my-5 py-5 px-auto bg-dark shadow-lg" style={{borderRadius:'20px',width:'100%'}}>

                <div className="d-flex flex-row justify-content-around">
                    <div className="col-3">
                        <img  style={{borderRadius:'10px'}} src={'https://www.themoviedb.org/t/p/w300_and_h450_face'+tvshow.poster_path} width='350px' height='500px' alt="..."/>
                    </div>
                    <div className="col-7">
                        <div className="d-flex flex-column">
                            <b><h2 className="text-white my-1">{tvshow.name}</h2></b>
                            
                            <div className="d-flex flex-row my-1">
                                <h6 className="mx-1 text-white">{tvshow.first_air_date} - {tvshow.last_air_date}</h6>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-dot" viewBox="0 0 16 16">
                                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                                </svg>
                                {
                                    runCallBack(()=>{
                                        const row = []
                                        for(var i = 0;i<genre.length;i++){
                                            row.push(<h6 className="mx-1 text-white" key={i}>{genre[i].name} </h6>)
                                        }
                                        return row
                                    })
                                }
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-dot" viewBox="0 0 16 16">
                                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                                </svg>
                                <h6 className="text-white">{tvshow.runtime}m</h6>
                            </div>
                
                            <h6 class="text-muted text-white my-1">{tvshow.tagline}</h6>

                            <b><h5 className="text-white my-3">Overview</h5></b>
                            <p class="text-monospace text-white my-1 mx-3">{tvshow.overview}</p>

                            <b><h5 className="text-white my-3">Creator</h5></b>
                            


                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default MovieDetail