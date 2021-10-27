import React from 'react'
import { Link } from 'react-router-dom'

const simpleCardforjs = ({item}) => {

    if(item.name!==undefined){
        return(
            <div className="p-3 shadow mx-2 my-3" style={{borderRadius:'10px',width:'300px',height:'530px'}}>
                <div className="d-flex flex-column justify-content-around align-items-center">
                    <div className="p-2">
                        <Link to={`/people/${item.id}`}>
                        <a>
                            <img style={{borderRadius:'10px'}} src={'https://www.themoviedb.org/t/p/w220_and_h330_face'+item.profile_path} alt="..."/>
                        </a>
                        </Link>
                    </div>
                    <div className="p-1" style={{height:'90px'}}>
                                <Link to={`/people/${item.id}`} style={{textDecoration:'none'}}>
                                <b className="text-black nav-link">
                                    <h4>
                                        {item.name}
                                    </h4>
                                </b>
                                </Link>
                    </div>
                    <h6 class="text-muted">Popularity: {item.popularity}</h6>
                </div>
            </div>
        )
    }else{
        return(
            <></>
        )
    }
    
}

export default simpleCardforjs