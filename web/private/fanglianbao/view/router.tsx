import { HashRouter, Route, Switch } from 'react-router-dom';
import * as React from "react";
import Index from "index";
import ParkList from "parkList";
import RoomList from "roomList";
import SellList from "sellList";

class Router extends React.Component {
      constructor(props) {
        super(props);
 
    }
 
  public render() {
    return (
        <HashRouter>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/parkList" component={ParkList} />
          <Route exact path="/roomList" component={RoomList} />
          <Route exact path="/sellList" component={SellList} />
        </Switch>
      </HashRouter>
      )
  }
}

export default Router;
