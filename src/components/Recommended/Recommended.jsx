import React from 'react'
import "./Recommended.css"


import { useState, useEffect } from 'react'
import { API_KEY } from '../../data'
import { value_converter } from '../../data'
import { Link } from 'react-router-dom'


const Recommended = ( {categoryId}) => {
    const [aPiData,setAPiData] = useState([]);
    const fetchData = async () => {
        const relatedVideos_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`
        await fetch(relatedVideos_url).then(res => res.json()).then(data=>setAPiData(data.items));
    }

    useEffect(() => {
        fetchData();
    }, []);

  return (

    <div className='recommended'>
      
      {aPiData.map((item,index) => {    
        return(
            
            <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
                <h4>{item.snippet.title}</h4>
                <p>{item.snippet.channelTitle}</p>
                <p>{value_converter ( item.statistics.viewCount)} views</p>
            </div>
        </Link>
        )
      })}
       
        
        
      
    </div>
  )
}

export default Recommended
