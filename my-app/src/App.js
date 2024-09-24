import { ReactP5Wrapper } from 'react-p5-wrapper';
import sketch from './sketch.js';
import './App.css';

function App() {
  return (
    <div className='App'>
      <ReactP5Wrapper sketch={sketch}></ReactP5Wrapper>
    </div>
  );
}

export default App;
