import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className='result-container'>
      <div className='image-container'>
        <img id='inputImage' src={imageUrl} alt=''/>
        <div className='bounding-box' 
        style={{
          left: box.leftCol, 
          top: box.topRow, 
          right: box.rightCol, 
          bottom: box.bottomRow}}>
        </div>
      </div>
    </div>
  )
}

export default FaceRecognition;