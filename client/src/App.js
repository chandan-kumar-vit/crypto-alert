import './App.css';
import { Alerts } from './components/Alerts';
import { Navbar } from './components/Navbar';
import { Table } from './components/Table';
import AlertState from './context/AlertState'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <AlertState>
      <Router>
        <div className="App">
          <Navbar />

          <Switch>
            <Route exact path="/">
              <Table />
            </Route>

            <Route exact path="/myalerts">
              <Alerts />
            </Route>

          </Switch>

        </div>
      </Router>
    </AlertState>
  );
}

export default App;
