import { useState } from 'react';
import ParticlesBg from 'particles-bg';
import Navbar from './components/Navbar/Navbar';
import Signin from './components/Signin/Signin';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageInput from './components/ImageInput/ImageInput';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
import Register from './Register/Register';

//api stuff here

function App() {

  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [boxes, setBoxes] = useState([]);
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setisSignedIn] = useState(false);

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const onButtonSubmit = () => {
    setImageUrl(input);

    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": input
                  }
              }
          }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const { outputs } = JSON.parse(result); //converts the response text to destructure object so we can use the bounding box
      // const { regions } = outputs[0].data;
      // const { concepts } = regions[0].data;
      // const { value } = concepts[0];
      // const { bounding_box } = regions[0].region_info;
      displayFaceBox(calculateFaceLocation(outputs));
      // console.log(outputs);
    })
    .catch((error) => alert('no face', error));
        
  }
 
  const calculateFaceLocation = (outputsData) => {
    const image = document.getElementById('inputImage');
    
    console.log('data object', outputsData);
    const { regions } = outputsData[0].data; //can map the regions array of objects to show multiple boxes for faces
    // console.log('postion array', regions) 
    
    const verticesValues = regions.map(obj => obj.region_info.bounding_box); //values for box multiple faces
    console.log('multiple faces array', verticesValues); 
    
    // const clarifaiFaceBox = regions[0].region_info.bounding_box;
    // console.log('box data', clarifaiFaceBox);
    
    const width = Number(image.width);
    const height = Number(image.height);
    
    // multiplies the values for use with multiple faces on the image 
    const valuesForPosition = verticesValues.map(obj => ({
      left_col: obj.left_col * width,
      top_row: obj.top_row * height,
      right_col: width - (obj.right_col * width),
      bottom_row: height - (obj.bottom_row * height)
    }));

    return valuesForPosition;
    
    // return {
    //   leftCol: clarifaiFaceBox.left_col * width,
    //   topRow: clarifaiFaceBox.top_row * height,
    //   rightCol: width - (clarifaiFaceBox.right_col * width),
    //   bottomRow: height - (clarifaiFaceBox.bottom_row * height)
    // }
  }
  
  const displayFaceBox = (boxNumber) => {
    // console.log('numbers after math', boxNumber);
    setBoxes(boxNumber);
  }

  const onRouteChange = (newRoute) => {
    if(newRoute === 'home'){
      setisSignedIn(true);
    } else {
      setisSignedIn(false);
    }
    setRoute(newRoute);
  }

  return (
    <div className="App">
      <ParticlesBg color='#f6f2e3' num={120} type="cobweb" bg={true} />
      <Navbar isSignedIn={isSignedIn} onRouteChange={onRouteChange}/>
      {route === 'home' 
      ? <>
          <Logo/>
          <Rank/>
          <ImageInput 
          onInputChange={onInputChange}
          onButtonSubmit={onButtonSubmit}/>
          <FaceRecognition imageUrl={imageUrl} boxes={boxes}/>
      </>
      : (
        route === 'signin'
        ? <Signin onRouteChange={onRouteChange}/>
        : <Register onRouteChange={onRouteChange}/>
      )
      
      }
    </div>
  );
}

export default App;