import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Welcome to Palmetto</h1>
        <h5>CSV Data Parser/Merger</h5>
      </header>
      <hr />
      <div className="main-display-container">
        <div className="input-container">
        <label>New Data</label><br />
        <input type="file" name="new-csv" accept=".csv" />
        </div>
        <div className="input-container">
        <label>Master File</label><br />
        <input type="file" name="master-csv" accept=".csv" />
        </div>
      </div>
      <h4>[ Log ]</h4>
      <section>
        <p>Hello</p>
      </section>
    </div>
  );
}

export default App;
