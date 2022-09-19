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

  const handleChange = (e) => {
    const { id } = e.currentTarget;
    id === 'sample-file' ? setSelectedSampleFile(e.target.files) : setSelectedMasterFile(e.target.files);
  };

  const handleClick = async (e) => {
    console.log(e.currentTarget)
    if(validateInputs(selectedSampleFile, selectedMasterFile)){ //validate two files are selected and they are CSV format
       setParsedFiles(await parseCsv(selectedSampleFile, selectedMasterFile));
    }
  };

  useEffect(() => { //if we've successfully parsed files, validate headers and create merge/merge log
    if(parsedFiles){
      if(validateHeaders(parsedFiles)) setMergeLog(runMerge(parsedFiles));
    }
  }, [parsedFiles, setParsedFiles]);

  useEffect(() => {
    setMergeLog();
  }, [selectedSampleFile, selectedMasterFile, setSelectedMasterFile, setSelectedSampleFile]);

  return (
    <div>
    <div className="main-display-container">
      <div className="input-container">
        <label htmlFor='sample-file'>Sample File</label>
        <br />
        <input className="csv-input" type="file" name="new-csv" id="sample-file" accept=".csv" onChange={handleChange} />
      </div>
      <div className="input-container">
        <label htmlFor='master-file'>Master File</label>
        <br />
        <input className="csv-input" type="file" name="master-csv" id="master-file" accept=".csv" onChange={handleChange} />
      </div>
    </div>
    <div className='merge-button-container'><button onClick={handleClick} >Merge</button></div>
    </div>
  );
}

export default Inputs;
