import React from 'react';
import './Rank.css';

const Rank = () => {
  return (
    <div className='rank-container'>
      <div className='name-container'>
        {'Julian, your current rank is... '}
      </div>
      <div className='number-container'>
        {'#7'}
      </div>
    </div>
  )
}

export default Rank;