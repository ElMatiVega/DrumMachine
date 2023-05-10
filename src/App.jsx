
// import './App.css'

// function App() {
 

//   return (
//     <>
//       <div id="drum-machine">
//         <div id="display">
        
//         </div>
//         <ul>
//             <li className="drum-pad" id='sound-Q' src='./assets/sound' >Q</li>
//             <li className="drum-pad" id='sound-W' src='./assets/sound' >W</li>
//             <li className="drum-pad" id='sound-E' src='./assets/sound' >E</li>
//             <li className="drum-pad" id='sound-A' src='./assets/sound' >A</li>
//             <li className="drum-pad" id='sound-S' src='./assets/sound' >S</li>
//             <li className="drum-pad" id='sound-D' src='./assets/sound' >D</li>
//             <li className="drum-pad" id='sound-Z' src='./assets/sound' >Z</li>
//             <li className="drum-pad" id='sound-X' src='./assets/sound' >X</li>
//             <li className="drum-pad" id='sound-C' src='./assets/sound' >C</li>
//           </ul>
//       </div>
//     </>
//   )
// }

// export default App


import React, { useState } from 'react';

const drumPadsData = [
  {
    id: 'Q',
    keyTrigger: 'Q',
    src: './assets/sound/003075241_prev.mp3',
    label: 'Audio Clip Q',
  },
  {
    id: 'W',
    keyTrigger: 'W',
    src: './assets/sound/007741690_prev.mp3',
    label: 'Audio Clip W',
  },{
    id: 'E',
    keyTrigger: 'E',
    src: './assets/sound/accidente_1.mp3',
    label: 'Audio Clip E',
  },{
    id: 'A',
    keyTrigger: 'A',
    src: './assets/sound/tambor_22.mp3',
    label: 'Audio Clip A',
  },{
    id: 'S',
    keyTrigger: 'S',
    src: './assets/sound/tambores_5.mp3',
    label: 'Audio Clip S',
  },{
    id: 'D',
    keyTrigger: 'D',
    src: './assets/sound/tambores_8.mp3',
    label: 'Audio Clip D',
  },{
    id: 'Z',
    keyTrigger: 'Z',
    src: './assets/sound/medio_1.mp3',
    label: 'Audio Clip Z',
  },{
    id: 'X',
    keyTrigger: 'X',
    src: './assets/sound/bassdrum_1.mp3',
    label: 'Audio Clip X',
  },{
    id: 'C',
    keyTrigger: 'C',
    src: './assets/sound/acusticos_10.mp3',
    label: 'Audio Clip C',
  }
  // Add more drum pads here
];

const DrumPad = ({ padData, onClick }) => {
  const { id, keyTrigger, src, label } = padData;

  const handleClick = () => {
    onClick(id);
  };

  const handleKeyPress = (event) => {
    if (event.key.toUpperCase() === keyTrigger) {
      onClick(id);
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div
      className="drum-pad"
      id={id}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      tabIndex="0"
    >
      {keyTrigger}
      <audio className="clip" id={keyTrigger} src={src} />
    </div>
  );
};

const DrumMachine = () => {
  const [displayText, setDisplayText] = useState('');

  const handlePadClick = (id) => {
    const pad = drumPadsData.find((pad) => pad.id === id);
    if (pad) {
      setDisplayText(pad.label);
      const audioElement = document.getElementById(pad.keyTrigger);
      if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
      }
    }
  };

  return (
    <div id="drum-machine">
      <div id="display">{displayText}</div>
      <div className="drum-pad">
        {drumPadsData.map((pad) => (
          <DrumPad key={pad.id} padData={pad} onClick={handlePadClick} />
        ))}
      </div>
    </div>
  );
};

export default DrumMachine;
