import { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import './App.scss';
import soundfiles from './soundfiles';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundfile, setSoundfile] = useState('');

  const playSound = (soundfile: string) => {
    console.log('soundfile:', soundfile);
    const soundfilePath = `/sounds/${soundfile}`;
    console.log('soundfilePath:', soundfilePath);
    setSoundfile(soundfilePath);
    setIsPlaying(true);
  };

  return (
    <>
      <div className='soundboard'>
        <div className='soundboard-grid'>
          {Object.entries(soundfiles).map(([key, value]) => <div
            className={'soundboard-grid-item'}
            key={key}
            onClick={() => playSound(value.filename)}
          >
            <label htmlFor={key}>{value.label}</label>
          </div>)}

        </div>
      </div>
      {isPlaying && (
        <ReactAudioPlayer
          src={soundfile}
          autoPlay
          onEnded={() => setIsPlaying(false)} // Reset state after playing
        />
      )}
      <footer className='footer'>
        <p>
          made by <a href="https://izosozi.xyz">izosozi</a>
        </p>
        <p>
          <a href="https://github.com/izosozi/mansound.gay">github</a>
        </p>
      </footer>
    </>
  );
}

export default App;

