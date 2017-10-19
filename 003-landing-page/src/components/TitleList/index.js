import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'
import Title from '../Title'


const MovieDB = require('moviedb')('838f6976dbdff9ce8ec7aa0b31424e11')

// eslint-disable-next-line react/prefer-stateless-function
class TitleList extends Component {
  constructor(props) {
    super(props)
    this.state = { data: [], mounted: false };
  }

  // For the initial mount
  componentWillMount() {
    this.loadContent()
  }

  // For refreshes
  shouldComponentUpdate(nextProps) {
    return true
  }

    //if (this.props.query !== nextProps.query) return true
    //return false
  //}
  componentWillUpdate() {
    this.loadContent()
  }

  // This must be an arrow funct to use 'this' without passing the instance in
  // but apparently its not stricly ES6.
  saveQueryToState = (err, res) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('ERROR:', err);
      this.setState({ error: err })
    } else if (res) {
      this.setState({ data: res, mounted: true })
    } else {
      // eslint-disable-next-line no-console
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
    } else
    if (this.props.name === 'Search Results') {
      console.log('Search results reached. ');
      console.log(`query is: ${this.props.query}`)
      if (this.props.query !== '') {
        MovieDB.searchMovie({ query: this.props.query }, this.saveQueryToState);
      }
    } else {
      // eslint-disable-next-line no-console
      console.log('DB query is unimplimented! not displaying this component ... ');
    }
  }

  render() {
    //console.log(`TitleList (${this.props.name}) Rendering ...`);
    let titles = '';
    if (this.state.data.results) {
      titles = this.state.data.results.map((title, i) => {
        if (i < 5) {
          let name = ''
          const backDrop = `http://image.tmdb.org/t/p/original${title.backdrop_path}`
          if (!title.name) {
            name = title.original_title
          } else {
            name = title.name
          }
          return (
            <Title
              key={title.id}
              title={name}
              score={title.vote_average}
              overview={title.overview}
              backdrop={backDrop}
            />
          )
        // eslint-disable-next-line no-else-return
        } else {
          // Only display 5 but keep id's for later
          return <div key={title.id} />
        }
      });
    }
    return (
      <div className="TitleList" data-loaded={this.state.mounted}>
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

TitleList.propTypes = {
  updates: PropTypes.bool.isRequired,
  query: PropTypes.string,
  name: PropTypes.string.isRequired,
}

TitleList.defaultProps = {
  query: '',
}

export default TitleList

