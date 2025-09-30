    import { useParams } from 'react-router-dom';
    import { useEffect, useState, useRef } from "react";
    import { fetchTvId } from "../../services/api";
    import { watchlist, checkWatchList, remove_watchlist, addRating, checkRatingsList } from "../../services/authService";
    import starIcon from '../../assets/icons8-star-48.png';
    import LoadingScreen from "../LoadingScreen/LoadingScreen"
    import Popup from '../Popup/Popup';
    import 'typeface-playfair-display';             //font
    import "./FilmDetail.css";

    function FilmDetail() {
        const { id } = useParams();
        // const [filmDescription, setfilmDescription] = useState("");
        const [tvData, setTvData] = useState(null);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true);
        const [addedShow, setAddedShow] = useState(false);
        const [ratingClicked, setRatingClicked] = useState(false);
        const [currentStarRating, setCurrentStarRating] = useState(0);
        const [passedStarRating, setPassedStarRating] = useState(0);

        // --- fetch tv when id changes
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
        }, [id]);

        //Checking if the show is in users watchlist
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

        //Adding/Unadding from watchlist 
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
        
        }

        const renderRating = () => {
            const stars = []
            for(let i = 0; i < 10; i++){
                const n = i + 1;
                stars.push(
                    <button
                        key={n}
                        className={n <= currentStarRating ? "star-active" : "star"}
                        onClick={() => setCurrentStarRating(n)}
                    >
                    {n <= currentStarRating ? "★" : "☆"}
                    </button>
                );
            }
            return (stars);
        }

        //passing rating to DB
        const passRating = async() => {
            try{
                const result = await addRating(tvData.id, "tv", currentStarRating);
                if (result.error){
                    alert(result.error)
                } else{
                    setPassedStarRating(currentStarRating)
                    return true;
                }
            }
            catch(e){
                console.log(e);
                alert('Failed to rate film')
                return false;
            }
        }

        useEffect(() => {
            if (tvData){
                const checkMovieRating = async () => {
                    try {
                        const result = await checkRatingsList();
                        const matched = result.ratings?.find(
                                (item) => Number(item.id) === Number(tvData.id) && item.type === 'tv'
                        );
                        if (matched){
                            setPassedStarRating(matched.rating);
                            setCurrentStarRating(matched.rating);
                            console.log(matched.rating);
                        }
                    } catch (err) {
                        console.error("Failed to find ratings", err);
                    }
                };
                checkMovieRating();
            }
            
        }, [tvData]);

        if (loading || !tvData) {
            console.log(tvData);
            return <LoadingScreen />
            
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
                                <button 
                                    onClick={() => setRatingClicked(true)} 
                                    style = {{
                                        backgroundColor: passedStarRating === 0 ? 'rgb(123, 64, 163)' : 'grey',
                                        fontSize: passedStarRating === 0 ? '14px' : 'large'
                                        }}>
                                    {passedStarRating === 0 ? 'Rate this Film' : passedStarRating + `★`}
                                </button> 
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
                <Popup trigger={ratingClicked}>
                    <button className='close-button' onClick={() => setRatingClicked(false)}>close</button>
                    <button 
                        className='close-button'
                        onClick={() => { 
                            setRatingClicked(false) 
                            setCurrentStarRating(passedStarRating)
                        }}
                        >close
                    </button>
                    <div className="stars">
                        {renderRating()}
                    </div>
                    <button 
                        className='save-button'
                        onClick={async () => {
                            const ok = await passRating();
                            if (ok) setRatingClicked(false);
                        }}>save</button>
                </Popup>
            </div>    
        );
    }
    export default FilmDetail;