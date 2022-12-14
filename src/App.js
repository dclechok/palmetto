import "./App.css";
import Inputs from "./Inputs";
import { useState } from 'react';
import exportCsv from './utils/exportCsv';
const { ipcRenderer } = window.require('electron');
const { version } = require('../package.json');
function App() {

  //get version info from Electron main process
  // let version;
  // ipcRenderer.send('app_version');
  // ipcRenderer.on('app_version', (event, arg) => {
  //   ipcRenderer.removeAllListeners('app_version');
  //   version = arg.version;
  // });
  
  //handle auto-updates
  // const [updateMessage, setUpdateMessage] = useState();
  // ipcRenderer.on('update_available', () => {
  //   ipcRenderer.removeAllListeners('update_available');
  //   setUpdateMessage('A new update is available. Downloading now...');
  // });

  // ipcRenderer.on('update_downloaded', () => {
  //   ipcRenderer.removeAllListeners('update_downloaded');
  //   setUpdateMessage('Update Downloaded. It will be installed on restart. Restart now?');
  // });

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

  const handleMin = (e) => {
    const { id } = e.currentTarget;
    if(id === "min") ipcRenderer.send('minimize');
  };
  // function closeNotification() {
  //   setUpdateMessage();
  // }
  // function restartApp() {
  //   ipcRenderer.send('restart_app');
  // }
  // console.log(updateMessage, 'test')
  
  return (
    <div className="App">
      <p className="version-date">v{version} - Last Updated: 09/23/2022</p>
      <div className="close-button-container">
      <button className="remove-btn-style" onClick={handleMin} id="min">[▼]</button>&nbsp;
      <button className="remove-btn-style" onClick={handleClose} id="close">[X]</button>
      </div>
      <header>
        <h1>Welcome to Palmetto</h1>
        <h5>CSV Data Parser/Merger</h5>
      </header>
      <hr />
      <Inputs setMergeLog={setMergeLog} />

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
                <span style={{color: colorCode[log.mergeSuccess]}}>{log.mergeSuccess}&nbsp;</span> 
                 {log.mergeSuccess === "Merge Success" ? `${log.details} - (${log.serial}): Master File (Index: ${log.masterMatchIndex}) --> Sample File (Index: ${log.sampleMatchIndex})` : 
                `Sample File (Index: ${log.sampleMatchIndex}) --> No matching Serial # or Asset # found in Master!`}
                </p>
            })}
        </>
      }
      </section>
      <footer className="footer">Powered by Mawson Infrastructure Group © 2022 </footer>
      </div>
      {/* {updateMessage && 
          <div id="notification">
          <p id="message"></p>
          <button id="close-button" onClick={closeNotification}>
            Close
          </button>
          <button id="restart-button" onClick={restartApp}>
            Restart
          </button>
        </div>
      } */}
    </div>
  );
}

export default App;
