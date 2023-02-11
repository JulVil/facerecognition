import React from 'react';
import './ImageInput.css';

const ImageInput = ({ onInputChange, onImageSubmit }) => {
  return (
    <div>
      <h2 className='description'>
      This Smart Brain will detect faces in your pictures.
      <br/>
      Copy an image URL into the box and click detect.
      </h2>
      <div className='interactives-container'>
        <div className='background-container'>
          <input 
            className='url-input' 
            type='text' 
            placeholder='Put the image URL here...' 
            onChange={onInputChange}
            required/>
          <button className='detect-button' onClick={onImageSubmit}>Detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageInput;