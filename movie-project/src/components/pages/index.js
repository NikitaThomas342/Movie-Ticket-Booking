import React,{ useEffect , useState } from 'react';
import { Container } from 'react-bootstrap'
import Item from '../sub-comp/cardForMovie'
import Itemtv from '../sub-comp/cardForTV'
import axios from 'axios'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Home = () => {

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5,
          slidesToSlide: 2
        },
        desktop: {
          breakpoint: { max: 3000, min: 1437 },
          items: 4,
          slidesToSlide: 2
        },
        tablet: {
          breakpoint: { max: 1437, min: 1200 },
          items: 3,
          slidesToSlide: 1
        },
        mobile: {
          breakpoint: { max: 1200, min: 0 },
          items: 2,
          slidesToSlide: 1
        }
    }

    const [trending, setTrending] = useState([])

    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/trending/week/day?api_key=a1c34846e3b8867dfa62cbc29a53950e`).then((response)=>{
            setTrending(response.data.results)
        })
    }, [])

    return(
        <>
            <div className="d-flex flex-column">

                <h3 className="my-4">Trending This Week</h3>
                <Container className="my-1">
                    <Carousel responsive={responsive}>
                        {trending.map((data)=>{
                                if(data.title!==undefined){
                                    return(
                                        <div>
                                            <Item key={data.id} item={data}/>
                                        </div>
                                    )
                                }else{
                                    return(
                                        <div>
                                            <Itemtv key={data.id} item={data}/>
                                        </div>
                                    )
                                }
                            })
                        }
                    </Carousel>
                </Container>



            </div>
        </>
    )
}

export default Home