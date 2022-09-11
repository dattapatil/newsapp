import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
      <BrowserRouter>     
        <NavBar />        
        <Routes>
            <Route path="/" element={<News key="general" country="in" category="general" />}></Route>
            <Route path="/business" element={<News key="business" country="in" category="business" />}></Route>
            <Route path="/entertainment" element={<News key="entertainment" country="in" category="entertainment" />}></Route>
            <Route path="/general" element={<News key="general" country="in" category="general" />}></Route>
            <Route path="/health" element={<News key="health" country="in" category="health" />}></Route>
            <Route path="/science" element={<News key="science" country="in" category="science" />}></Route>
            <Route path="/sports" element={<News key="sports" country="in" category="sports" />}></Route>
            <Route path="/technology" element={<News key="technology" country="in" category="technology" />}></Route>         
        </Routes>        
        </BrowserRouter>
        </div>
      
    )
  }
}
