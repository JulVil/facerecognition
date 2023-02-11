import React from 'react';
import './Rank.css';

const Rank = ({ name, entries }) => {
  return (
    <div className='rank-container'>
      <div className='name-container'>
        {`Hello ${name}, your current image entries is... `}
      </div>
      <div className='number-container'>
        {entries}
      </div>
    </div>
  )
}

export default Rank;