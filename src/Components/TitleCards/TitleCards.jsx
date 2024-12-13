import React, {useEffect, useRef, useState} from 'react'
import "./TitleCards.css"
import cards_data from "../../assets/cards/Cards_data"

const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzkzN2Y3Y2YxOWU5NmY3NWNmYTNkYjFmNmVjNjRkYyIsIm5iZiI6MTczMzc2MDY3Ni43OTUsInN1YiI6IjY3NTcxNmE0OWJjMjBlYWE0OTY4MGQwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._ez-vkgRAzYVe-OpOHj9RILmpyHcMm2gBF6IvNnucP8'
    }
  };
 
  

const handleWheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltay;
}

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => (setApiData(res.results)))
    .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel', handleWheel)
},[])
  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <div className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
        </div>
      })};
      
    </div>
    </div>
  )
}

export default TitleCards