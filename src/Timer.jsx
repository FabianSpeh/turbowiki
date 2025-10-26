import { useStopwatch } from 'react-timer-hook';

function MyStopwatch() {
  const {
    totalSeconds,
    milliseconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true, interval: 20 });

 

  
  return (
   <div style={{ 
  textAlign: 'center',
  width: '100%',
  fontFamily: 'monospace'
}}>
  <div style={{ fontSize: '2.5rem' }}>
    <span>{String(minutes).padStart(2,'0')}</span>:
    <span>{String(seconds).padStart(2,'0')}</span>.
    <span style={{ fontSize: '1.7rem', display:'inline-block', width:'3ch' }}>
      {String(milliseconds).padStart(3,'0')}
    </span>
  </div>
</div>
  );
  
}

export default function Timer() {
  return (
    <div>
      <MyStopwatch />
    </div>
  );
}