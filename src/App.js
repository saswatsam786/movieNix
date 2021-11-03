// import "./App.css";
import Home from './components/Home/Home'
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route>
          <div className="App">
            <h1>Page not found</h1>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;