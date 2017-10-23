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
        <TitleList active={this.state.searchActive} updates={true} name="Search Results" query={this.state.searchQuery}/>
        <TitleList active={true} updates={false} name="The Simpsons" />
        <TitleList active={true} updates={false} name="Comedy" />
        <TitleList active={true} updates={false} name="Sci-Fi greats" />
        <TitleList active={true} updates={false} name="Horror" />
        <TitleList active={true} updates={false} name="Top TV picks for Jack" />
      </div>
    )
  }
}

export default MenuPage
