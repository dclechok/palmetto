import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Welcome to Palmetto</h1>
        <h5>CSV Data Parser</h5>
      </header>
      <hr />
      <div>
        <input type="file" name="new-csv" accept=".csv" />
        <input type="file" name="master-csv" accept=".csv" />
      </div>
    </div>
  );
}

export default App;
