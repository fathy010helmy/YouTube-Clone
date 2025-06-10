import React from 'react'
import "./playVideo.css"
import Video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import { API_KEY, value_converter } from '../../data'
import { useState, useEffect} from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'


const PlayVideo = () => {

const {videoId} = useParams();
const[channelData, setChannelData] = useState(null);

const [comments, setComments] = useState([]);

        const [aPiData, setAPiData] = useState(null);
        const fetchVideoData = async () => {
            const videoDetails_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
            await fetch(videoDetails_url).then(res => res.json()).then(data => setAPiData(data.items[0]));

        }

        const fetchOtherData = async () => {
            const channelDetails_url=`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${aPiData.snippet.channelId}&key=${API_KEY}`
            await fetch(channelDetails_url).then(res => res.json()).then(data => setChannelData(data.items[0]))
            const comments_url=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
            await fetch(comments_url).then(res => res.json()).then(data => setComments(data.items));
        }
    
    useEffect(() => {
        fetchVideoData();
    }, [videoId])

    useEffect(() => {
        fetchOtherData();
    }, [aPiData])

  return (
    <div className='play-video'>
        {/* <video src={Video1 }controls autoPlay muted ></video> */}

<iframe
  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
></iframe>

        <h3>{aPiData?aPiData.snippet.title:"loading"}</h3>
        <div className="play-video-info">
<p>
  {aPiData ? value_converter(aPiData.statistics.viewCount) : "16k"} views &bull;{" "}
  {aPiData ? moment(aPiData.snippet.publishedAt).fromNow() : ""}
</p>
            <div>
                <span><img src={like} alt="" />{aPiData?value_converter ( aPiData.statistics.likeCount):155}</span>
                <span><img src={dislike} alt="" />{aPiData?value_converter ( aPiData.statistics.dislikeCount):155}</span>
                <span><img src={share} alt="" />{aPiData?value_converter ( aPiData.statistics.shareCount):155}</span>
                <span><img src={save} alt="" />{aPiData?value_converter ( aPiData.statistics.saveCount):155}</span>
            </div>
        </div>
        <hr/>
        <div className='publisher'>
            <img src={channelData?channelData.snippet.thumbnails.default.url:jack} alt="" />
            <div>
                <p>{aPiData?aPiData.snippet.channelTitle:""}</p>
                <span>{channelData?value_converter ( channelData.statistics.subscriberCount):""} subscribers </span>
            </div>
            <button>Subscribe</button>

        </div>
        <div className="video-description">
            <p>{aPiData?aPiData.snippet.description.slice(0, 250):"Description here"}</p>  
                <hr/>
                <h4>{aPiData?value_converter(aPiData.statistics.commentCount):102} Comments</h4>
                
                {
                    comments.map((item,index)=>{

                        return(

                            <div key={index} className="comment">
                    <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                    <div>
                        <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.topLevelComment.snippet.updatedAt).fromNow()}</span></h3>
                        <p>{item.snippet.topLevelComment.snippet.textOriginal}</p>
                        <div className="comment-action">
                            <img src={like} alt="" />
                            <span>{value_converter ( item.snippet.topLevelComment.snippet.likeCount)} </span>
                            <img src={dislike } alt="" />
                            <span>{item.snippet.topLevelComment.snippet.dislikeCount}</span>
                        </div>
                    </div>

                </div>
                        )

                    }
                
                
                )
                }
                  

            </div>
      
    </div>
  )
}

export default PlayVideo
