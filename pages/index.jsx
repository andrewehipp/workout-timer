import React from 'react';

const say = (line) => {
  SpeechSynthesisUtterance = window.webkitSpeechSynthesisUtterance ||
                             window.mozSpeechSynthesisUtterance ||
                             window.msSpeechSynthesisUtterance ||
                             window.oSpeechSynthesisUtterance ||
                             window.SpeechSynthesisUtterance;
  if (SpeechSynthesisUtterance !== undefined) {
    speechSynthesis.speak(new SpeechSynthesisUtterance(line));
  }

}
const Page = () => {
  const [time, setTime] = React.useState(0);
  const [type, setType] = React.useState('work');
  const [workTimer, setWorkTimer] = React.useState(5);
  const [restTimer, setRestTimer] = React.useState(7);
  const [sets, setSets] = React.useState(2);
  const [running, setRunning] = React.useState(0);

  React.useEffect(() => {
    const tick = () => {
      
    }
    const raf = window.setInterval(() => {
      if (time === 0) {
        if (sets <= 1) {
          setSets(0);
          setTime(0);
          
          if (sets === 0) {
            setType('work');
            say(`workout complete`);
            setRunning(0);
          }
          window.clearInterval(raf);
        } else {
          switch(type) {
            case 'work':
              setTime(restTimer);
              setType('rest');
              say(`rest for ${restTimer} seconds`);
              break;
              
            case 'rest':
              setTime(workTimer);
              setSets(sets - 1);
              setType('work');
              say(`work for ${workTimer} seconds`);
              break;
          }
        }
      } else {
        switch(time) {
          case 6: 
            say('5 Seconds remaining');
            break;
        }
        setTime(time - 1);
      }
    }, 1000);
       
    return () => {
      window.clearInterval(raf);
    }
  }, [time, type, sets, running]);
  
  const handleClick = () => {
    setRunning(!running);
  }
  
  const handleWorkTimerChange = (event) => {
    setWorkTimer(event.currentTarget.value)
  }
  const handleRestTimerChange = (event) => {
    setRestTimer(event.currentTarget.value)
  }
  const handleSetsChange = (event) => {
    setSets(event.currentTarget.value)
  }
    
  const seconds = time % 60;
  const minutes = (time - time % 60) / 60;
  const total = Math.PI * 57 * 2;
  const circumference = Math.PI * 57 * 2;
  
  const stroke = type === 'work' ? 'aqua' : 'lightGreen'
  const duration = type === 'work' ? workTimer : restTimer

  return (
    <div>
      <div className="countdown">
        {running ? (
          <>
            <svg className="countdown-layer" width="200" height="200" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <circle strokeWidth="5" stroke="#333" cx="60" cy="60" r="57"/>
            </svg>
            <svg className="countdown-layer" width="200" height="200" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <circle strokeWidth="5" strokeDasharray={circumference} strokeDashoffset={circumference + (time || 0.0000001) / duration * circumference} stroke={stroke} cx="60" cy="60" r="57"/>
            </svg>
            <div className="countdown-layer timer">
              <h6>{type === 'work' ? 'Work' : 'Rest'}</h6>
              <h1>{minutes}<span>:</span>{(`0${seconds}`).slice(-2)}</h1>
              <h6>1:00</h6>
            </div>
            <div className="countdown-layer sets">
              <h6>Sets: {sets}</h6>
            </div>
          </>
        ) : (
          <>
            <div className="countdown-layer">
              <label htmlFor="work">Work Timer</label>
              <input
                type="number"
                id="work"
                name="work"
                placeholder="Work"
                onChange={handleWorkTimerChange}
                value={workTimer ? workTimer : ''}
              />
              <label htmlFor="work">Rest Timer</label>
              <input type="number" id="rest" name="rest" placeholder="Rest" onChange={handleRestTimerChange} value={restTimer ? restTimer : ''} />

              <label htmlFor="work">Set Timer</label>
              <input type="number" id="sets" name="sets" placeholder="Sets" onChange={handleSetsChange} value={sets ? sets : ''} />

              <button onClick={handleClick}>{running ? 'Pause' : 'Start'}</button>
            </div>
          </>
        )}
      </div>
      <style global jsx>{`
        *, *::before, *::after {
          box-sizing: border-box;
        }
        html {
          height: 100%;
          width: 100%;
          overflow: hidden;
          font-size: 5vmax;
        }
                
        body {
          height: 100%;
          width: 100%;
          background: black;
          color: #fff;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          margin: 0;
          font-weight: normal;
        }
        
        .countdown {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr;
          position: relative;
          width: 57vmax;
        }

        .countdown > * {
          grid-column: 1 / 2;
          grid-row: 1 / 2;
        }
        
        label {
          display: block;
          font-size: 16px;
        }
        
        svg {
          display: block;
          width: 100%;
          height: auto;
          transform: rotate(-90deg);
        }
        
        h1 {
          font-size: 10vmax;
          font-variant-numeric: tabular-nums;
        }
        
        h6 {
          color: #aaa;
          font-size: 2vmax;
        }
        
        span {
          font-family: sans-serif;
          position: relative;
          top: -0.05em;
        }
        
        .countdown-layer {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          position: relative;
          z-index: 1;
        }
        
        .timer {
          text-transform: uppercase;
        }
        
        .sets {
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
        }
        
        input {
          display: block;
          border: 1px solid #555;
          margin-bottom: 20px;
          border-radius: 0;
          width: 100%;
          color: #fff;
          background: #000;
          padding: 0.25em;
          font-size: 30px;
          line-height: 1;
          text-align: center;
        }
        
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
        }
        
        button {
          display: block;
          border: 0;
          border-radius: 0;
          width: 100%;
          background: lightGreen;
          color: #333;
          text-transform: uppercase;
          font-weight: bold;
          padding: 0.5em;
          font-size: 30px;
          line-height: 1;
        }
      `}</style>
    </div>
  );
}

export default Page;