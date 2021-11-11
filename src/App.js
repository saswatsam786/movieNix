import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Navbar from "./component/Navbar/Navbar";
// eslint-disable-next-line
import { BrowserRouter, Switch, Route, useParams } from "react-router-dom";
import MediaPage from "./component/MediaPage";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/:id" component={MediaPage} />
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
