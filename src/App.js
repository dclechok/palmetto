import "./App.css";
import Inputs from "./Inputs";
import { useState } from 'react';
import exportCsv from './utils/exportCsv';
import dateFormatter from "./utils/dateFormatter";
const { ipcRenderer } = window.require('electron');

function App() {

  //get version info from Electron main process
  let version;
  ipcRenderer.send('app_version');
  ipcRenderer.on('app_version', (event, arg) => {
    ipcRenderer.removeAllListeners('app_version');
    version = arg.version;
  });
  
  //handle auto-updates
  const [updateMessage, setUpdateMessage] = useState();
  ipcRenderer.on('update_available', () => {
    ipcRenderer.removeAllListeners('update_available');
    setUpdateMessage('A new update is available. Downloading now...');
    notification.classList.remove('hidden');
  });

  ipcRenderer.on('update_downloaded', () => {
    ipcRenderer.removeAllListeners('update_downloaded');
    setUpdateMessage('Update Downloaded. It will be installed on restart. Restart now?');
    restartButton.classList.remove('hidden');
    notification.classList.remove('hidden');
  });

  const newDate = new Date();
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

  function closeNotification() {
    notification.classList.add('hidden');
  }

  function restartApp() {
    ipcRenderer.send('restart_app');
  }

  return (
    <div className="App">
      <p className="version-date">v{version} - Last Updated: {dateFormatter(newDate)}</p>
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
                <span style={{color: colorCode[log.mergeSuccess]}}>{log.mergeSuccess}&nbsp;</span> 
                ({log.serial}): {log.mergeSuccess === "Merge Success" ? `Master File (Index: ${log.masterMatchIndex}) --> Sample File (Index: ${log.sampleMatchIndex})` : 
                `Sample File (Index: ${log.sampleMatchIndex}) --> No matches found in Master!`}
                </p>
            })}
        </>
      }
      </section>
      </div>
      {updateMessage && 
          <div id="notification" class="hidden">
          <p id="message"></p>
          <button id="close-button" onClick={closeNotification}>
            Close
          </button>
          <button id="restart-button" onClick={restartApp} class="hidden">
            Restart
          </button>
        </div>
      }
    </div>
  );
}

export default App;
