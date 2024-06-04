import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data  from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';

export const TitleCards = ({title,category}) => {
  const [apiData,setApiData]=useState([]);
  const cardsRef=useRef()
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjA0NWI4MzdlNDdiODNjYzU0M2YyNzZhNjU5OTc0ZCIsInN1YiI6IjY2NWRjY2JmNDcxN2IzODI3NTc5OTQ1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z09fDL4CwpniftoSO1Ty0LTP1WhtA5DOZ4aJfZKIoI8'
    }
  };
  
  
const handleWheel=(event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft+=event.deltaY;
}
useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));
  
  
  
  cardsRef.current.addEventListener('wheel',handleWheel)},[])
  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className='card' key={index}>

            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt=''></img>
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}
