import './styles.css'
import React from 'react'

const Title = ({backdrop, title, score, overview}) => {
  return (
      <div className="Item" style={{backgroundImage: 'url(' + backdrop + ')'}} >
        <div className="overlay">
          <div className="title">{title}</div>
          <div className="rating">{score} / 10</div>
          <div className="plot">{overview}</div>
        </div>
      </div>
  )
}
export default Title
