import './styles.css'
import React, { Component } from 'react'
import Title from '../Title'

const MovieDB = require('moviedb')('838f6976dbdff9ce8ec7aa0b31424e11')
const apiKey = '838f6976dbdff9ce8ec7aa0b31424e11'
//const apiKey = '87dfa1c669eea853da609d4968d294be'

// eslint-disable-next-line react/prefer-stateless-function
class TitleList extends Component{
  constructor(props) {
    super(props)
    this.state = {data: [], mounted: false};
  }

  loadContent() {
    /*
    var requestUrl = 'https://api.themoviedb.org/3/' + this.props.url + '&api_key=' + apiKey;
    console.log('requestUrl is: ' + requestUrl);
    fetch(requestUrl).then((response)=>{
      return response.json();
    }).then((data)=>{
      this.setState({data : data});
      console.log("This data returned:");
      console.log(data);
    }).catch((err)=>{
      console.log("There has been an error: " + err);
    });
    */
    MovieDB.searchMovie({ query: 'Simpsons'  }, (err, res) => {
      console.log(res);
      this.setState({data: res})
    });
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.url !== this.props.url && nextProps.url !== ''){
      this.setState({mounted:true,url:nextProps.url},()=>{
        this.loadContent();
      });
    }
  }

  componentDidMount() {
    if(this.props.url !== ''){
      this.loadContent();
      this.setState({mounted:true});
    }
  }

  render() {
    var titles ='';
    if(this.state.data.results) {
      titles = this.state.data.results.map(function(title, i) {
        if(i < 5) {
          var name = '';
          var backDrop = 'http://image.tmdb.org/t/p/original' + title.backdrop_path;
          if(!title.name) {
            name = title.original_title;
          } else {
            name = title.name;
          }

          return (
            <Title key={title.id} title={name} score={title.vote_average} overview={title.overview} backdrop={backDrop} />
          );

        }else{
          return (<div key={title.id}></div>);
        }
      });
    }

    return (
      <div ref="titlecategory" className="TitleList" data-loaded={this.state.mounted}>
        <div className="Title">
          <h1>{this.props.name}</h1>
          <div className="titles-wrapper">
            {titles}
          </div>
        </div>
      </div>
    );
  }
}

export default TitleList

