import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Interactive from './views/Interactive';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h2>ferryf</h2>
        <Interactive />
      </div>
    </div>
  );
}

export default App;
