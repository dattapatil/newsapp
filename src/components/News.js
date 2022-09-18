import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class extends Component {

  static defaultProps = {
    country: "in",
    category: "general",
  }
  static propsType = {
    country: PropTypes.string,
    category: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      //articles : this.articles,
      loading: false,
      page: 1,
      totalResults:0
    }
    document.title = ` ${this.capitalizeFunction(this.props.category)} News App`;
  }

  capitalizeFunction = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  async updateNews() {
    this.props.setProgress(0);
    let apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=5`; // you can add page size as varible propes, naw its hardcode
    this.setState({ loading: true });
    let data = await fetch(apiUrl);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(60);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews()        
  }

   fetchMoreData = async () => {
    this.setState({page:this.state.page+1});
    let apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=5`; // you can add page size as varible propes, naw its hardcode
   // this.setState({ loading: true });
    let data = await fetch(apiUrl);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
    })
  };

  render() {
    return (
      <>
       
          <h2 className='text-center' style={{ margin: '35px 0px' }}>Top Headlines From {this.capitalizeFunction(this.props.category)}</h2>
          
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner/>}
          >
             <div className='container'>
            <div className='row my-3'>
              {!this.state.loading && this.state.articles.map((element, index) => {
                return <div className='col-md-4' key={index}>
                  <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://cdn.cnn.com/cnnnext/dam/assets/220821195503-pakistan-imran-khan-police-investigation-anti-terror-law-intl-hnk-super-tease.jpg"} newsUrl={element.url} author={element.author} dated={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
            </div>
          </InfiniteScroll>
       
        
      </>
    )
  }
}
