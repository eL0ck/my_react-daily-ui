import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'
import Title from '../Title'
import Spinner from '../Spinner'


// eslint-disable-next-line react/prefer-stateless-function
class TitleList extends Component {
  /* Renders a group of Titles
   * param updates: boolean. Does TitleList update or not?
   * param name: string
   * param query: This must change to update the component!
   * param loadContentFunc: function to that obtains data to render into the Title list .  Must have
   * two parameters: TitleList.props (contains `name`, and `query`) and a callback to apply once the
   * query is complete. The callback has the signature: `callback(error, data)`
   * */

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
    this.props.loadContentFunc(this.props, this.saveQueryToState)
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
      if ((this.state.data || this.state.error)
        && (this.props.query === nextProps.query)) {
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
      this.setState({ data: null, error: null, loading: true })
    }
  }

  componentDidUpdate(prevProps, prevState){
    //console.log(`Component did update (${this.props.name}) ... \nGo again?`);
    if ((this.state.data === null && this.state.error === null)
      || (prevProps.query !== this.props.query)) {
      //console.log(`YES - data is null or query is different`)
      this.props.loadContentFunc(this.props, this.saveQueryToState)
    }
    //else
      //console.log(`NO`);
  }

  saveQueryToState = (err, res) => {
    if (err) { // eslint-disable-next-line no-console
      console.log('ERROR:', err);
      this.setState({ data: null, error: err, loading: false,})
    } else if (res.total_results < 1) { // eslint-disable-next-line no-console
      console.log('2nd ERROR: No data returned');
      this.setState({ data: null, error: "No results found", loading: false,})
    } else if (res) {
      console.log(`SUCCESS. Saving (${this.props.name}) data to state ...`);
      this.setState({ data: res, error: null, loading: false })
    } else {
      // eslint-disable-next-line no-console
      console.log('Neither err or res found on this query');
    }
  }

  render() {
    console.log(`TitleList (${this.props.name}) Rendering (loading=${this.state.loading}) ...`);
    let contents = '';
    if (this.state.loading) {
      contents = <Spinner />
    } else {
      if (this.state.data) {
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
        console.log('Error: ', this.state.error)
        contents = `${this.state.error}`
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
  name: PropTypes.string.isRequired,
  loadContentFunc: PropTypes.func.isRequired,
  query: PropTypes.string,
}

TitleList.defaultProps = {
  query: '',
}

export default TitleList

