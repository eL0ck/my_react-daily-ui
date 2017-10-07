import React from 'react'
import Logo from '../Logo'
import TitleList from '../TitleList'

const MenuPage = () => (
  <div>
    <header className="Header">
    <Logo />
    <div id="search" className="Search">
      <input type="search" placeholder="Search for a title..." />
    </div>
    </header>
    <TitleList name="The Simpsons" />
  </div>
)

export default MenuPage
