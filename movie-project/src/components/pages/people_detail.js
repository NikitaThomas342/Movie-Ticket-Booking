import React from 'react'
import axios from 'axios'
import { useState , useEffect } from 'react';
import { useParams } from "react-router";

const MovieDetail = () => {
    const { id } = useParams()

    const [people, setPeople] = useState([])

    useEffect(()=>{
        axios.get('https://api.themoviedb.org/3/person/' + id + '?api_key=a1c34846e3b8867dfa62cbc29a53950e&language=en-US').then((response)=>{
            setPeople(response.data)
        })
    },[])


    console.log(people)

    return(
        <>
            <div className="my-5 py-5 px-auto bg-dark shadow-lg" style={{borderRadius:'20px',width:'100%'}}>

                <div className="d-flex flex-row justify-content-around">
                    <div className="col-3">
                        <img  style={{borderRadius:'10px'}} src={'https://www.themoviedb.org/t/p/w300_and_h450_face'+people.profile_path} width='350px' height='500px' alt="..."/>
                    </div>
                    <div className="col-7">
                        <div className="d-flex flex-column">
                            <b><h2 className="text-white my-1">{people.name}</h2></b>
                            
                            <h6 class="text-white my-1 mx-3">Birthday: {people.birthday}</h6>
                            <h6 className="text-white my-1 mx-3">Gender: {people.gender==1 ? (<>Female</>):(<>Male</>)}</h6>
                            <h6 class="text-white my-1 mx-3">Popularity: {people.popularity}</h6>
                            <h6 className="text-white my-1 mx-3">Known for: {people.known_for_department}</h6>

                            <b><h5 className="text-white my-3">Biography</h5></b>
                            <p class="text-monospace text-white my-1 mx-3">{people.biography}</p>  

                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default MovieDetail