import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/main";
import Login from "./pages/login";
import AfterLogin from "./pages/afterLogin";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./component/Auth/PrivateRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/after-login">
              <AfterLogin />
            </Route>
            <PrivateRoute path="/">
              <Main></Main>
            </PrivateRoute>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
