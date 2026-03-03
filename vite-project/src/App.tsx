import { BrowserRouter, Routes, Route } from "react-router-dom";
import Article from "./component/Article.tsx";
import Home from "./Home.tsx";
import LandingPage from "./component/LandingPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
    <Route path="/article/:id" element={<Article />} />
    </Routes>
    </BrowserRouter>
);
}

export default App;