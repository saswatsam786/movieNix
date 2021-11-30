import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Navbar from "./component/Navbar/Navbar";
// eslint-disable-next-line
import { BrowserRouter, Switch, Route, useParams } from "react-router-dom";
import MediaPage from "./component/MediaPage/MediaPage";
import LibraryPage from "./component/LibraryPage/LibraryPage";
// import Search from "./pages/Search/Search";
import Footer from "./component/Footer/Footer";
import About from "./pages/About/About"

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/about" component={About} />
        <Route exact path="/:media/:id" component={MediaPage} />
        <Route exact path="/library" component={LibraryPage} />
        {/* <Route exact path="/search" component={Search} /> */}
        {/* <Route path="/:id" children={<Child />} /> */}
        <Route>
          <div className="App">
            <h1>Page not found</h1>
          </div>
        </Route>
      </Switch>
      <Footer />
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
