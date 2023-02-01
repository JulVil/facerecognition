import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {

  return (
    <div className='result-container'>
      <div className='image-container'>
        <img id='inputImage' src={imageUrl} alt=''/>
        <div>
        {boxes.map((box) => {
          const divStyle = {
            top: box.top_row,
            left: box.left_col,
            bottom: box.bottom_row,
            right: box.right_col,
            };
          return <div 
          className='bounding-box' 
          key={box.top_row} 
          style={divStyle}/>;
        })}
        </div>
      </div>
    </div>
  )
}

export default FaceRecognition;