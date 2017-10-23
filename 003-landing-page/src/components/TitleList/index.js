import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'
import Title from '../Title'
import Spinner from '../Spinner'


const MovieDB = require('moviedb')('838f6976dbdff9ce8ec7aa0b31424e11')

// eslint-disable-next-line react/prefer-stateless-function
class TitleList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      error: null,
      loading: false,
    };
  }

  // First Load - data is null
  componentWillMount() {
    this.setState({ loading: true })
  }
  componentDidMount(){
    this.loadContent(this.props)
  }

  //Subsequent Loads
  shouldComponentUpdate(nextProps, nextState) {
    //console.log(`shouldComponentUpdate (${this.props.name}) ...`)
    if (this.props.updates) {
      if (!nextProps.active) {
        //console.log("NO (1) - inactive")
        return false
      }
      if (nextProps.query === '') {
        //console.log("NO (4) - query is empty")
        return false
      }
      if (this.state.data && (this.props.query === nextProps.query)) {
        //console.log("NO (2) - query is the same")
        return false
      }
    } else { // is a static component
      if (this.state.data) {
        //console.log("NO (3) - data aleady sourced")
        return false
      }
    }

    //console.log("YES")
    return true
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.query !== nextProps.query) {
      //console.log(`componentWillReceiveProps (${this.props.name}) ...`);
      // Has been approved to update
      this.setState({ data: null, loading: true })
    }
  }

  componentDidUpdate(prevProps, prevState){
    //console.log(`Component did update (${this.props.name}) ... \nGo again?`);
    if (this.state.data === null || (prevProps.query !== this.props.query)) {
      //console.log(`YES - data is null or query is different`)
      this.loadContent(this.props)
    }
    //else
      //console.log(`NO`);
  }

  // This must be an arrow funct to use 'this' without passing the instance in
  // but apparently its not stricly ES6.
  saveQueryToState = (err, res) => {
    if (err) { // eslint-disable-next-line no-console
      console.log('ERROR:', err);
      this.setState({ data: null, error: err, loading: false,})
    } else if (res) {
      console.log(`SUCCESS. Saving (${this.props.name}) data to state ...`);
      this.setState({ data: res, error: null, loading: false })
    } else {
      // eslint-disable-next-line no-console
      console.log('Neither err or res found on this query');
    }
  }

  // TODO: This logic should not be here.  A component should just render data
  // Move all this logic to MainPage.js
  loadContent({ name, query }) {
    if (name === 'Comedy') {
      MovieDB.genreMovies({ id: 35 }, this.saveQueryToState)
    } else
    if (name === 'Sci-Fi greats') {
      MovieDB.genreMovies({ id: 878 }, this.saveQueryToState)
    } else
    if (name === 'Horror') {
      MovieDB.genreMovies({ id: 27 }, this.saveQueryToState)
    } else
    if (name === 'The Simpsons') {
      MovieDB.searchMovie({ query: 'Simpsons' }, this.saveQueryToState);
    } else
    if (this.props.name === 'Top TV picks for Jack') {
      MovieDB.discoverTv({}, this.saveQueryToState);
    } else
    if (name === 'Search Results') {
      console.log(`About to search for: ${query}`);
      if (query !== '') { // Should remove this
        MovieDB.searchMovie({ query }, this.saveQueryToState);
      }
    } else {
      // eslint-disable-next-line no-console
      console.log('DB query is unimplimented! not displaying this component ... ')
    }
  }

  render() {
    console.log(`TitleList (${this.props.name}) Rendering (loading=${this.state.loading}) ...`);
    let contents = '';
    if (this.state.loading) {
      contents = <Spinner />
    } else {
      if (this.state.data.results) {
        contents = this.state.data.results.map((title, i) => {
          if (i < 5) {
            let name = ''
            const backDrop = title.backdrop_path
              ? `http://image.tmdb.org/t/p/original${title.backdrop_path}`
              : null
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
        })
      } else {
        console.log('Some error has occured. No data but not "loading". Check error message ...')
        console.log('Error: ', this.data.err)
        contents = `ERROR LOADING DATA: ${this.data.err}`
      }
    }
    return (
      <div className="TitleList" data-activated={this.props.active}>
        <div className="Title">
          <h1>{this.props.name}</h1>
          <div className="titles-wrapper">
            {contents}
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

