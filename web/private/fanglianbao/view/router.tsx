import { HashRouter, Route, Switch } from 'react-router-dom';
import * as React from "react";
import Index from "index";
import ParkInfo from "parkInfo";

class Router extends React.Component {
      constructor(props) {
        super(props);
 
    }
 
  public render() {
    return (
        <HashRouter>
        <Switch>
          <Route exact path="/" component={Index} />

          <Route exact path="/pi" component={ParkInfo} />
        </Switch>
      </HashRouter>
      )
  }
}

export default Router;
