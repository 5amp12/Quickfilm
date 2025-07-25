import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import SignUpView from "./pages/SignUpView"; 
import SignInView from "./pages/SignInView"; 
import SearchPage from "./pages/Search";
import FilmDetailView from "./pages/FilmDetailView"
import WatchListView from "./pages/WatchListView"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUpView />} />
                <Route path="/signin" element={<SignInView />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/film/:id" element={<FilmDetailView />} />
                <Route path="/watchlist" element={<WatchListView />} />
            </Routes>
        </Router>
    );
}

export default App;

