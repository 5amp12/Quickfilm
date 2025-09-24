import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home"; 
import SignUpView from "./pages/SignUpView"; 
import SignInView from "./pages/SignInView"; 
import SearchPage from "./pages/Search";
import FilmDetailView from "./pages/FilmDetailView"
import TvDetailView from "./pages/TvDetailView"
import WatchListView from "./pages/WatchListView"

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUpView />} />
                    <Route path="/signin" element={<SignInView />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/film/:id" element={<FilmDetailView />} />
                    <Route path="/tv/:id" element={<TvDetailView />} />
                    <Route path="/watchlist" element={<WatchListView />} />
                </Routes>
            </Router>
            
            {/* https://fkhadra.github.io/react-toastify/introduction/ */}
            <ToastContainer 
                position="top-right"
                autoClose={2000}
                hideProgressBar={false} 
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"   
                transition={Slide}
            />
        </>
    
    );
}

export default App;

