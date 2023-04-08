import { useCallback, useState } from 'react';
import ParticlesBg from 'particles-bg';
import Navbar from './components/Navbar/Navbar';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Message from './components/Message/Message';
import Rank from './components/Rank/Rank';
import ImageInput from './components/ImageInput/ImageInput';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Profile from './components/Profile/Profile';
import './App.css';

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
  const [responseMessage, setResponseMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleUserUpdate = useCallback((newData) => {
    setUser(newData);
  }, [setUser])
  
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

    fetch('https://smartbrain-9xn8.onrender.com/imageurl', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: input
        })
    })
    .then(response => response.json())
    .then(result => {
      if(result !== 'error'){
        fetch('https://smartbrain-9xn8.onrender.com/image', {
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
        .catch()
      }
      displayFaceBox(calculateFaceLocation(result));
    })
    .catch((error) => {
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 3000);
      setResponseMessage('No valid URL')
      console.log(error)
    });
  }
 
  const calculateFaceLocation = (outputsData) => {
    const image = document.getElementById('inputImage');
    
    const { regions } = outputsData[0].data; //can map the regions array of objects to show multiple boxes for faces
    const verticesValues = regions.map(obj => obj.region_info.bounding_box); //values for boxing multiple faces

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
    if(!boxNumber.length) {
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 5000);
      setResponseMessage('There are no faces in this image, try another one!')
    }
    setBoxes(boxNumber);
  }

  const onRouteChange = (newRoute) => {
    if(newRoute === 'signin'){
      setInput('');
      setBoxes([]);
      setImageUrl('');
      setisSignedIn(false);
      setUser(USER)
    } else if(newRoute === 'profile'){
      setBoxes([]);
      setImageUrl('');
      setisSignedIn(true);
    } else if(newRoute === 'home'){
      setisSignedIn(true);
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
          <Message type='info' showMessage={showMessage} responseMessage={responseMessage}/>
          <FaceRecognition imageUrl={imageUrl} boxes={boxes}/>
        </>
      : route === 'profile'
      ? <>
          <Profile
            handleUserUpdate={handleUserUpdate}
            onRouteChange={onRouteChange}
            id={user.id}/>
        </>
      :  route === 'signin'
        ? <Signin loadUser={loadUser} onRouteChange={onRouteChange}/>
        : <Register loadUser={loadUser} onRouteChange={onRouteChange}/>
      }
    </div>
  );
}

export default App;