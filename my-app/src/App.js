import { ReactP5Wrapper } from 'react-p5-wrapper';
import sketch from './sketch.js';
import './App.css';

function App() {
  return (
    <div>
      <div className='Split Drawing'>
        <div className='centered'>
          <ReactP5Wrapper sketch={sketch}></ReactP5Wrapper>
        </div>
      </div>
      <div className='Split Settings'>
        <div className='centered'>
          hi
        </div>
      </div>
    </div>
  );
}

export default App;
