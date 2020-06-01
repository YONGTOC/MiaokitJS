import * as React from "react";
import * as ReactDOM from "react-dom";

import Router from 'router';

declare var viewDraw: any;

class Index extends React.Component {
  constructor(props) {
    super(props);

    Index.g_pIns = this;

  }
  public static g_pIns: Index = null;



  public componentDidMount() {


  }


  public render() {
    return (
      <div>fangliangbao</div>
    )
  }

  public state = {

  }
}

export default Index;

viewDraw = function () {
  ReactDOM.render(
  <Router />
  , document.getElementById('viewContainer'));
}
