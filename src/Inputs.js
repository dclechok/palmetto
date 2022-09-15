import { useState } from 'react';

function Inputs() {
  const [selectedSampleFile, setSelectedSampleFile] = useState();
  const [selectedMasterFile, setSelectedMasterFile] = useState();

  const handleChange = (e) => {
    const { id } = e.currentTarget;
    id === 'sample-file' ? setSelectedSampleFile(e.target.files) : setSelectedMasterFile(e.target.files);
  };

  console.log(selectedMasterFile, selectedSampleFile)
  return (
    <div>
    <div className="main-display-container">
      <div className="input-container">
        <label htmlFor='sample-file'>New Data</label>
        <br />
        <input type="file" name="new-csv" id="sample-file" accept=".csv" onChange={handleChange} />
      </div>
      <div className="input-container">
        <label htmlFor='master-file'>Master File</label>
        <br />
        <input type="file" name="master-csv" id="master-file" accept=".csv" onChange={handleChange} />
      </div>
    </div>
    <div className='merge-button-container'><button>Merge</button></div>
    </div>
  );
}

export default Inputs;
