import * as React from "react";
import "css!./styles/app.css"

interface IProps {
}

interface IState {

}

class App extends React.Component<{ history: any }>{
  public readonly state: Readonly<IState> = {

  }


  componentDidMount() {
    console.log("test")
  }



  render() {
    return (
      <div className="app">
      </div>
    )
  }
}