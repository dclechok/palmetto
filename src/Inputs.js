import { useState } from 'react';
import parseCsv from './utils/parseCsv';

import validateInputs from './validation/validateInputs';

function Inputs() {
  const [selectedSampleFile, setSelectedSampleFile] = useState();
  const [selectedMasterFile, setSelectedMasterFile] = useState();
  const [parsedFiles, setParsedFiles] = useState();

  const handleChange = (e) => {
    const { id } = e.currentTarget;
    id === 'sample-file' ? setSelectedSampleFile(e.target.files) : setSelectedMasterFile(e.target.files);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if(validateInputs(selectedSampleFile, selectedMasterFile)){ //validate two files are selected and they are CSV format
       setParsedFiles(await parseCsv(selectedSampleFile, selectedMasterFile));
    }
  };

  console.log(parsedFiles)
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
    <hr className='short-hr'/>
    </div>
  );
}

export default Inputs;
