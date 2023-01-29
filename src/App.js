import './App.css';
import Navbar from './components/Navbar/Navbar';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageInput from './components/ImageInput/ImageInput';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

function App() {
  return (
    <div className="App">
      <Navbar/> {/*done */}
      <Logo/> {/*done */}
      <Rank/>
      <ImageInput/>
      <FaceRecognition/>
    </div>
  );
}

export default App;