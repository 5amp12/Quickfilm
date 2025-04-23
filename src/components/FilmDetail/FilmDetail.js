import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { fetchFilmId } from "../../services/api";
import "./FilmDetail.css";

function FilmDetail() {
    const { id } = useParams();
    // const [filmDescription, setfilmDescription] = useState("");
    const [movieList, setMovieList] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // console.log("hello")
    useEffect(() => {
        const filmData = async () => {
            try{
                // console.log("filmdadt hitting")
                const data = await fetchFilmId(id);
                console.log(data);
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
    if (loading || !movieList) {
        return <div className="display-msg">Loading...</div>;
    }
    if (error){
        return <div className="display-msg">Error...</div>;
    }
    return (
        <div>
            <p>hello</p>
        </div>
    );
}
export default FilmDetail;