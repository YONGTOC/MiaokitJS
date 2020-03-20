import { HashRouter, Route, Switch } from 'react-router-dom';
import * as React from "react";
import Index from "index";
import Home from "home";
import ParkCompany from "parkCompany";
import Photograph from "photograph";
import InfoArea from "infoArea";
import Information from "information";
import PersonalCenter from "personalCenter";
import FindLease from "findLease";
import ApplyPut from "applyPut";
import BookSite from "bookSite";
import RepairsOnline from "repairsOnline";
import Parking from "parking";
import Narrate from "narrate";
import Isay from "isay";
import WorkOrder from "workOrder";
import WorkOrderDetail from "workOrderDetail";
import ModificationAuthentication from "modificationAuthentication";
import Message from "message";
import EnterpriseInformation from "enterpriseInformation";
import RentRoom from "rentRoom";
import RentRoomDetail from "rentRoomDetail";
import DefaultRentRoom from "defaultRentRoom";
import ParkWorkOrder from "parkWorkOrder";
import ServiceTel from "serviceTel";
import Distribute from "distribute";
import SearchUser from "searchUser";
import StatisticalStatement from "statisticalStatement";

//园区企业--parkCompany; 随手拍 -- photograph；招租查询--findLease； 摆点申请-- applyPut； 
//场地预定-- bookSite；在线报修-- repairsOnline；停车服务-- parking
//Index，3d沙盘； 微圈 --infoArea； 资讯--information；我的 --personalCenter；

class Router extends React.Component {
  render() {
    return(
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/parkCompany" component={ParkCompany} />
          <Route path="/photograph" component={Photograph} />
          <Route path="/findLease" component={FindLease} />
          <Route path="/applyPut" component={ApplyPut} />
          <Route path="/bookSite" component={BookSite} />
          <Route path="/repairsOnline" component={RepairsOnline} />
          <Route path="/parking" component={Parking} />
          <Route path="/narrate" component={Narrate} />
          <Route path="/isay" component={Isay} />
          <Route path="/workOrder" component={WorkOrder} />
          <Route path="/workOrderDetail" component={WorkOrderDetail} />
          <Route path="/home" render={(props) => (
            <Home {...props}>
              <Route path="/home/infoArea" component={InfoArea} />
              <Route path="/home/information" component={Information} />
              <Route path="/home/personalCenter" component={PersonalCenter} />
            </Home>
          )}>
          </Route>
          <Route path="/modificationAuthentication" component={ModificationAuthentication} />
          <Route path="/message" component={Message} />
          <Route path="/enterpriseInformation" component={EnterpriseInformation} />
          <Route path="/rentRoom" component={RentRoom} />
          <Route path="/rentRoomDetail" component={RentRoomDetail} />
          <Route path="/defaultRentRoom" component={DefaultRentRoom} />
          <Route path="/parkworkOrder" component={ParkWorkOrder} />
          <Route path="/serviceTel" component={ServiceTel} />
          <Route path="/distribute" component={Distribute} />
          <Route path="/searchUser" component={SearchUser} />
          <Route path="/statisticalStatement" component={StatisticalStatement} />
        </Switch>
      </HashRouter>
  )}
}

export default Router;