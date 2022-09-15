import "./App.css";
import Inputs from "./Inputs";
import { useState, useEffect } from 'react';

function App() {

  const [mergeLog, setMergeLog] = useState();

  useEffect(() => {
    if(mergeLog){
      console.log(mergeLog)
    }
  }, [mergeLog, setMergeLog]);

  return (
    <div className="App">
      <div className="close-app">[X] Close App</div>
      <header>
        <h1>Welcome to Palmetto</h1>
        <h5>CSV Data Parser/Merger</h5>
      </header>
      <hr />
      <Inputs mergeLog={mergeLog} setMergeLog={setMergeLog} />
      {mergeLog && <>
      <h4>[ Merge Log ]</h4>
      <section>
        <p>Hello</p>
      </section>
      </>}
    </div>
  );
}

export default App;
