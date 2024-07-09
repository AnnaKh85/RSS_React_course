import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import ResultsComponent from "./components/result/ResultsComponent.tsx";

ReactDOM.render(
    <Router>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="search" element={<ResultsComponent searchTerm="" />} />
            </Route>
        </Routes>
    </Router>,
    document.getElementById('root')
);