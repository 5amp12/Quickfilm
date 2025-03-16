import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import SignUpView from "./pages/SignUpView"; 
import SearchPage from "./pages/Search";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUpView />} />
                <Route path="/search" element={<SearchPage />} />
            </Routes>
        </Router>
    );
}

export default App;

