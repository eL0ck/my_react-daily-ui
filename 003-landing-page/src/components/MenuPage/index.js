import './styles.css'
import React, { Component } from 'react'
import Logo from '../Logo'
import TitleList from '../TitleList'
import UserProfile from '../UserProfile'
import Navigation from '../Navigation'
import Hero from '../Hero'

class MenuPage extends Component {
  constructor(props) {
    super(props)
    this.state = { searchQuery: "", temp: ""}
  }

  handleSearchInput = e => {
    console.log("input change handler fired ... ")
    this.setState({ temp: e.target.value })
  }

  fireSearchOnEnter = e => {
    if (e.key === 'Enter' ){
      console.log("Enter key pressed. Searching ... ")
      console.log("Search Term is", this.state.temp );
      this.setState({ searchQuery: this.state.temp })
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
        <TitleList updates={true} name="Search Results" query={this.state.searchQuery}/>
        <TitleList updates={false} name="The Simpsons" />
        <TitleList updates={false} name="Comedy" />
        <TitleList updates={false} name="Sci-Fi greats" />
        <TitleList updates={false} name="Horror" />
        <TitleList updates={false} name="Top TV picks for Jack" />
      </div>
    )
  }
}

export default MenuPage
