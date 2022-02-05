import React from 'react'
import './Display.css'

const Display = ({ display, textFormat }) => {
  return (
    <div className='card card-content'>
      <div className='imgTshirt text-center'>
        <img
          className='img responsive'
          src={`https://res.cloudinary.com/dkkgmzpqd/image/upload/v1545217305/T-shirt%20Images/${display.tshirtColor}`}
          alt='img Tshirt'
        />
      </div>
      <div className='memeText text-center'>
        <div className='upperText'>
          <p style={{ fontSize: textFormat }}>{display.upperText}</p>
        </div>
        <div className='img_card'>
          <img
            src={`${display.url}` || 'http://via.placeholder.com/400x300'}
            alt='img placeholder'
          />
        </div>
        <div className='lowerText'>
          <p> {display.lowerText}</p>
        </div>
      </div>
    </div>
  )
}

export default Display
