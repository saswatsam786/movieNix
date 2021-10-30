// import "./App.css";
import Home from './components/Home/Home'
import Login from './components/Login/Login';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
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