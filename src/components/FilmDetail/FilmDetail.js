    import { useParams } from 'react-router-dom';
    import { useEffect, useState, useRef } from "react";
    import { fetchFilmId } from "../../services/api";
    import starIcon from '../../assets/icons8-star-48.png';
    import 'typeface-playfair-display';             //font
    import "./FilmDetail.css";

    function FilmDetail() {
        const { id } = useParams();
        // const [filmDescription, setfilmDescription] = useState("");
        const [movieData, setMovieData] = useState(null);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true);
        const [budget, setBudget] = useState(true);
        const [isCorrectBudget, setIsCorrect] = useState(null);
        const [selectedBudget, setSelectedBudget] = useState(null);
        const [isBudgetDisabled, setIsBudgetDisabled] = useState(false);
        const [noBudget, setNoBudget] = useState(false);
        
        useEffect(() => {
            const filmData = async () => {
                try{
                    const data = await fetchFilmId(id);
                    console.log(data);
                    console.log('https://image.tmdb.org/t/p/original/' + data.backdrop_path)
                    const shortDate = data.release_date.slice(0, 4);   //getting the year made
                    if (data.budget == 0){
                        setNoBudget(true);
                    }
                    
                    let budgetOption = 0;
                    let budgetOption2 = 0; 
                    setBudget(data.budget.toLocaleString())

                    //make it 10% and round up
                    if (data.budget > 10000000 && data.budget < 20000000){
                        budgetOption = data.budget + 5000000
                        budgetOption2 = data.budget - 5000000
                    }else if (data.budget > 100000000){
                        budgetOption = data.budget + 10000000
                        budgetOption2 = data.budget - 10000000
                    }else if(data.budget < 100000000){
                        budgetOption = data.budget + 1000000
                        budgetOption2 = data.budget - 1000000
                    }else if(data.budget == 0){          //budget will occasionally be 0, make a clause for this
                        
                    }

                    let shuffledList = [data.budget.toLocaleString(), budgetOption.toLocaleString(), budgetOption2.toLocaleString()];
                    for (let i = 0; i < shuffledList.length - 1; i++){
                        const j = Math.floor(Math.random() * 3)          //random new position
                        let storing = shuffledList[i];
                        shuffledList[i] = shuffledList[j];
                        shuffledList[j] = storing;
                        console.log(i);
                    }
                    console.log(shuffledList)
                    
                    
                    // console.log(i);
                    

                    const movie = {
                        title: data.title,
                        description: data.overview,
                        rating: data.vote_average.toFixed(1),  
                        genres: data.genres.slice(0, 3),
                        // cast
                        tagline: data.tagline,
                        runtime: data.runtime,
                        budgets: shuffledList,   
                        budgetOpt2: budgetOption.toLocaleString(),
                        budgetOpt3: budgetOption2.toLocaleString(),
                        date: shortDate,
                        
            
                        // let backdrop_data = data.backdrop_path;
                        backdrop: 'https://image.tmdb.org/t/p/original/' + data.backdrop_path,
                        poster: 'https://image.tmdb.org/t/p/original/' + data.poster_path
                        
                    };
                    setMovieData(movie);
                }
                catch (error){
                    setError(error.message);
                }
                finally{
                    setLoading(false);
                }
                
        
            };
            filmData();
        }, []);

        const correctBudget = (budgetGuess) => {
            console.log(budgetGuess);
            setSelectedBudget(budgetGuess);
            if (budgetGuess == budget){
                setIsCorrect(true)
                setIsBudgetDisabled(true)
            }
        } 

        if (loading || !movieData) {
            console.log(movieData);
            return <div className="display-msg">Loading...</div>;
            
        }
        if (error){
            return <div className="display-msg">Error...</div>;
        }
        return (
            <div className='movieContainer'>
                <img src={movieData.backdrop} alt={movieData.title + " backdrop"} id='backdrop'/>
                <div className='movie-contents'>
                    <div className='info-container'>
                        <h1 id='title-date'>{movieData.title} - {movieData.date}</h1>
                        <h3 id='tagline'>{movieData.tagline}</h3>
                        <p id='description'>{movieData.description}</p>
                        <div className='list-container'>
                            <div className='genre-list'>
                                {movieData.genres.map((genre) => (
                                    <span key={genre.key} className='genre-box'>{genre.name}</span>
                                ))}
                                
                            </div>
                            <div className='add-film-list'>
                                <button>Add to WatchList</button>
                                <button>Rate this Film</button> 
                            </div>
                        </div>

                    </div>
                    <div className='poster-extra-content'>
                        <div className='rating-runtime-container'>
                            <div className='star-rating'>
                                <img src={starIcon} alt='star' id='star-icon'></img>
                                <h3 id='rating'>{movieData.rating}</h3>
                            </div>
                            <h3 id='runtime'>{movieData.runtime} mins</h3>
                        </div>
                        <div className='poster-quiz-container'>
                            <div>
                                <img src={movieData.poster} alt={movieData.title + " poster"} id='poster'/>
                            </div>
                            <div className='budget-quiz-container'>
                                <p style={{visibility: noBudget ? 'hidden' : 'visible',}}>Guess the Budget!</p>
                                {movieData.budgets.map((budget, index) => (
                                    <span 
                                        key={index} 
                                        onClick={() => correctBudget(budget)} 
                                        style={{
                                            backgroundColor:
                                                selectedBudget === budget
                                                    ? isCorrectBudget
                                                        ? 'green'
                                                        : 'red'
                                                    : 'grey',
                                            cursor: isBudgetDisabled ? 'default' : 'pointer',
                                            pointerEvents: isBudgetDisabled ? 'none' : 'auto',
                                            opacity: isBudgetDisabled ? 0.6 : 1,
                                            visibility: noBudget ? 'hidden' : 'visible',
                                        }}
                                        className='budget-quiz'>${budget}   
                                    </span>
                                ))}
                            </div> 
                            
                        </div>
                    </div>
                </div>
            </div>    
        );
    }
    export default FilmDetail;