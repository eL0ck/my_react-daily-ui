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

  // This must be an arrow funct to use 'this' without passing the instance in.
  saveQueryToState = (err, res) => {
    if (err){
      console.log('ERROR:', err)
      this.setState({error: err})
    } else if (res) {
      this.setState({data: res})
    } else {
      console.log('Neither err or res found on this query');
    }
  }

  loadContent() {
    if (this.props.name === 'Comedy') {
      MovieDB.genreMovies({ id: 35 }, this.saveQueryToState)
    } else
    if (this.props.name === 'Sci-Fi greats') {
      MovieDB.genreMovies({ id: 878 }, this.saveQueryToState)
    } else
    if (this.props.name === 'Horror') {
      MovieDB.genreMovies({ id: 27 }, this.saveQueryToState)
    } else
    if (this.props.name === 'The Simpsons') {
      MovieDB.searchMovie({ query: 'Simpsons' }, this.saveQueryToState);
    } else
    if (this.props.name === 'Top TV picks for Jack') {
      MovieDB.discoverTv({}, this.saveQueryToState);
    } else {
      console.log("Unimplimented ERROR");
    }
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
        } else {
          // Only display 5 but keep id's for later
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

