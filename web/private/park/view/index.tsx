import * as React from "react";
import * as ReactDOM from "react-dom";

import TopNav from "topNav";
import LeftNav from "leftNav";
import IconView from "iconView";
import Data from "data";
import Share from "share";
import DataService from "dataService";

import "css!./styles/view.css"
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
 

interface IProps {}

interface IState {
    isFullScreen: boolean,
    isShare: boolean
}

class Index extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.toggleShare = this.toggleShare.bind(this);

        Index.g_pIns = this;
    }

    public componentDidMount() { }

    public readonly state: Readonly<IState> = {
        isFullScreen: false,
        isShare: false
    }

    public static g_pIns: Index = null;

    // 分享
    toggleShare = (e) => {
        this.setState({ isShare: !this.state.isShare })
    }

    // 全屏
    fullScreen = (e) => {
        this.setState({ isFullScreen: !this.state.isFullScreen })
    }
 
    public render() {
        return (
            <div className={"web"} >
                {this.state.isFullScreen ? null :
                    <span>
                        <TopNav /> 
                        <LeftNav />
                    </span>
                }
                {
                this.state.isShare ?
                    <div className="share"><Share toggleShare={this.toggleShare} /></div>
                    : null
                }
                <div className={"iconView"}>
                    <IconView toggleShare={this.toggleShare} fullScreen={this.fullScreen}  />
                </div>
                <div id="webgl-output"></div>
            </div>
        )
    }


    public iconChild = null;
    public iconSon = ref => { this.iconChild = ref };

  
    //do 传参决定显示区域 ， 1 - 园区介绍; 2 - 区域优势; 3 - 招商列表; 4 - 入驻企业; 10 - 顶部树形列表;
    public showLeftview(a) {
        // LeftNav.showList-- ListArea.showList
        LeftNav.showList(a);
    }
    // 隐藏组件
    public hideLeftview(a) {
        LeftNav.indexCh(a);
        LeftNav.showList(a);
    }

    //刷新树形图数据
    public updateTree(data) {
        // LeftNav.refreshTree -- TreeArea.setTreedata
        LeftNav.refreshTree(data);
    }

    //激活房间组件
    public updateBusiness(a) {
        console.log("flushRoom", a);
        // LeftNav.outBusinessdata(a) -- BusinessArea.outRoomdata(a);
        LeftNav.updateBusiness(a)
    }
    // 激活企业组件
    public updateCompany(a) {
        console.log("flushRoom", a);
        // LeftNav.outCompanydata  --  CompanyArea.outRoomdata(a);
        LeftNav.updateCompany(a)
    }

    // 激活房间全景
    public roomScene(a) {
        console.log("roomScene", a);
    }

    //激活房间讲解
    public roomAduio(a) {
        IconView.play(a);
    }

    public dataService: DataService = new DataService();

    // 点击地图点，获取回调
    public callback(a, pBack) {
        this.dataService.callback(a, pBack);
    }


}

ReactDOM.render(
    <HashRouter>
            <Switch>
                <Route path="/data" component={Data} />
                <Route exact path="/" component={Index} />
            </Switch>
    </HashRouter>
    , document.getElementById('viewContainer'));

export default Index;




