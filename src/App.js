import { useState, useEffect } from "react";

function App() {
  const [start, setStart] = useState(false)
  const [pause, setPause] = useState(false)
  const [time, setTime] = useState(0)
  const [list, setList] = useState([])

  useEffect(() => {
    let interval = null;
  
    if (start && !pause) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [start, pause]);

  return (
    <div className="app">
      <div className="timer">
        <span>
          {("0" + Math.floor((time / 60000) % 60)).slice(-2)}
        </span>
        .
        <span>
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
        </span>
        ,
        <span className="ms">
          {("0" + ((time / 10) % 100)).slice(-2)}
        </span>
      </div>
      <div className="list">
        {list.map(item => 
          <div className="item">
            <span>#{item.id} </span>
            <span>
              {("0" + Math.floor((item.num / 60000) % 60)).slice(-2)}
            </span>
            <span>.</span>
            <span>
              {("0" + Math.floor((item.num / 1000) % 60)).slice(-2)}
            </span>
            <span>,</span>
            <span className="ms">
              {("0" + ((item.num / 10) % 100)).slice(-2)}
            </span>
            <span style={{fontSize: '17px'}}> +</span>
            <span style={{fontSize: '17px'}}>
              {("0" + Math.floor((item.gap / 60000) % 60)).slice(-2)}
            </span>
            <span style={{fontSize: '17px'}}>.</span>
            <span style={{fontSize: '17px'}}>
              {("0" + Math.floor((item.gap / 1000) % 60)).slice(-2)}
            </span>
            <span style={{fontSize: '17px'}}>,</span>
            <span style={{fontSize: '17px', color: '#cf4147'}}>
              {("0" + ((item.gap / 10) % 100)).slice(-2)}
            </span>
          </div>
        )}
      </div>
      <div className="btn">
        {!start ? 
        <button onClick={() => setStart(true)}>Start</button> : 
        !pause ? <>
        <button onClick={() => setList([...list, {id: list.length+1, num: time, gap: time-(list.length > 0 ? list[list.length-1].num : 0)}])}>Split</button>
        <button onClick={() => setPause(true)}>Stop</button></> : 
        <><button onClick={() => {setTime(0); setList([]); setStart(false); setPause(false)}}>Reset</button>
        <button onClick={() => setPause(false)}>Resume</button></>}
      </div>
    </div>
  );
}

export default App;
