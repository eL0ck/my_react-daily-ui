import './styles.css'
import React, { Component } from 'react'
import Logo from '../Logo'
import TitleList from '../TitleList'
import UserProfile from '../UserProfile'
import Navigation from '../Navigation'
import Hero from '../Hero'


const MovieDB = require('moviedb')('838f6976dbdff9ce8ec7aa0b31424e11')

class MenuPage extends Component {
  constructor(props) {
    super(props)
    this.state = { searchActive: false, searchQuery: "", temp: ""}
  }

  handleSearchInput = e => {
    this.setState({ temp: e.target.value })
  }

  fireSearchOnEnter = e => {
    if (e.key === 'Enter' ){
      console.log("Enter key pressed. Searching ... ")
      console.log("Search Term is", this.state.temp );
      this.setState({ searchActive: true, searchQuery: this.state.temp })
    }
  }

  queryMaker(props, callback) {
    if (props.name === 'Comedy') {
      MovieDB.genreMovies({ id: 35 }, callback)
    } else
    if (props.name === 'Sci-Fi greats') {
      MovieDB.genreMovies({ id: 878 }, callback)
    } else
    if (props.name === 'Horror') {
      MovieDB.genreMovies({ id: 27 }, callback)
    } else
    if (props.name === 'The Simpsons') {
      MovieDB.searchMovie({ query: 'Simpsons' }, callback);
    } else
    if (props.name === 'Top TV picks for Jack') {
      MovieDB.discoverTv({}, callback);
    } else
    if (props.name === 'Search Results') {
      console.log(`Searching for: ${props.query}`);
      if (props.query !== '') { // Should remove this
        MovieDB.searchMovie({ query: props.query }, callback);
      }
    } else {
      // eslint-disable-next-line no-console
      console.log('DB query is unimplimented! not displaying this component ... ')
    }
  }

  render() {
    return (
      <div>
        <header className="Header">
          <Logo />
          <Navigation />
          <div id="search" className="Search">
            <input type="search"
              onChange={ this.handleSearchInput }
              onKeyUp={ this.fireSearchOnEnter}
              placeholder="Search for a title..."
              value={ this.state.temp } />
          </div>
          <UserProfile />
        </header>
        <Hero />
        <TitleList active={this.state.searchActive} updates={true} name="Search Results" query={this.state.searchQuery} loadContentFunc={this.queryMaker} />
        <TitleList active={true} updates={false} name="The Simpsons" loadContentFunc={this.queryMaker} />
        <TitleList active={true} updates={false} name="Comedy" loadContentFunc={this.queryMaker} />
        <TitleList active={true} updates={false} name="Sci-Fi greats" loadContentFunc={this.queryMaker} />
        <TitleList active={true} updates={false} name="Horror" loadContentFunc={this.queryMaker} />
        <TitleList active={true} updates={false} name="Top TV picks for Jack" loadContentFunc={this.queryMaker} />
      </div>
    )
  }
}

export default MenuPage
