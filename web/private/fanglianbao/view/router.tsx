import { HashRouter, Route, Switch } from 'react-router-dom';
import * as React from "react";
import Index from "index";
import ParkList from "parkList";
import RoomList from "roomList";
import SellList from "sellList";
import PersonalCenter from "personalCenter";
import Contact from "contact";

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
          <Route exact path="/personalCenter" component={PersonalCenter} />
          <Route exact path="/contact" component={Contact} />
        </Switch>
      </HashRouter>
      )
  }
}

export default Router;
