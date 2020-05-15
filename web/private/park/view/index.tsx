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

    // ����
    toggleShare = (e) => {
        this.setState({ isShare: !this.state.isShare })
    }

    // ȫ��
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

  
    //do ���ξ�����ʾ���� �� 1 - ԰������; 2 - ��������; 3 - �����б�; 4 - ��פ��ҵ; 10 - ���������б�;
    public showLeftview(a) {
        // LeftNav.showList-- ListArea.showList
        LeftNav.showList(a);
    }
    // �������
    public hideLeftview(a) {
        LeftNav.indexCh(a);
        LeftNav.showList(a);
    }

    //ˢ������ͼ����
    public updateTree(data) {
        // LeftNav.refreshTree -- TreeArea.setTreedata
        LeftNav.refreshTree(data);
    }

    //��������
    public updateBusiness(a) {
        console.log("flushRoom", a);
        // LeftNav.outBusinessdata(a) -- BusinessArea.outRoomdata(a);
        LeftNav.updateBusiness(a)
    }
    // ������ҵ���
    public updateCompany(a) {
        console.log("flushRoom", a);
        // LeftNav.outCompanydata  --  CompanyArea.outRoomdata(a);
        LeftNav.updateCompany(a)
    }

    // �����ȫ��
    public roomScene(a) {
        console.log("roomScene", a);
    }

    //����佲��
    public roomAduio(a) {
        IconView.play(a);
    }

    public dataService: DataService = new DataService();

    // �����ͼ�㣬��ȡ�ص�
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




