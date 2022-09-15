import { useState } from 'react';

import validateInputs from './validation/validateInputs';

function Inputs() {
  const [selectedSampleFile, setSelectedSampleFile] = useState();
  const [selectedMasterFile, setSelectedMasterFile] = useState();

  const handleChange = (e) => {
    const { id } = e.currentTarget;
    id === 'sample-file' ? setSelectedSampleFile(e.target.files) : setSelectedMasterFile(e.target.files);
  };

  const handleClick = (e) => {
    //validate there are two files and they are CSV format
    //validate headers
    //if headers and inputs are valid - validate 
    e.preventDefault();
    validateInputs(selectedSampleFile, selectedMasterFile)
  };

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
