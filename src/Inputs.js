import { useState, useEffect } from 'react';

//utils
import parseCsv from './utils/parseCsv';
import runMerge from './utils/runMerge';

//validation
import validateHeaders from './validation/validateHeaders';
import validateInputs from './validation/validateInputs';

function Inputs({ mergeLog, setMergeLog }) {
  const [selectedSampleFile, setSelectedSampleFile] = useState();
  const [selectedMasterFile, setSelectedMasterFile] = useState();
  const [parsedFiles, setParsedFiles] = useState();
  const [toggleReset, setToggleReset] = useState(false);

  const handleChange = (e) => {
    const { id } = e.currentTarget;
    id === 'sample-file' ? setSelectedSampleFile(e.target.files) : setSelectedMasterFile(e.target.files);
  };

  const handleClick = async (e) => {
    const { id } = e.currentTarget;
    if(id === "merge-btn"){
      if(validateInputs(selectedSampleFile, selectedMasterFile)){ //validate two files are selected and they are CSV format
        setToggleReset(true); 
        setParsedFiles(await parseCsv(selectedSampleFile, selectedMasterFile));
      }
    }
    if(id === "reset-btn"){
      setSelectedMasterFile();
      setSelectedSampleFile();
      setParsedFiles();
      window.location.reload();
      // setToggleReset(false);
    }
  };

  useEffect(() => { //if we've successfully parsed files, validate headers and create merge/merge log
    if(parsedFiles){
      if(validateHeaders(parsedFiles)) setMergeLog(runMerge(parsedFiles));
      else{
        setSelectedMasterFile();
        setSelectedSampleFile();
      }
    }
  }, [parsedFiles, setParsedFiles, setMergeLog]);

  useEffect(() => {
    setMergeLog();
  }, [selectedSampleFile, selectedMasterFile, setSelectedMasterFile, setSelectedSampleFile, setMergeLog]);

  return (
    <div>
    <div className="main-display-container">
      <div className="input-container">
        <label htmlFor='sample-file'>Serial # File</label>
        <br />
        <input className="csv-input" type="file" name="new-csv" id="sample-file" accept=".csv" onChange={handleChange} />
      </div>
      <div className="input-container">
        <label htmlFor='master-file'>Master File</label>
        <br />
        <input className="csv-input" type="file" name="master-csv" id="master-file" accept=".csv" onChange={handleChange} />
      </div>
    </div>
    <div className='merge-button-container'>
      {!toggleReset ? 
      <button onClick={handleClick} id="merge-btn">Merge</button> :
      <button onClick={handleClick} id="reset-btn">Reset</button> 
      }
      </div>
    </div>
  );
}

export default Inputs;
