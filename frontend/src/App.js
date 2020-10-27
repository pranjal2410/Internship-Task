import React from "react";
import './App.css';
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavTabs from "./components/NavTabs/NavTabs";
import {Route, Switch} from "react-router";
import AllMatches from "./components/Matches/AllMatches";

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

function App() {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <NavTabs/>
        <Switch>
            <Route exact path="/" component={AllMatches}/>

        </Switch>
      </ThemeProvider>
  );
}

export default App;
