    import { useParams } from 'react-router-dom';
    import { useEffect, useState, useRef } from "react";
    import { fetchTvId } from "../../services/api";
    import { watchlist, checkWatchList, remove_watchlist } from "../../services/authService";
    import starIcon from '../../assets/icons8-star-48.png';
    import LoadingScreen from "../LoadingScreen/LoadingScreen"
    import 'typeface-playfair-display';             //font
    import "./FilmDetail.css";

    function FilmDetail() {
        const { id } = useParams();
        // const [filmDescription, setfilmDescription] = useState("");
        const [tvData, setTvData] = useState(null);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true);
        const [addedShow, setAddedShow] = useState(false);
        
        useEffect(() => {
            const TvData = async () => {
                try{
                    const data = await fetchTvId(id);
                    console.log(data);
                    console.log('https://image.tmdb.org/t/p/original/' + data.backdrop_path)
                    const shortDate = data.first_air_date.slice(0, 4);   //getting the year made

                    const tv = {
                        id: data.id,
                        title: data.name,
                        description: data.overview,
                        rating: data.vote_average.toFixed(1),  
                        genres: data.genres.slice(0, 3),
                        // cast
                        tagline: data.tagline,
                        date: shortDate,
            
                        // let backdrop_data = data.backdrop_path;
                        backdrop: 'https://image.tmdb.org/t/p/original/' + data.backdrop_path,
                        poster: 'https://image.tmdb.org/t/p/original/' + data.poster_path
                        
                    };
                    // console.log(tv.date, tv.)

                    setTvData(tv);
                }
                catch (error){
                    setError(error.message);
                }
                finally{
                    setLoading(false);
                }
                
        
            };
            TvData();
        }, []);

        useEffect(() => {
            console.log("TvData:", tvData);
            if (tvData){
                const checkWatchlist = async () => {
                    try {
                        const result = await checkWatchList();
                        if (
                            result.watchlist?.some(
                                (item) => Number(item.id) === Number(tvData.id) && item.type === 'tv'
                            )
                        ) {
                            setAddedShow(true);
                        }
                    } catch (err) {
                        console.error("Failed to fetch watchlist:", err);
                    }
                };
                checkWatchlist();
            }

            
        }, [tvData]);

        const settingWatchlist = async() => {
            console.log(tvData.id)
            if (addedShow === true){
                const result = await remove_watchlist(tvData.id, "tv");
                setAddedShow(false);
            }
            else{
                const result = await watchlist(tvData.id, "tv");
                if (result.error){
                    alert(result.error)
                } else{
                    setAddedShow(true);
                }
            }
            // setMessage
            // alert
        }

        if (loading || !tvData) {
            console.log(tvData);
            return <LoadingScreen />
            // return <div className="display-msg">Loading...</div>;
            
        }
        if (error){
            return <div className="display-msg">Error...</div>;
        }
        return (
            <div className='movieContainer'>
                <img src={tvData.backdrop} alt={tvData.title + " backdrop"} id='backdrop'/>
                <div className='movie-contents'>
                    <div className='info-container'>
                        <h1 id='movie-title'>{tvData.title}</h1>
                        <h2 id='movieDate'>{tvData.date}</h2>
                        <h3 id='tagline'>{tvData.tagline}</h3>
                        <p id='description'>{tvData.description}</p>
                        <div className='list-container'>
                            <div className='genre-list'>
                                {tvData.genres.map((genre) => (
                                    <span key={genre.key} className='genre-box'>{genre.name}</span>
                                ))}
                                
                            </div>
                            <div className='add-film-list'>
                                <button onClick={settingWatchlist} style={{backgroundColor: addedShow ? 'grey' : 'rgb(123, 64, 163)',}} >
                                    {addedShow ? 'Added to Watchlist' : 'Add to Watchlist'}
                                </button>
                                <button>Rate this Show</button> 
                            </div>
                        </div>

                    </div>
                    <div className='poster-extra-content'>
                        <div className='rating-runtime-container'>
                            <div className='star-rating'>
                                <img src={starIcon} alt='star' id='star-icon'></img>
                                <h3 id='rating'>{tvData.rating}</h3>
                            </div>
                        </div>
                        <div className='poster-quiz-container'>
                            <div>
                                <img src={tvData.poster} alt={tvData.title + " poster"} id='poster'/>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>    
        );
    }
    export default FilmDetail;