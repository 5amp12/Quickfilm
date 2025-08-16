import { useEffect, useState, useRef } from "react";
import { checkWatchList } from "../../services/authService";
import { fetchFilmId } from "../../services/api"

function WatchList() {
    console.log("hello")
    
   
    const scanWatchList = async () => {
        try{
            const filmsID = await checkWatchList();
            console.log(filmsID);
            for (let film of filmsID.watchlist){
                
                const data = await fetchFilmId(film);
                console.log(data);
            }

        } catch (error){
            console.error(error);
        }
    }
    scanWatchList();

    
}
export default WatchList;