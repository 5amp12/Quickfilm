import { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { checkWatchList } from "../../services/authService";
import { fetchFilmId, fetchTvId } from "../../services/api"
import LoadingScreen from "../LoadingScreen/LoadingScreen"
import "./WatchList.css";

function WatchList() {
    const [error, setError] = useState(null);
    const [mediaList, setMediaList] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const scanWatchList = async () => {
            try{
                const mediaID = await checkWatchList(); 
                const list = []
                for (let media of mediaID.watchlist){

                    let data;
                    let mediaTitle;

                    if (media.type === "film") {
                        data = await fetchFilmId(media.id);
                        mediaTitle = (data.title);
                    }
                    else if (media.type === "tv"){
                        data = await fetchTvId(media.id)
                        mediaTitle = (data.name);
                    }
                    
                    console.log(data);

                    let mediaId = data.id;
                    let posterPath = data.poster_path;
                    let posterImg = ('https://image.tmdb.org/t/p/original/'+ posterPath);
                    let mediatype = media.type;

                    list.push({ id: mediaId, title: mediaTitle, poster: posterImg, mediatype: mediatype });

                }
                setMediaList(list);

            } catch (error){
                console.error(error);
            }
            finally{
                setLoading(false)
            }

        }
        scanWatchList();
    }, [])

    if (loading || !mediaList){
        return <LoadingScreen />
    }
    if (error){
        return <h3 className="display-msg">Error...</h3>
    }
    if (mediaList.length === 0) {
        return <div className="display-msg">No Watchlist found!</div>;
    }

    return(
        <div className="movie-list-search-container">
            <div className="movie-list-search">
                {mediaList.map((media) => ( 
                    
                    media.mediatype == 'film' ? (
                        <Link key={media.id} to={`/film/${media.id}`}>
                        <div key={media.id} className="movie-card-search">
                            <img src={media.poster}/> 
                            <div className='card-title-container'><p>{media.title}</p></div>
                        </div>
                        </Link>
                    ) : (
                        <Link key={media.id} to={`/tv/${media.id}`}>
                        <div key={media.id} className="movie-card-search">
                            <img src={media.poster}/> 
                            <div className='card-title-container'><p>{media.title}</p></div>
                        </div>
                        </Link>
                    )
               
                ))}
            </div>
        </div>
    )
}
export default WatchList;