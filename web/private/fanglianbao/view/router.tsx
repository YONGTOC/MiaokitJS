import { HashRouter, Route, Switch } from 'react-router-dom';
import * as React from "react";
import Index from "index";

class Router extends React.Component {
      constructor(props) {
        super(props);
 
    }
 
  public render() {
    return (
        <HashRouter>
        <Switch>
          <Route exact path="/" component={Index} />

        </Switch>
      </HashRouter>
      )
  }
}

export default Router;
