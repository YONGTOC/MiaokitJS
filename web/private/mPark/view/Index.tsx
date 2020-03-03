import * as React from "react";
import * as ReactDOM from "react-dom";
import ParkCompany from "parkCompany";
import Photograph from "photograph"; 
import InfoArea from "infoArea"; 
import Message from "message"; 
import AboutMe from "aboutMe"; 
import "css!./styles/view.css"
import { HashRouter, Route, Switch } from 'react-router-dom';

interface IProps {
}

interface IState {
}

class Index extends React.Component{
  public readonly state: Readonly<IState> = {
  }

  render() {
    return(
      <div>
        aaaaaaaaa
      </div>
      )
  }


}

export default Index;

//园区企业--parkCompany; 随手拍 -- photograph；招租查询--findLease； 摆点申请-- applyPut； 
//场地预定-- bookSite；在线报修-- repairsOnline；停车服务-- parking
//Index，3d沙盘； 微圈 --infoArea； 资讯--message；我的 --aboutMe；

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/parkCompany" component={ParkCompany} />
      <Route exact path="/photograph" component={Photograph} />
      <Route exact path="/" component={Index} />
      <Route exact path="/infoArea" component={InfoArea} />
      <Route exact path="/message" component={Message} />
      <Route exact path="/aboutMe" component={AboutMe} />
    </Switch>
  </HashRouter>
  , document.getElementById('viewContainer'));


 