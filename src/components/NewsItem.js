import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, dated, source} = this.props;
    return (
      
        <div className="card" style={{marginBottom:"30px"}}>
            <img src={imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
            <h5 className="card-title">{title}... <span className="badge text-bg-success">{source}</span></h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">by {!author ? "Unknown":author} on {new Date(dated).toGMTString()} </small></p>
            <a href={newsUrl} target="_blanck" className="btn btn-sm btn-primary">Read more..</a>
            </div>
            </div>
      
    )
  }
}
