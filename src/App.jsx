import { useState } from 'react';
import ParticlesBg from 'particles-bg';
import Navbar from './components/Navbar/Navbar';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageInput from './components/ImageInput/ImageInput';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

//api stuff

let USER = {
  id:'',
  name: '',
  email: '',
  entries: 0,
  joined: ''
}

function App() {

  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [boxes, setBoxes] = useState([]);
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setisSignedIn] = useState(false);
  const [user, setUser] = useState(USER);
  
  const loadUser = (userData) => {
    setUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      entries: userData.entries,
      joined: userData.joined
    })
  }

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const onImageSubmit = () => {
    setImageUrl(input);
    setInput('');

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
      const { outputs } = JSON.parse(result);
      if(result){
        fetch('http://localhost:3001/image', {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          setUser(user => ({...user, entries:count}))
        })
      }
      displayFaceBox(calculateFaceLocation(outputs));
    })
    .catch((error) => alert('no face', error));
        
  }
 
  const calculateFaceLocation = (outputsData) => {
    const image = document.getElementById('inputImage');
    
    const { regions } = outputsData[0].data; //can map the regions array of objects to show multiple boxes for faces
    const verticesValues = regions.map(obj => obj.region_info.bounding_box); //values for box multiple faces

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
  }
  
  const displayFaceBox = (boxNumber) => {
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
          <Rank name={user.name} entries={user.entries}/>
          <ImageInput
          onInputChange={onInputChange}
          onImageSubmit={onImageSubmit}/>
          <FaceRecognition imageUrl={imageUrl} boxes={boxes}/>
      </>
      : (
        route === 'signin'
        ? <Signin loadUser={loadUser} onRouteChange={onRouteChange}/>
        : <Register loadUser={loadUser} onRouteChange={onRouteChange}/>
      )
      
      }
    </div>
  );
}

export default App;