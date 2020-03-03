import * as React from "react";
import * as RouterDOM from 'react-router-dom';

import "css!./styles/view.css"

class AboutMe extends React.Component {
  public constructor(props) {
    super(props);

  }

  public componentDidMount() {

  }

  public retunHome() {
    console.log("retunHome");

  }

  public render() {
    return (
      <div>
        <div className={"vrBox"}>
          vr
           <RouterDOM.Link to="/" >
            <span onClick={this.retunHome.bind(this)}>·µ»Ø</span>
          </RouterDOM.Link>
        </div>
      </div>
    )
  }

  public state = {

  }

  //over
}

export default AboutMe;