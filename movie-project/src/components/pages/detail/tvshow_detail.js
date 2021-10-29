import React from 'react'
import axios from 'axios'
import { useState , useEffect } from 'react';
import { useParams } from "react-router";
import { Button } from 'react-bootstrap'

const MovieDetail = () => {
    const { id } = useParams()

    const [tvshow, setTVshow] = useState([])
    const [genre, setGenre] = useState([])
    const [watch, setWatch] = useState([])
    const [video, setVideo] = useState([])

    useEffect(()=>{
        axios.get('https://api.themoviedb.org/3/tv/'+ id +'?api_key=a1c34846e3b8867dfa62cbc29a53950e&language=en-US').then((response)=>{
            setTVshow(response.data)
            setGenre(response.data.genres)
            axios.get('https://api.themoviedb.org/3/tv/' + id + '/watch/providers?api_key=a1c34846e3b8867dfa62cbc29a53950e').then((response)=>{
                setWatch(response.data.results.US.link)
            })
            axios.get('https://api.themoviedb.org/3/tv/' + id + '/videos?api_key=a1c34846e3b8867dfa62cbc29a53950e&language=en-US').then((response)=>{
                setVideo(response.data.results[0])
            })
        })
    },[])

    const runCallBack = (cb) => {
        return cb()
    }

    return(
        <>
            <div className="d-flex flex-row">
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
                                </div>
                    
                                <h6 class="text-muted text-white my-1">{tvshow.tagline}</h6>

                                <b><h5 className="text-white my-3">Overview</h5></b>
                                <p class="text-monospace text-white my-1 mx-3">{tvshow.overview}</p>
                                
                                <b><h5 className="text-white my-3">Info</h5></b>
                                <p class="text-monospace text-white my-1 mx-3">Status : {tvshow.status}</p>
                                <p class="text-monospace text-white my-1 mx-3">Original Language : {tvshow.original_language}</p>
                                <p class="text-monospace text-white my-1 mx-3">Seasons : {tvshow.number_of_seasons}</p>
                                <p class="text-monospace text-white my-1 mx-3">Episodes : {tvshow.number_of_episodes}</p>
                                
                                <Button href={watch} target="_blank" className="my-3"><b>Watch now</b></Button>
                                <b><h5 className="text-white my-3">{video ? (
                                    <>
                                        {video.name}
                                    </>
                                ):(
                                    <>
                                    </>
                                )}</h5></b>

                                {video ? (
                                    <div class="embed-responsive embed-responsive-16by9 my-3">
                                        <iframe class="embed-responsive-item" style={{width:'500px',height:'300px'}} src={`https://www.youtube.com/embed/${video.key}`} allowfullscreen></iframe>
                                    </div>
                                ):(<></>)}

                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieDetail