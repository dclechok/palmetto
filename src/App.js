import "./App.css";
import Inputs from "./Inputs";
import { useState, useEffect } from 'react';
import exportCsv from './utils/exportCsv';
const { ipcRenderer } = window.require('electron');


function App() {
  const colorCode = {
    'Merge Success': 'rgb(83, 173, 193)', 
    'No Match': 'rgb(224, 156, 83)'
  }
  const [mergeLog, setMergeLog] = useState();

  const handleClose = (e) => {
    if(window.confirm('Are you sure you wish to exit?')) ipcRenderer.send('exit-app');
  };
  
  const handleDownload = (e) => { //user clicks download button, download Csv of updated/merged sample file
    if(mergeLog && mergeLog.updatedFile) exportCsv(mergeLog.updatedFile);
  };

  return (
    <div className="App">
      <button className="close-app remove-btn-style" onClick={handleClose}>[X] Close App</button>
      <header>
        <h1>Welcome to Palmetto</h1>
        <h5>CSV Data Parser/Merger</h5>
      </header>
      <hr />
      <Inputs mergeLog={mergeLog} setMergeLog={setMergeLog} />

      <h4>[ Merge Log ]</h4>
      {mergeLog && mergeLog.updatedFile && <div className="download-btn-cont"><button className="download-btn" onClick={handleDownload} id="download-btn"><h6>[ Download Merged Sample File ]</h6></button></div>}
      <div className="hide-overflow">
      <section>
        {mergeLog && mergeLog.log &&
        <>
            <p className="merge-recap">{mergeLog.log.filter(logs => logs.mergeSuccess === "Merge Success").length} / {mergeLog.log.length} Entries Merged Successfully</p>
            <p className="merge-recap">---</p>
            {mergeLog.log.map((log, key) => {
              return <p key={key}>
                <span style={{color: colorCode[log.mergeSuccess]}}>{log.mergeSuccess}</span> 
                ({log.serial}): {log.mergeSuccess === "Merge Success" ? `Master File (Index: ${log.masterMatchIndex}) --> Sample File (Index: ${log.sampleMatchIndex})` : 
                `Sample File (Index: ${log.sampleMatchIndex}) --> No matches found in Master!`}
                </p>
            })}
        </>
      }
      </section>
      </div>
    </div>
  );
}

export default App;
