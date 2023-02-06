import React from 'react';
import './ImageInput.css';

const ImageInput = ({ onInputChange, onImageSubmit }) => {
  return (
    <div>
      <h2 className='description'>
      This Smart Brain will detect faces in your pictures. Give it a try.
      </h2>
      <div className='interactives-container'>
        <div className='background-container'>
          <input 
            className='url-input' 
            type='text' 
            placeholder='Copy an image URL...' 
            onChange={onInputChange}
            required/>
          <button className='detect-button' onClick={onImageSubmit}>Detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageInput;