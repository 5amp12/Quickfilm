import { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { fetchPopularTV } from "../../services/api";
import LoadingScreen from "../LoadingScreen/LoadingScreen"
import "./popularFilmsTV.css";
//should have css call here

function popularTV(){
    const [error, setError] = useState(null); // State to track errors
    const [tvList, setTvList] = useState(null);
    const [loading, setLoading] = useState(true);
    const tvListRef = useRef(null);

    useEffect(() => {
        const checkPopularTV = async () => {
            setLoading(true);
            try{
                const data = await fetchPopularTV();   //api call
                const list = []
                console.log(data)
                let i = 0
                while (list.length < 10 && i < data.results.length){
                    let tvTitle = (data.results[i].name);
                    let tvId = data.results[i].id;
                    let posterPath = data.results[i].poster_path;
                    let posterImg = ('https://image.tmdb.org/t/p/original/'+ posterPath);
                    console.log(tvTitle);
                    console.log(tvId);
                    list.push({ id: tvId, title: tvTitle, poster: posterImg });

                    i++;
                }
                setTvList(list);
            }
            catch (error){
                setError(error.message);
            }
            finally{
                setLoading(false);
            }
        };
        checkPopularTV();

    }, []);
    if (loading || !tvList) {
        return <LoadingScreen />
        // return <div className="display-msg">Loading...</div>;
    }
    if (error){
        return <div className="display-msg">Error...</div>;
    }
    if (tvList.length === 0) {
        return <div className="display-msg">No Shows found!</div>;
    }


    const scrollLeft = () => {
        if (tvListRef.current) {
          tvListRef.current.scrollBy({ left: -700, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (tvListRef.current) {
          tvListRef.current.scrollBy({ left: 700, behavior: 'smooth' });
        }
    };

    return(
        <div className="popular-film-container">
            <p className="pop-films-header">Top 10 Shows This week</p>
            <div className="movie-list-container">
                <button className="scroll-button left" onClick={() => scrollLeft()}>
                ◀
                </button>

                <div className="movie-list" ref={tvListRef}>
                    {tvList.map((tv) => ( 
                        <Link key={tv.id} to={`/tv/${tv.id}`}>
                            <div key={tv.id} className="movie-card">
                                <img src={tv.poster}/> 
                                <div className='card-title-container'><p>{tv.title}</p></div>
                            </div>
                        </Link>
                    ))}
                </div>

                <button className="scroll-button right" onClick={() => scrollRight()}>
                ▶
                </button>
            </div>
        </div>
    )
}
export default popularTV;