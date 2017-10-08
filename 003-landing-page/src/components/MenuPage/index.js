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
    this.state = { searchQuery: "" }
  }

  render() {
    return (
      <div>
        <header className="Header">
          <Logo />
          <Navigation />
          <div id="search" className="Search">
            <input type="search" placeholder="Search for a title..." />
          </div>
          <UserProfile />
        </header>
        <Hero />
        <TitleList name="Search Results" query={this.state.searchQuery}/>
        <TitleList name="The Simpsons" />
        <TitleList name="Comedy" />
        <TitleList name="Sci-Fi greats" />
        <TitleList name="Horror" />
        <TitleList name="Top TV picks for Jack" />
      </div>
    )
  }
}

export default MenuPage
