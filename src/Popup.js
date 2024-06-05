import React from 'react'
import './stylesheets/Popup.css';

function Popup({image,title,desc}) {
  const handleClick = (e) => (
    e.target.parentNode.remove()
  )

  return (
    <div className="popup-container">
      <img key="img" className="popup-img" src={image} alt=""/>
      <div key="det" className="popup-details">
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
      <button className="popup-btn-close" onClick={handleClick}>X</button>
    </div>
  )
}

export default Popup