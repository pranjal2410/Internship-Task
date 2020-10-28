import React from "react";
import './App.css';
import {createMuiTheme, ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavTabs from "./components/NavTabs/NavTabs";
import {Route, Switch} from "react-router";
import AllMatches from "./components/Matches/AllMatches";
import AddMatch from "./components/Matches/AddMatch";
import AddTeam from "./components/Teams/AddTeam";
import AllTeams from "./components/Teams/AllTeams";
import MatchContextProvider from "./context/MatchContext";
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
      primary: {
        main: blue[200]
      }
  }
});

function App() {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <MatchContextProvider>
            <NavTabs/>
            <Switch>
                <Route exact path="/" component={AllMatches}/>
                <Route exact path="/all-teams" component={AllTeams}/>
                <Route exact path="/add-match" component={AddMatch}/>
                <Route exact path="/add-team" component={AddTeam}/>
            </Switch>
        </MatchContextProvider>
      </ThemeProvider>
  );
}

export default App;
