import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class extends Component {

  static defaultProps = {
    country:"in",
    category:"general",
  }
  static propsType = {
    country:PropTypes.string,
    category:PropTypes.string,   
  }
   constructor(props){
    super(props);
    this.state = {
      articles : [],
      //articles : this.articles,
      loading : false,
      page:1
    } 
    document.title = ` ${this.capitalizeFunction(this.props.category)} News App`;
  }

  capitalizeFunction = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async updateNews(){
    let apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3213a4757374467bbff2cb0ed2047633&page=${this.state.page }&pageSize=5`; // you can add page size as varible propes, naw its hardcode
    this.setState({loading:true});
    let data = await fetch(apiUrl);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles:parsedData.articles, 
      totalResults:parsedData.totalResults,
      loading:false
    })

  }

  async componentDidMount(){
    let apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3213a4757374467bbff2cb0ed2047633&page=1&pageSize=5`; // you can add page size as varible propes, naw its hardcode
    this.setState({loading:true});
    let data = await fetch(apiUrl);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles:parsedData.articles, 
      totalResults:parsedData.totalResults,
      loading:false
    })
  }

  previousbtn = async ()=>{    
    this.setState({page:this.state.page - 1});
    this.updateNews()
  }

  nextbtn = async ()=>{  
  this.setState({page:this.state.page - 1});
  this.updateNews()
}

  render() {
    return (
        <>
        <div className='container'>
            <h2 className='text-center' style={{margin:'35px 0px'}}>Top Headlines From {this.capitalizeFunction(this.props.category)}</h2>
            {this.state.loading && <Spinner/>}
            <div className='row my-3'>
                {!this.state.loading && this.state.articles.map((element)=>{
                   return <div className='col-md-4' key={element.url}>
                  <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage?element.urlToImage:"https://cdn.cnn.com/cnnnext/dam/assets/220821195503-pakistan-imran-khan-police-investigation-anti-terror-law-intl-hnk-super-tease.jpg"} newsUrl={element.url} author={element.author} dated={element.publishedAt} source={element.source.name}/>
                   </div> 
                })}                              
            </div>            
      </div>
        <div className='container mb-2 d-flex justify-content-between'> 
        <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.previousbtn}> &larr; Previous </button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/ 5)} type="button" className="btn btn-primary" onClick={this.nextbtn}>Next &rarr; </button>
        </div>
      </>
    )
  }
}
