import Home from './components/Home/Home'
import Login from './components/Login/Login';
// eslint-disable-next-line
import {BrowserRouter, Switch, Route, useParams} from 'react-router-dom';
import Profile from './components/Home/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        {/* <Route path="/:id" children={<Child />} /> */}
        <Route>
          <div className="App">
            <h1>Page not found</h1>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

// function Child() {
//   let { id } = useParams();
//   // id = id.slice(0, 1)

//   return (
//     <Home isLoggedIn={true} Id={id} />
//   );
// }