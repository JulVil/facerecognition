import React from 'react';
import './ImageInput.css';

const ImageInput = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p style={{fontSize: 24, margin: 0, marginBottom: 10}}>
        {'This Smart Brain will detect faces in your pictures. Give it a try.'}
      </p>
      <div className='interactives-container'>
        <div className='background-container'>
          <input className='url-input' type='text' placeholder='Copy an image URL...' onChange={onInputChange}/>
          <button className='detect-button' onClick={onButtonSubmit}>Detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageInput;