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
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { Footer } from './components/Footer';
import About from './components/About';

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

            <Route exact path="/login">
              <Login/>
            </Route>

            <Route exact path="/signup">
              <SignUp/>
            </Route>

            <Route exact path="/about">
              <About/>
            </Route>

          </Switch>
          <Footer/>
        </div>
       
      </Router>
    </AlertState>
    
  );
}

export default App;
