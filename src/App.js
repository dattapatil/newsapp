import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API; // api KEY 
  state = {
    progress:10
  }
  
  setProgress = (progress)=>{
    this.setState({progress:progress});
  }
  
  render() {
    return (
      <div>
      <BrowserRouter>     
        <NavBar /> 
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        height={3}
      />       
        <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" country="in" category="general" />}></Route>
            <Route path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" country="in" category="business" />}></Route>
            <Route path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" country="in" category="entertainment" />}></Route>
            <Route path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" country="in" category="general" />}></Route>
            <Route path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" country="in" category="health" />}></Route>
            <Route path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" country="in" category="science" />}></Route>
            <Route path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" country="in" category="sports" />}></Route>
            <Route path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" country="in" category="technology" />}></Route>         
        </Routes>        
        </BrowserRouter>
        </div>
      
    )
  }
}
