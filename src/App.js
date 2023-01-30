import { useState } from 'react';
import ParticlesBg from 'particles-bg';
import Navbar from './components/Navbar/Navbar';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageInput from './components/ImageInput/ImageInput';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

//api variables goes here

function App() {

  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});

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
    const { regions } = outputsData[0].data;
    console.log('postion array', regions) //can map the regions array of objects to show multiple boxes for faces
    const clarifaiFaceBox = regions[0].region_info.bounding_box;
    console.log('box data', clarifaiFaceBox);

    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFaceBox.left_col * width,
      topRow: clarifaiFaceBox.top_row * height,
      rightCol: width - (clarifaiFaceBox.right_col * width),
      bottomRow: height - (clarifaiFaceBox.bottom_row * height)
    }
  }

  const displayFaceBox = (boxNumber) => {
    console.log('numbers after math', boxNumber);
    setBox(boxNumber);
  }

  return (
    <div className="App">
      <Navbar/> {/*done */}
      <Logo/> {/*done */}
      <Rank/> {/*done */}
      <ImageInput 
      onInputChange={onInputChange}
      onButtonSubmit={onButtonSubmit}/> {/*done */}
      <FaceRecognition imageUrl={imageUrl} box={box}/>
      <ParticlesBg color='#1D5555' num={90} type="cobweb" bg={true} />
    </div>
  );
}

export default App;