import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/main";
import Login from "./pages/login";
import AfterLogin from "./pages/afterLogin";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./component/Auth/PrivateRoute";
import styled from "styled-components";
import Color from "./const/Color";

function App() {
  return (
    <Body className="App">
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
    </Body>
  );
}

export default App;

const Body = styled.div`
  color: ${Color.FONT};
  background-color: ${Color.BACKGROUND};
`;
