import React, { useEffect, useState } from 'react'
import "./Player.css"
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

export const Player = () => {

  const {id}=useParams();

  const navigate=useNavigate();


const [apiData,setApiData]=useState({
  name:"",key:"",published_at:"",typeof:""
})
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjA0NWI4MzdlNDdiODNjYzU0M2YyNzZhNjU5OTc0ZCIsInN1YiI6IjY2NWRjY2JmNDcxN2IzODI3NTc5OTQ1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z09fDL4CwpniftoSO1Ty0LTP1WhtA5DOZ4aJfZKIoI8'
    }
  };
  
useEffect(()=>{  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
.then(response => response.json())
.then(response => setApiData(response.results[0]))
.catch(err => console.error(err));},[])
  return (
    <div className='player'>

      <img src={back_arrow_icon} alt='' onClick={()=>{navigate(-2)}}/>
<iframe width="90%" height="90%" title='trailer' frameBorder="0" allowFullScreen src={`https://www.youtube.com/embed/${apiData.key}`}></iframe>
    <div className='player-info'>
<p>{apiData.published_at.slice(0,10)}</p>
<p>{apiData.name}</p>
<p>{apiData.typeof}</p>

    </div>
    
    
    </div>
  )
}
