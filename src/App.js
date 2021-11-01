// import "./App.css";
import Home from './components/Home/Home'
import Login from './components/Login/Login';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={profile} />
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