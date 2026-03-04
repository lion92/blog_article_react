import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import LandingPage from "./component/LandingPage.tsx";
import ArticleManager from "./component/article/ArticleManager.tsx";
import Article from "./component/article/Article.tsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/admin/articles" element={<ArticleManager/>}/>
                <Route path="/article/:id" element={<Article/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;