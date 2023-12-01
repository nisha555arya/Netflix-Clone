import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "../axios";
import requests from "../request";
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';

const Banner = () => {

    const [movie, setMovie] = useState([]);
    const [trailerurl, setTrailerurl] = useState("");

    useEffect(() => {

        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);

            // random movie function
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;

        } fetchData();
    }, [])

    function truncate(str ,n) 
    {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;  

    }  

    const handleClick = (movie) => {
        
        if(trailerurl){
          setTrailerurl("");
        }else{
          movieTrailer(movie?.name || "")
          .then(url => {
            const urlParams = new URLSearchParams( new URL(url).search);
            setTrailerurl(urlParams.get('v'));
   
          }).catch(error => console.log(error))
        }
          };

          const opts = {
            height: "390",
            width: "100%",
            playerVars: {
              autoplay:1,
            },
          }


    return (
        <>
            {/* header */}
            <header className="banner"
                style={{
                    backgroundColor:"white",
                    backgroundSize: "cover" ,
                    backgroundImage: `url(
               "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
           )`,
                    backgroundPosition: "center",
                }}
            >


                {/* Banner contents */}
                <div className="banner_contents">
                    <h1 className="banner__title">
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>

                </div>

                {/* 2 buttons */}
                <div className="buttons">
                    <button
                        onClick={() => handleClick(movie)}
                        className="banner__button">
                        Play
                    </button>
                    <button className="banner__button">
                        My List
                    </button>
                </div>

                {/* banner description */}
                <div className="banner_description">
                    <h1 className="banner__description">

                        {truncate(movie?.overview, 150)}

                    </h1>
                </div>
                <div className="banner--fadeBottom" />
            </header>
            
        </>
    )
};

export default Banner;
